import { AsyncLocalStorage } from 'node:async_hooks';
import nodeConsole from 'node:console';
import { skipCSRFCheck } from '@auth/core';
import Credentials from '@auth/core/providers/credentials';
import { authHandler, initAuthConfig, type AuthEnv } from '@hono/auth-js';
import { hash, verify } from 'argon2';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createHonoServer } from 'react-router-hono-server/node';
import { serializeError } from 'serialize-error';
import { API_BASENAME, api } from './route-builder';
// @ts-ignore
import sql from '../src/app/api/utils/sql.js';

const als = new AsyncLocalStorage<{ requestId: string }>();

for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
  const original = nodeConsole[method].bind(console);

  console[method] = (...args: unknown[]) => {
    const requestId = als.getStore()?.requestId;
    if (requestId) {
      original(`[traceId:${requestId}]`, ...args);
    } else {
      original(...args);
    }
  };
}

const app = new Hono<{ Bindings: AuthEnv; Variables: { requestId: string } }>();

// 1. Global Logging & Interception
app.use('*', async (c, next) => {
  console.log(`[Global Log] ${c.req.method} ${c.req.url} (path: ${c.req.path})`);
  await next();
});

const AUTH_SECRET = process.env.AUTH_SECRET ?? 'dev-secret-please-change';

// 2. Auth Configuration & Handling (PRIORITY)
app.use(
  '/api/auth/*',
  initAuthConfig((_c) => {
    return {
      secret: AUTH_SECRET,
      trustHost: true,
      basePath: '/api/auth',
      pages: {
        signIn: '/account/signin',
        signOut: '/account/logout',
      },
      skipCSRFCheck: skipCSRFCheck,
      session: {
        strategy: 'jwt',
      },
      providers: [
        Credentials({
          id: 'credentials',
          name: 'Credentials',
          credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
            name: { label: 'Name', type: 'text', required: false },
          },
          authorize: async (credentials) => {
            try {
              const { email, password, name } = credentials as Record<string, string>;
              if (!email || !password) return null;

              nodeConsole.log('AUTH: Checking user:', email);
              const users = await sql`SELECT id, email, name, password, image FROM auth_users WHERE email = ${email}`;
              const existing = users[0];

              if (existing) {
                // LOGIN flow — verify password
                nodeConsole.log('AUTH: User found, verifying password');
                const ok = await verify(existing.password, password);
                if (!ok) {
                  nodeConsole.log('AUTH: Wrong password');
                  return null;
                }
                nodeConsole.log('AUTH: Login success for:', email);
                return { id: existing.id, email: existing.email, name: existing.name ?? '', image: existing.image ?? null };
              }

              // SIGNUP flow — create new user
              nodeConsole.log('AUTH: Creating new user:', email);
              const hashed = await hash(password);
              const id = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2);
              const newUser = await sql`
                INSERT INTO auth_users (id, email, name, password, created_at)
                VALUES (${id}, ${email}, ${name ?? email.split('@')[0]}, ${hashed}, ${new Date()})
                RETURNING id, email, name, image
              `;
              nodeConsole.log('AUTH: User created:', newUser[0].id);
              return { id: newUser[0].id, email: newUser[0].email, name: newUser[0].name ?? '', image: newUser[0].image ?? null };
            } catch (err) {
              nodeConsole.error('AUTH: Error in authorize:', err);
              return null;
            }
          },
        }),
      ],
    };
  })
);

app.all('/api/auth/*', async (c, next) => {
  return authHandler()(c, next);
});


// 3. Middlewares
app.use('*', requestId());
app.use('*', (c, next) => {
  const requestId = c.get('requestId') as string;
  return als.run({ requestId }, () => next());
});
app.use(contextStorage());

app.onError((err, c) => {
  if (c.req.method !== 'GET') {
    return c.json(
      {
        error: 'An error occurred in your app',
        details: serializeError(err),
      },
      500
    );
  }
  return c.html(getHTMLForErrorPage(err), 200 as any);
});

function getHTMLForErrorPage(err: any): string {
  return `
    <html>
      <head><title>Error</title></head>
      <body>
        <h1>An error occurred</h1>
        <pre>${err.stack || err.message}</pre>
      </body>
    </html>
  `;
}

if (process.env.CORS_ORIGINS) {
  app.use(
    '/*',
    cors({
      origin: process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()),
    })
  );
}

for (const method of ['post', 'put', 'patch'] as const) {
  app[method](
    '*',
    bodyLimit({
      maxSize: 4.5 * 1024 * 1024,
      onError: (c) => {
        return c.json({ error: 'Body size limit exceeded' }, 413);
      },
    })
  );
}

// 4. Integration Proxy
app.all('/integrations/:path{.+}', async (c, next) => {
  const queryParams = c.req.query();
  const url = `${process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? 'https://www.create.xyz'}/integrations/${c.req.param('path')}${Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : ''}`;

  return proxy(url, {
    method: c.req.method,
    body: c.req.raw.body ?? null,
    // @ts-ignore
    duplex: 'half',
    redirect: 'manual',
    headers: {
      ...c.req.header(),
      'X-Forwarded-For': process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-host': process.env.NEXT_PUBLIC_CREATE_HOST,
      Host: process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-project-group-id': process.env.NEXT_PUBLIC_PROJECT_GROUP_ID,
    },
  });
});

// 5. API Route mounting
app.route(API_BASENAME, api);

export { app };
