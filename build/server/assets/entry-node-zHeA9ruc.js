import { AsyncLocalStorage } from 'node:async_hooks';
import nodeConsole from 'node:console';
import { skipCSRFCheck } from '@auth/core';
import Credentials from '@auth/core/providers/credentials';
import { initAuthConfig, authHandler } from '@hono/auth-js';
import { verify, hash } from 'argon2';
import { Hono } from 'hono';
import { getContext, contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createMiddleware } from 'hono/factory';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { logger } from 'hono/logger';
import { serializeError } from 'serialize-error';
import { getToken } from '@auth/core/jwt';
import React__default from 'react';
import path, { join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { route, index } from '@react-router/dev/routes';
import cleanStack from 'clean-stack';
import { neon, Pool } from '@neondatabase/serverless';
import { createRequestHandler } from 'react-router';

var defaultWebSocket = {
  upgradeWebSocket: (() => {
  }),
  injectWebSocket: (server) => server
};
async function createWebSocket({ app, enabled }) {
  if (!enabled) {
    return defaultWebSocket;
  }
  process.env.NODE_ENV === "development" ? "development" : "production";
  {
    const { createNodeWebSocket } = await import('@hono/node-ws');
    const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });
    return {
      upgradeWebSocket,
      injectWebSocket(server) {
        injectWebSocket(server);
        return server;
      }
    };
  }
}
function cleanUpgradeListeners(httpServer) {
  const upgradeListeners = httpServer.listeners("upgrade").filter((listener) => listener.name !== "hmrServerWsListener");
  for (const listener of upgradeListeners) {
    httpServer.removeListener(
      "upgrade",
      /* @ts-expect-error - we don't care */
      listener
    );
  }
}
function patchUpgradeListener(httpServer) {
  const upgradeListeners = httpServer.listeners("upgrade").filter((listener) => listener.name !== "hmrServerWsListener");
  for (const listener of upgradeListeners) {
    httpServer.removeListener(
      "upgrade",
      /* @ts-expect-error - we don't care */
      listener
    );
    httpServer.on("upgrade", (request, ...rest) => {
      if (request.headers["sec-websocket-protocol"] === "vite-hmr") {
        return;
      }
      return listener(request, ...rest);
    });
  }
}
function bindIncomingRequestSocketInfo() {
  return createMiddleware((c, next) => {
    c.env.server = {
      incoming: {
        socket: {
          remoteAddress: c.req.raw.headers.get("x-remote-address") || void 0,
          remotePort: Number(c.req.raw.headers.get("x-remote-port")) || void 0,
          remoteFamily: c.req.raw.headers.get("x-remote-family") || void 0
        }
      }
    };
    return next();
  });
}
async function importBuild() {
  return await import(
    // @ts-expect-error - Virtual module provided by React Router at build time
    './server-build.js'
  );
}
function getBuildMode() {
  return process.env.NODE_ENV === "development" ? "development" : "production";
}

// src/middleware.ts
function cache(seconds) {
  return createMiddleware(async (c, next) => {
    if (!c.req.path.match(/\.[a-zA-Z0-9]+$/) || c.req.path.endsWith(".data")) {
      return next();
    }
    await next();
    if (!c.res.ok || c.res.headers.has("cache-control")) {
      return;
    }
    c.res.headers.set("cache-control", `public, max-age=${seconds}`);
  });
}

async function createHonoServer(options) {
  const startTime = Date.now();
  const build = await importBuild();
  const basename = "/";
  const mergedOptions = {
    ...options,
    listeningListener: options?.listeningListener || ((info) => {
      console.log(`🚀 Server started on port ${info.port}`);
      console.log(`🌍 http://127.0.0.1:${info.port}`);
      console.log(`🏎️ Server started in ${Date.now() - startTime}ms`);
    }),
    port: options?.port || Number(process.env.PORT) || 3e3,
    defaultLogger: options?.defaultLogger ?? true,
    overrideGlobalObjects: options?.overrideGlobalObjects ?? false
  };
  const mode = getBuildMode();
  const PRODUCTION = mode === "production";
  const clientBuildPath = `${"build"}/client`;
  const app = new Hono(mergedOptions.app);
  const { upgradeWebSocket, injectWebSocket } = await createWebSocket({
    app,
    enabled: mergedOptions.useWebSocket ?? false
  });
  if (!PRODUCTION) {
    app.use(bindIncomingRequestSocketInfo());
  }
  await mergedOptions.beforeAll?.(app);
  app.use(
    `/${"assets"}/*`,
    cache(60 * 60 * 24 * 365),
    // 1 year
    serveStatic({ root: clientBuildPath, ...mergedOptions.serveStaticOptions?.clientAssets })
  );
  app.use(
    "*",
    cache(60 * 60),
    // 1 hour
    serveStatic({ root: PRODUCTION ? clientBuildPath : "./public", ...mergedOptions.serveStaticOptions?.publicAssets })
  );
  if (mergedOptions.defaultLogger) {
    app.use("*", logger());
  }
  if (mergedOptions.useWebSocket) {
    await mergedOptions.configure(app, { upgradeWebSocket });
  } else {
    await mergedOptions.configure?.(app);
  }
  const reactRouterApp = new Hono({
    strict: false
  });
  reactRouterApp.use((c, next) => {
    return createMiddleware(async (c2) => {
      const requestHandler = createRequestHandler(build, mode);
      const loadContext = mergedOptions.getLoadContext?.(c2, { build, mode });
      return requestHandler(c2.req.raw, loadContext instanceof Promise ? await loadContext : loadContext);
    })(c, next);
  });
  app.route(`${basename}`, reactRouterApp);
  {
    app.route(`${basename}.data`, reactRouterApp);
  }
  if (PRODUCTION) {
    const server = serve(
      {
        ...app,
        ...mergedOptions.customNodeServer,
        port: mergedOptions.port,
        overrideGlobalObjects: mergedOptions.overrideGlobalObjects,
        hostname: mergedOptions.hostname
      },
      mergedOptions.listeningListener
    );
    mergedOptions.onServe?.(server);
    injectWebSocket(server);
  } else if (globalThis.__viteDevServer?.httpServer) {
    const httpServer = globalThis.__viteDevServer.httpServer;
    cleanUpgradeListeners(httpServer);
    mergedOptions.onServe?.(httpServer);
    injectWebSocket(httpServer);
    patchUpgradeListener(httpServer);
    console.log("🚧 Dev server started");
  }
  return app;
}

const __dirname$1 = fileURLToPath(new URL(".", import.meta.url));
function buildRouteTree(dir, basePath = "") {
  const files = readdirSync(dir);
  const node = {
    path: basePath,
    children: [],
    hasPage: false,
    isParam: false,
    isCatchAll: false,
    paramName: ""
  };
  const dirName = basePath.split("/").pop();
  if (dirName?.startsWith("[") && dirName.endsWith("]")) {
    node.isParam = true;
    const paramName = dirName.slice(1, -1);
    if (paramName.startsWith("...")) {
      node.isCatchAll = true;
      node.paramName = paramName.slice(3);
    } else {
      node.paramName = paramName;
    }
  }
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      const childPath = basePath ? `${basePath}/${file}` : file;
      const childNode = buildRouteTree(filePath, childPath);
      node.children.push(childNode);
    } else if (file === "page.jsx") {
      node.hasPage = true;
    }
  }
  return node;
}
function generateRoutes(node) {
  const routes2 = [];
  if (node.hasPage) {
    const componentPath = node.path === "" ? `./${node.path}page.jsx` : `./${node.path}/page.jsx`;
    if (node.path === "") {
      routes2.push(index(componentPath));
    } else {
      let routePath = node.path;
      const segments = routePath.split("/");
      const processedSegments = segments.map((segment) => {
        if (segment.startsWith("[") && segment.endsWith("]")) {
          const paramName = segment.slice(1, -1);
          if (paramName.startsWith("...")) {
            return "*";
          }
          if (paramName.startsWith("[") && paramName.endsWith("]")) {
            return `:${paramName.slice(1, -1)}?`;
          }
          return `:${paramName}`;
        }
        return segment;
      });
      routePath = processedSegments.join("/");
      routes2.push(route(routePath, componentPath));
    }
  }
  for (const child of node.children) {
    routes2.push(...generateRoutes(child));
  }
  return routes2;
}
const tree = buildRouteTree(__dirname$1);
const notFound = route("*?", "./__create/not-found.tsx");
const routes = [...generateRoutes(tree), notFound];
console.log("Generated routes:", routes.map((r) => r.path));

function serializeClean(err) {
  // if we want to clean this more, maybe we should look at the file where it
  // is imported and above.
  err.stack = cleanStack(err.stack, {
    pathFilter: path => {
      // Filter out paths that are not relevant to the error
      return !path.includes('node_modules') && !path.includes('dist') && !path.includes('__create');
    }
  });
  return serializeError(err);
}
const getHTMLOrError = component => {
  try {
    const html = renderToString(React__default.createElement(component, {}));
    return {
      html,
      error: null
    };
  } catch (error) {
    return {
      html: null,
      error: serializeClean(error)
    };
  }
};
async function GET$7(request) {
  const results = await Promise.allSettled(routes.map(async route => {
    let component = null;
    try {
      const response = await import(/* @vite-ignore */path.join('../../../', route.file));
      component = response.default;
    } catch (error) {
      console.debug('Error importing component:', route.file, error);
    }
    if (!component) {
      return null;
    }
    getHTMLOrError(component);
    return {
      route: route.file,
      path: route.path,
      ...getHTMLOrError(component)
    };
  }));
  const cleanedResults = results.filter(result => result.status === 'fulfilled').map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return null;
  }).filter(result => result !== null);
  return Response.json({
    results: cleanedResults
  });
}

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$7
}, Symbol.toStringTag, { value: 'Module' }));

async function GET$6(request) {
  const [token, jwt] = await Promise.all([getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.AUTH_URL.startsWith('https'),
    raw: true
  }), getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.AUTH_URL.startsWith('https')
  })]);
  if (!jwt) {
    return new Response(`
			<html>
				<body>
					<script>
						window.parent.postMessage({ type: 'AUTH_ERROR', error: 'Unauthorized' }, '*');
					</script>
				</body>
			</html>
			`, {
      status: 401,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }
  const message = {
    type: 'AUTH_SUCCESS',
    jwt: token,
    user: {
      id: jwt.sub,
      email: jwt.email,
      name: jwt.name
    }
  };
  return new Response(`
		<html>
			<body>
				<script>
					window.parent.postMessage(${JSON.stringify(message)}, '*');
				</script>
			</body>
		</html>
		`, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$6
}, Symbol.toStringTag, { value: 'Module' }));

async function GET$5(request) {
  const [token, jwt] = await Promise.all([getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.AUTH_URL.startsWith('https'),
    raw: true
  }), getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.AUTH_URL.startsWith('https')
  })]);
  if (!jwt) {
    return new Response(JSON.stringify({
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  return new Response(JSON.stringify({
    jwt: token,
    user: {
      id: jwt.sub,
      email: jwt.email,
      name: jwt.name
    }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$5
}, Symbol.toStringTag, { value: 'Module' }));

const NullishQueryFunction = () => {
  throw new Error('No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set');
};
NullishQueryFunction.transaction = () => {
  throw new Error('No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set');
};
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : NullishQueryFunction;

function CreateAuth() {
  const auth = async () => {
    const c = getContext();
    const token = await getToken({
      req: c.req.raw,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.AUTH_URL.startsWith('https')
    });
    if (token) {
      return {
        user: {
          id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture
        },
        expires: token.exp.toString()
      };
    }
  };
  return {
    auth
  };
}

/**
 * WARNING: This file connects this app to Anythings's internal auth system. Do
 * not attempt to edit it. Modifying it will have no effect on your project as it is controlled by our system.
 * Do not import @auth/create or @auth/create anywhere else or it may break. This is an internal package.
 */
function Adapter(client) {
  return {
    async createVerificationToken(verificationToken) {
      const {
        identifier,
        expires,
        token
      } = verificationToken;
      const sql = `
        INSERT INTO auth_verification_token ( identifier, expires, token )
        VALUES ($1, $2, $3)
        `;
      await client.query(sql, [identifier, expires, token]);
      return verificationToken;
    },
    async useVerificationToken({
      identifier,
      token
    }) {
      const sql = `delete from auth_verification_token
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token `;
      const result = await client.query(sql, [identifier, token]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async createUser(user) {
      const {
        name,
        email,
        emailVerified,
        image
      } = user;
      const sql = `
        INSERT INTO auth_users (name, email, "emailVerified", image)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, "emailVerified", image`;
      const result = await client.query(sql, [name, email, emailVerified, image]);
      return result.rows[0];
    },
    async getUser(id) {
      const sql = 'select * from auth_users where id = $1';
      try {
        const result = await client.query(sql, [id]);
        return result.rowCount === 0 ? null : result.rows[0];
      } catch {
        return null;
      }
    },
    async getUserByEmail(email) {
      const sql = 'select * from auth_users where email = $1';
      const result = await client.query(sql, [email]);
      if (result.rowCount === 0) {
        return null;
      }
      const userData = result.rows[0];
      const accountsData = await client.query('select * from auth_accounts where "userId" = $1', [userData.id]);
      return {
        ...userData,
        accounts: accountsData.rows
      };
    },
    async getUserByAccount({
      providerAccountId,
      provider
    }) {
      const sql = `
          select u.* from auth_users u join auth_accounts a on u.id = a."userId"
          where
          a.provider = $1
          and
          a."providerAccountId" = $2`;
      const result = await client.query(sql, [provider, providerAccountId]);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async updateUser(user) {
      const fetchSql = 'select * from auth_users where id = $1';
      const query1 = await client.query(fetchSql, [user.id]);
      const oldUser = query1.rows[0];
      const newUser = {
        ...oldUser,
        ...user
      };
      const {
        id,
        name,
        email,
        emailVerified,
        image
      } = newUser;
      const updateSql = `
        UPDATE auth_users set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;
      const query2 = await client.query(updateSql, [id, name, email, emailVerified, image]);
      return query2.rows[0];
    },
    async linkAccount(account) {
      const sql = `
      insert into auth_accounts
      (
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type,
        password
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      returning
        id,
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type,
        password
      `;
      const params = [account.userId, account.provider, account.type, account.providerAccountId, account.access_token, account.expires_at, account.refresh_token, account.id_token, account.scope, account.session_state, account.token_type, account.extraData?.password];
      const result = await client.query(sql, params);
      return result.rows[0];
    },
    async createSession({
      sessionToken,
      userId,
      expires
    }) {
      if (userId === undefined) {
        throw Error('userId is undef in createSession');
      }
      const sql = `insert into auth_sessions ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;
      const result = await client.query(sql, [userId, expires, sessionToken]);
      return result.rows[0];
    },
    async getSessionAndUser(sessionToken) {
      if (sessionToken === undefined) {
        return null;
      }
      const result1 = await client.query(`select * from auth_sessions where "sessionToken" = $1`, [sessionToken]);
      if (result1.rowCount === 0) {
        return null;
      }
      const session = result1.rows[0];
      const result2 = await client.query('select * from auth_users where id = $1', [session.userId]);
      if (result2.rowCount === 0) {
        return null;
      }
      const user = result2.rows[0];
      return {
        session,
        user
      };
    },
    async updateSession(session) {
      const {
        sessionToken
      } = session;
      const result1 = await client.query(`select * from auth_sessions where "sessionToken" = $1`, [sessionToken]);
      if (result1.rowCount === 0) {
        return null;
      }
      const originalSession = result1.rows[0];
      const newSession = {
        ...originalSession,
        ...session
      };
      const sql = `
        UPDATE auth_sessions set
        expires = $2
        where "sessionToken" = $1
        `;
      const result = await client.query(sql, [newSession.sessionToken, newSession.expires]);
      return result.rows[0];
    },
    async deleteSession(sessionToken) {
      const sql = `delete from auth_sessions where "sessionToken" = $1`;
      await client.query(sql, [sessionToken]);
    },
    async unlinkAccount(partialAccount) {
      const {
        provider,
        providerAccountId
      } = partialAccount;
      const sql = `delete from auth_accounts where "providerAccountId" = $1 and provider = $2`;
      await client.query(sql, [providerAccountId, provider]);
    },
    async deleteUser(userId) {
      await client.query('delete from auth_users where id = $1', [userId]);
      await client.query('delete from auth_sessions where "userId" = $1', [userId]);
      await client.query('delete from auth_accounts where "userId" = $1', [userId]);
    }
  };
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const adapter = Adapter(pool);
const {
  auth
} = CreateAuth({
  providers: [Credentials({
    id: 'credentials-signin',
    name: 'Credentials Sign in',
    credentials: {
      email: {
        label: 'Email',
        type: 'email'
      },
      password: {
        label: 'Password',
        type: 'password'
      }
    },
    authorize: async credentials => {
      const {
        email,
        password
      } = credentials;
      if (!email || !password) {
        return null;
      }
      if (typeof email !== 'string' || typeof password !== 'string') {
        return null;
      }

      // logic to verify if user exists
      const user = await adapter.getUserByEmail(email);
      if (!user) {
        return null;
      }
      const matchingAccount = user.accounts.find(account => account.provider === 'credentials');
      const accountPassword = matchingAccount?.password;
      if (!accountPassword) {
        return null;
      }
      const isValid = await verify(accountPassword, password);
      if (!isValid) {
        return null;
      }

      // return user object with the their profile data
      return user;
    }
  }), Credentials({
    id: 'credentials-signup',
    name: 'Credentials Sign up',
    credentials: {
      email: {
        label: 'Email',
        type: 'email'
      },
      password: {
        label: 'Password',
        type: 'password'
      },
      name: {
        label: 'Name',
        type: 'text',
        required: false
      },
      image: {
        label: 'Image',
        type: 'text',
        required: false
      }
    },
    authorize: async credentials => {
      const {
        email,
        password
      } = credentials;
      if (!email || !password) {
        return null;
      }
      if (typeof email !== 'string' || typeof password !== 'string') {
        return null;
      }

      // logic to verify if user exists
      const user = await adapter.getUserByEmail(email);
      if (!user) {
        const newUser = await adapter.createUser({
          emailVerified: null,
          email,
          name: typeof credentials.name === 'string' && credentials.name.trim().length > 0 ? credentials.name : undefined,
          image: typeof credentials.image === 'string' ? credentials.image : undefined
        });
        await adapter.linkAccount({
          extraData: {
            password: await hash(password)
          },
          type: 'credentials',
          userId: newUser.id,
          providerAccountId: newUser.id,
          provider: 'credentials'
        });
        return newUser;
      }
      return null;
    }
  })]});

async function POST$7(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const body = await request.json();
    const {
      contractor_id,
      certification_type,
      certification_number,
      issued_by,
      issue_date,
      expiry_date,
      document_url
    } = body;
    const result = await sql`
      INSERT INTO certifications (
        contractor_id, certification_type, certification_number,
        issued_by, issue_date, expiry_date, document_url
      ) VALUES (
        ${contractor_id}, ${certification_type}, ${certification_number || null},
        ${issued_by || null}, ${issue_date || null}, ${expiry_date || null},
        ${document_url || null}
      ) RETURNING *
    `;
    return Response.json({
      certification: result[0]
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$7
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Utility to sync data to Google Sheets via Apps Script Webhook
 */
async function syncToGoogleSheets(data) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url || url.includes('XXXXXXXXX')) {
    console.warn('GOOGLE_SCRIPT_URL is not configured. Skipping sync.');
    return;
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })
    });
    if (!response.ok) {
      throw new Error(`Google Sheets sync failed: ${response.statusText}`);
    }
    console.log('Successfully synced to Google Sheets');
    return await response.json();
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
  }
}

// Mendapatkan detail kontraktor
async function GET$4(request, {
  params
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const {
      id
    } = params;
    const contractors = await sql`SELECT * FROM contractors WHERE id = ${id}`;
    if (contractors.length === 0) {
      return Response.json({
        error: "Kontraktor tidak ditemukan"
      }, {
        status: 404
      });
    }

    // Ambil data terkait
    const certifications = await sql`SELECT * FROM certifications WHERE contractor_id = ${id}`;
    const projects = await sql`SELECT * FROM projects WHERE contractor_id = ${id}`;
    const documents = await sql`SELECT * FROM documents WHERE contractor_id = ${id}`;
    return Response.json({
      contractor: contractors[0],
      certifications,
      projects,
      documents
    });
  } catch (error) {
    console.error("Error fetching contractor:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

// Update data kontraktor
async function PUT(request, {
  params
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const {
      id
    } = params;
    const body = await request.json();
    const setClauses = [];
    const values = [];
    let paramIndex = 1;
    const allowedFields = ["full_name", "birth_place", "birth_date", "phone", "email", "address", "city", "company_name", "company_type", "npwp", "company_address", "company_phone", "establishment_year", "business_field", "small_classification", "medium_classification", "large_classification"];
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        setClauses.push(`${field} = $${paramIndex}`);
        values.push(body[field]);
        paramIndex++;
      }
    }
    if (setClauses.length === 0) {
      return Response.json({
        error: "Tidak ada data yang diupdate"
      }, {
        status: 400
      });
    }
    setClauses.push(`updated_at = $${paramIndex}`);
    values.push(new Date());
    paramIndex++;
    const query = `UPDATE contractors SET ${setClauses.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);
    const result = await sql(query, values);
    if (result.length === 0) {
      return Response.json({
        error: "Kontraktor tidak ditemukan"
      }, {
        status: 404
      });
    }

    // Sync to Google Sheets
    await syncToGoogleSheets({
      action: 'UPDATE',
      contractor: result[0]
    });
    return Response.json({
      contractor: result[0]
    });
  } catch (error) {
    console.error("Error updating contractor:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$4,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

// Mendapatkan profil kontraktor dari user yang sedang login
async function GET$3(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const contractors = await sql`
      SELECT * FROM contractors WHERE user_id = ${session.user.id}
    `;
    if (contractors.length === 0) {
      return Response.json({
        contractor: null
      });
    }
    const contractorId = contractors[0].id;

    // Ambil data terkait
    const certifications = await sql`SELECT * FROM certifications WHERE contractor_id = ${contractorId}`;
    const projects = await sql`SELECT * FROM projects WHERE contractor_id = ${contractorId}`;
    const documents = await sql`SELECT * FROM documents WHERE contractor_id = ${contractorId}`;
    return Response.json({
      contractor: contractors[0],
      certifications,
      projects,
      documents
    });
  } catch (error) {
    console.error("Error fetching my profile:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$3
}, Symbol.toStringTag, { value: 'Module' }));

// Mendapatkan daftar kontraktor (untuk admin)
async function GET$2(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const {
      searchParams
    } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    let query = "SELECT * FROM contractors WHERE 1=1";
    const params = [];
    let paramIndex = 1;
    if (status && status !== "all") {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }
    if (search) {
      query += ` AND (LOWER(full_name) LIKE LOWER($${paramIndex}) OR LOWER(company_name) LIKE LOWER($${paramIndex}) OR nik LIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    query += " ORDER BY created_at DESC";
    const contractors = await sql(query, params);
    return Response.json({
      contractors
    });
  } catch (error) {
    console.error("Error fetching contractors:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

// Membuat data kontraktor baru
async function POST$6(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const body = await request.json();
    const {
      nik,
      full_name,
      birth_place,
      birth_date,
      phone,
      email,
      address,
      city,
      company_name,
      company_type,
      npwp,
      company_address,
      company_phone,
      establishment_year,
      business_field,
      small_classification,
      medium_classification,
      large_classification
    } = body;

    // Validasi NIK unik
    const existing = await sql`SELECT id FROM contractors WHERE nik = ${nik}`;
    if (existing.length > 0) {
      return Response.json({
        error: "NIK sudah terdaftar"
      }, {
        status: 400
      });
    }
    const result = await sql`
      INSERT INTO contractors (
        user_id, nik, full_name, birth_place, birth_date, phone, email, address, city,
        company_name, company_type, npwp, company_address, company_phone,
        establishment_year, business_field, small_classification,
        medium_classification, large_classification, status
      ) VALUES (
        ${session.user.id}, ${nik}, ${full_name}, ${birth_place || null}, ${birth_date || null},
        ${phone}, ${email || session.user.email}, ${address}, ${city || null},
        ${company_name}, ${company_type || null}, ${npwp || null}, ${company_address || null},
        ${company_phone || null}, ${establishment_year || null}, ${business_field || []},
        ${small_classification || null}, ${medium_classification || null},
        ${large_classification || null}, 'pending'
      ) RETURNING *
    `;

    // Sync to Google Sheets
    await syncToGoogleSheets({
      action: 'CREATE',
      contractor: result[0]
    });
    return Response.json({
      contractor: result[0]
    });
  } catch (error) {
    console.error("Error creating contractor:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$2,
  POST: POST$6
}, Symbol.toStringTag, { value: 'Module' }));

// Verifikasi/Approve atau Reject kontraktor (Admin only)
async function POST$5(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

    // Cek apakah user adalah admin
    const adminCheck = await sql`SELECT role FROM auth_users WHERE id = ${session.user.id}`;
    if (!adminCheck[0] || adminCheck[0].role !== "admin") {
      return Response.json({
        error: "Hanya admin yang dapat melakukan verifikasi"
      }, {
        status: 403
      });
    }
    const body = await request.json();
    const {
      contractor_id,
      status,
      rejection_reason
    } = body;
    if (!contractor_id || !status || !["approved", "rejected"].includes(status)) {
      return Response.json({
        error: "Data tidak valid"
      }, {
        status: 400
      });
    }
    const result = await sql`
      UPDATE contractors 
      SET status = ${status},
          verified_at = ${new Date()},
          verified_by = ${session.user.id},
          rejection_reason = ${status === "rejected" ? rejection_reason : null},
          updated_at = ${new Date()}
      WHERE id = ${contractor_id}
      RETURNING *
    `;
    if (result.length === 0) {
      return Response.json({
        error: "Kontraktor tidak ditemukan"
      }, {
        status: 404
      });
    }

    // Sync to Google Sheets
    await syncToGoogleSheets({
      action: 'VERIFY',
      contractor: result[0]
    });
    return Response.json({
      contractor: result[0]
    });
  } catch (error) {
    console.error("Error verifying contractor:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$5
}, Symbol.toStringTag, { value: 'Module' }));

async function POST$4(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const body = await request.json();
    const {
      contractor_id,
      document_type,
      document_name,
      document_url
    } = body;
    const result = await sql`
      INSERT INTO documents (contractor_id, document_type, document_name, document_url)
      VALUES (${contractor_id}, ${document_type}, ${document_name}, ${document_url})
      RETURNING *
    `;
    return Response.json({
      document: result[0]
    });
  } catch (error) {
    console.error("Error creating document:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$4
}, Symbol.toStringTag, { value: 'Module' }));

// Endpoint untuk membuat user pertama menjadi admin
// PENTING: Hapus endpoint ini setelah admin pertama dibuat!
async function POST$3(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

    // Update user menjadi admin
    const result = await sql`
      UPDATE auth_users 
      SET role = 'admin' 
      WHERE id = ${session.user.id}
      RETURNING id, email, role
    `;
    return Response.json({
      message: "User berhasil dijadikan admin",
      user: result[0]
    });
  } catch (error) {
    console.error("Error making admin:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$3
}, Symbol.toStringTag, { value: 'Module' }));

async function POST$2(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const body = await request.json();
    const {
      contractor_id,
      project_name,
      project_location,
      project_value,
      client_name,
      project_type,
      start_date,
      end_date,
      project_status,
      description
    } = body;
    const result = await sql`
      INSERT INTO projects (
        contractor_id, project_name, project_location, project_value,
        client_name, project_type, start_date, end_date, project_status, description
      ) VALUES (
        ${contractor_id}, ${project_name}, ${project_location || null}, ${project_value || null},
        ${client_name || null}, ${project_type || null}, ${start_date || null},
        ${end_date || null}, ${project_status || null}, ${description || null}
      ) RETURNING *
    `;
    return Response.json({
      project: result[0]
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$2
}, Symbol.toStringTag, { value: 'Module' }));

// Mendapatkan statistik untuk dashboard admin
async function GET$1(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const totalContractors = await sql`SELECT COUNT(*) as count FROM contractors`;
    const pendingApprovals = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'pending'`;
    const approvedContractors = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'approved'`;
    const rejectedContractors = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'rejected'`;
    const recentSubmissions = await sql`
      SELECT * FROM contractors 
      ORDER BY created_at DESC 
      LIMIT 5
    `;
    return Response.json({
      stats: {
        total: parseInt(totalContractors[0].count),
        pending: parseInt(pendingApprovals[0].count),
        approved: parseInt(approvedContractors[0].count),
        rejected: parseInt(rejectedContractors[0].count)
      },
      recentSubmissions
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET: GET$1
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * API Route: POST /api/submit-kegiatan
 * Receives form data and forwards to Google Sheets via Apps Script webhook
 */

const GOOGLE_SCRIPT_URL$1 = process.env.GOOGLE_SCRIPT_URL;
async function POST$1(request) {
  try {
    const body = await request.json();
    const {
      namaKegiatan,
      jenisKegiatan,
      lokasi,
      nilaiKontrak,
      kontraktor,
      tanggalMulai,
      tanggalSelesai,
      progres,
      keterangan,
      penggunaEmal,
      penggunaNama,
      waktuInput
    } = body;

    // Validate required fields
    const required = {
      namaKegiatan,
      jenisKegiatan,
      lokasi,
      nilaiKontrak,
      kontraktor,
      tanggalMulai,
      tanggalSelesai
    };
    for (const [key, val] of Object.entries(required)) {
      if (!val) {
        return Response.json({
          error: `Field ${key} wajib diisi`
        }, {
          status: 400
        });
      }
    }
    const payload = {
      action: 'SUBMIT_KEGIATAN',
      timestamp: new Date().toISOString(),
      namaKegiatan,
      jenisKegiatan,
      lokasi,
      nilaiKontrak: Number(nilaiKontrak),
      kontraktor,
      tanggalMulai,
      tanggalSelesai,
      progres: Number(progres) || 0,
      keterangan: keterangan || '',
      penggunaEmail: penggunaEmal || '',
      penggunaNama: penggunaNama || '',
      waktuInput: waktuInput || new Date().toLocaleString('id-ID')
    };

    // If Google Script URL is configured, send there
    if (GOOGLE_SCRIPT_URL$1 && !GOOGLE_SCRIPT_URL$1.includes('XXXXXXXXX')) {
      try {
        const gsRes = await fetch(GOOGLE_SCRIPT_URL$1, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!gsRes.ok) {
          console.error('Google Sheets error:', await gsRes.text());
        }
      } catch (err) {
        console.error('Failed to send to Google Sheets:', err.message);
        // Don't fail the request — just log the error
      }
    } else {
      console.warn('GOOGLE_SCRIPT_URL not configured — data not sent to Google Sheets');
    }
    return Response.json({
      ok: true,
      message: 'Data berhasil disimpan',
      data: payload
    });
  } catch (error) {
    console.error('Submit error:', error);
    return Response.json({
      error: 'Terjadi kesalahan server'
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST: POST$1
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * POST /api/submit-kontraktor
 * Menerima data perusahaan kontraktor OAP dan meneruskannya ke Google Sheets
 */

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
async function POST(request) {
  try {
    const body = await request.json();
    const {
      namaPerusahaan,
      namaDirektur
    } = body;
    if (!namaPerusahaan || !namaDirektur) {
      return Response.json({
        error: 'Nama perusahaan dan nama direktur wajib diisi'
      }, {
        status: 400
      });
    }
    const payload = {
      action: 'SUBMIT_KONTRAKTOR',
      timestamp: new Date().toISOString(),
      ...body
    };

    // Kirim ke Google Sheets jika URL sudah dikonfigurasi
    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('XXXXXXXXX')) {
      try {
        const gsRes = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!gsRes.ok) {
          console.error('Google Sheets error:', gsRes.status, await gsRes.text());
        } else {
          console.log('Data kontraktor berhasil dikirim ke Google Sheets');
        }
      } catch (err) {
        console.error('Gagal menghubungi Google Sheets:', err.message);
      }
    } else {
      console.warn('GOOGLE_SCRIPT_URL belum dikonfigurasi — data tidak dikirim ke Sheets');
    }
    return Response.json({
      ok: true,
      message: `Data perusahaan "${namaPerusahaan}" berhasil disimpan`
    });
  } catch (error) {
    console.error('Error submit-kontraktor:', error);
    return Response.json({
      error: 'Terjadi kesalahan server'
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const result = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;
    if (result.length === 0) {
      return Response.json({
        role: "kontraktor"
      });
    }
    return Response.json({
      role: result[0].role || "kontraktor"
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

const __vite_glob_0_14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const originalFetch = fetch;
const isBackend = () => typeof window === "undefined";
const safeStringify = (value) => JSON.stringify(value, (_k, v) => {
  if (v instanceof Date) return { __t: "Date", v: v.toISOString() };
  if (v instanceof Error)
    return { __t: "Error", v: { name: v.name, message: v.message, stack: v.stack } };
  return v;
});
const postToParent = (level, text, extra) => {
  try {
    if (isBackend() || !window.parent || window.parent === window) {
      ("level" in console ? console[level] : console.log)(text, extra);
      return;
    }
    window.parent.postMessage(
      {
        type: "sandbox:web:console-write",
        __viteConsole: true,
        level,
        text,
        args: [safeStringify(extra)]
      },
      "*"
    );
  } catch {
  }
};
const getUrlFromArgs = (...args) => {
  const [input] = args;
  if (typeof input === "string") return input;
  if (input instanceof Request) return input.url;
  return `${input.protocol}//${input.host}${input.pathname}`;
};
const isFirstPartyURL = (url) => {
  return url.startsWith("/integrations") || url.startsWith("/_create");
};
const isSecondPartyUrl = (url) => {
  return process.env.NEXT_PUBLIC_CREATE_API_BASE_URL && url.startsWith(process.env.NEXT_PUBLIC_CREATE_API_BASE_URL) || process.env.NEXT_PUBLIC_CREATE_BASE_URL && url.startsWith(process.env.NEXT_PUBLIC_CREATE_BASE_URL) || url.startsWith("https://www.create.xyz") || url.startsWith("https://api.create.xyz/") || url.startsWith("https://www.createanything.com") || url.startsWith("https://api.createanything.com");
};
const fetchWithHeaders = async (input, init) => {
  const url = getUrlFromArgs(input, init);
  const additionalHeaders = {
    "x-createxyz-project-group-id": process.env.NEXT_PUBLIC_PROJECT_GROUP_ID
  };
  const isExternalFetch = !isFirstPartyURL(url) && !isSecondPartyUrl(url);
  if (isExternalFetch || url.startsWith("/api")) {
    return originalFetch(input, init);
  }
  let finalInit;
  if (input instanceof Request) {
    const hasBody = !!input.body;
    finalInit = {
      method: input.method,
      headers: new Headers(input.headers),
      body: input.body,
      mode: input.mode,
      credentials: input.credentials,
      cache: input.cache,
      redirect: input.redirect,
      referrer: input.referrer,
      referrerPolicy: input.referrerPolicy,
      integrity: input.integrity,
      keepalive: input.keepalive,
      signal: input.signal,
      ...hasBody ? { duplex: "half" } : {},
      ...init
    };
  } else {
    finalInit = { ...init, headers: new Headers(init?.headers ?? {}) };
  }
  const finalHeaders = new Headers(finalInit.headers);
  for (const [key, value] of Object.entries(additionalHeaders)) {
    if (value) finalHeaders.set(key, value);
  }
  finalInit.headers = finalHeaders;
  const prefix = !isSecondPartyUrl(url) ? isBackend() ? process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz" : "" : "";
  try {
    const result = await originalFetch(`${prefix}${url}`, finalInit);
    if (!result.ok) {
      postToParent(
        "error",
        `Failed to load resource: the server responded with a status of ${result.status} (${result.statusText ?? ""})`,
        {
          url,
          status: result.status,
          statusText: result.statusText
        }
      );
    }
    return result;
  } catch (error) {
    postToParent("error", "Fetch error", {
      url,
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error
    });
    throw error;
  }
};

const API_BASENAME = "/api";
const api = new Hono();
if (globalThis.fetch) {
  globalThis.fetch = fetchWithHeaders;
}
const routeModules = /* #__PURE__ */ Object.assign({"../src/app/api/__create/ssr-test/route.js": __vite_glob_0_0,"../src/app/api/auth/expo-web-success/route.js": __vite_glob_0_1,"../src/app/api/auth/token/route.js": __vite_glob_0_2,"../src/app/api/certifications/route.js": __vite_glob_0_3,"../src/app/api/contractors/[id]/route.js": __vite_glob_0_4,"../src/app/api/contractors/my-profile/route.js": __vite_glob_0_5,"../src/app/api/contractors/route.js": __vite_glob_0_6,"../src/app/api/contractors/verify/route.js": __vite_glob_0_7,"../src/app/api/documents/route.js": __vite_glob_0_8,"../src/app/api/make-admin/route.js": __vite_glob_0_9,"../src/app/api/projects/route.js": __vite_glob_0_10,"../src/app/api/stats/route.js": __vite_glob_0_11,"../src/app/api/submit-kegiatan/route.js": __vite_glob_0_12,"../src/app/api/submit-kontraktor/route.js": __vite_glob_0_13,"../src/app/api/user/role/route.js": __vite_glob_0_14});
function getHonoPath(path) {
  const prefix = "../src/app/api/";
  const suffix = "/route.js";
  let relativePath = path.slice(prefix.length);
  if (relativePath.endsWith(suffix)) {
    relativePath = relativePath.slice(0, -suffix.length);
  } else if (relativePath === "route.js") {
    relativePath = "";
  }
  if (!relativePath) return "/";
  const parts = relativePath.split("/").filter(Boolean);
  const transformedParts = parts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === "..." ? `:${param}{.+}` : `:${param}`;
    }
    return segment;
  });
  return `/${transformedParts.join("/")}`;
}
function registerRoutes() {
  const sortedPaths = Object.keys(routeModules).sort((a, b) => b.length - a.length);
  api.routes = [];
  for (const path of sortedPaths) {
    try {
      const route = routeModules[path];
      const honoPath = getHonoPath(path);
      const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      for (const method of methods) {
        if (route[method]) {
          const handler = async (c) => {
            const params = c.req.param();
            try {
              return await route[method](c.req.raw, { params });
            } catch (err) {
              console.error(`Error in ${method} ${honoPath}:`, err);
              return c.json({ error: "Internal Server Error" }, 500);
            }
          };
          const methodLowercase = method.toLowerCase();
          api[methodLowercase](honoPath, handler);
        }
      }
    } catch (error) {
      console.error(`Error registering route ${path}:`, error);
    }
  }
}
registerRoutes();

const als = new AsyncLocalStorage();
for (const method of ["log", "info", "warn", "error", "debug"]) {
  const original = nodeConsole[method].bind(console);
  console[method] = (...args) => {
    const requestId2 = als.getStore()?.requestId;
    if (requestId2) {
      original(`[traceId:${requestId2}]`, ...args);
    } else {
      original(...args);
    }
  };
}
const app = new Hono();
app.use("*", async (c, next) => {
  console.log(`[Global Log] ${c.req.method} ${c.req.url} (path: ${c.req.path})`);
  await next();
});
const AUTH_SECRET = process.env.AUTH_SECRET ?? "dev-secret-please-change";
app.use(
  "/api/auth/*",
  initAuthConfig((_c) => {
    return {
      secret: AUTH_SECRET,
      trustHost: true,
      basePath: "/api/auth",
      pages: {
        signIn: "/account/signin",
        signOut: "/account/logout"
      },
      skipCSRFCheck,
      session: {
        strategy: "jwt"
      },
      providers: [
        Credentials({
          id: "credentials",
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            name: { label: "Name", type: "text", required: false }
          },
          authorize: async (credentials) => {
            try {
              const { email, password, name } = credentials;
              if (!email || !password) return null;
              nodeConsole.log("AUTH: Checking user:", email);
              const users = await sql`SELECT id, email, name, password, image FROM auth_users WHERE email = ${email}`;
              const existing = users[0];
              if (existing) {
                nodeConsole.log("AUTH: User found, verifying password");
                const ok = await verify(existing.password, password);
                if (!ok) {
                  nodeConsole.log("AUTH: Wrong password");
                  return null;
                }
                nodeConsole.log("AUTH: Login success for:", email);
                return { id: existing.id, email: existing.email, name: existing.name ?? "", image: existing.image ?? null };
              }
              nodeConsole.log("AUTH: Creating new user:", email);
              const hashed = await hash(password);
              const id = "user_" + Date.now() + "_" + Math.random().toString(36).slice(2);
              const newUser = await sql`
                INSERT INTO auth_users (id, email, name, password, created_at)
                VALUES (${id}, ${email}, ${name ?? email.split("@")[0]}, ${hashed}, ${/* @__PURE__ */ new Date()})
                RETURNING id, email, name, image
              `;
              nodeConsole.log("AUTH: User created:", newUser[0].id);
              return { id: newUser[0].id, email: newUser[0].email, name: newUser[0].name ?? "", image: newUser[0].image ?? null };
            } catch (err) {
              nodeConsole.error("AUTH: Error in authorize:", err);
              return null;
            }
          }
        })
      ]
    };
  })
);
app.all("/api/auth/*", async (c, next) => {
  return authHandler()(c, next);
});
app.use("*", requestId());
app.use("*", (c, next) => {
  const requestId2 = c.get("requestId");
  return als.run({ requestId: requestId2 }, () => next());
});
app.use(contextStorage());
app.onError((err, c) => {
  if (c.req.method !== "GET") {
    return c.json(
      {
        error: "An error occurred in your app",
        details: serializeError(err)
      },
      500
    );
  }
  return c.html(getHTMLForErrorPage(err), 200);
});
function getHTMLForErrorPage(err) {
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
    "/*",
    cors({
      origin: process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    })
  );
}
for (const method of ["post", "put", "patch"]) {
  app[method](
    "*",
    bodyLimit({
      maxSize: 4.5 * 1024 * 1024,
      onError: (c) => {
        return c.json({ error: "Body size limit exceeded" }, 413);
      }
    })
  );
}
app.all("/integrations/:path{.+}", async (c, next) => {
  const queryParams = c.req.query();
  const url = `${process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz"}/integrations/${c.req.param("path")}${Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : ""}`;
  return proxy(url, {
    method: c.req.method,
    body: c.req.raw.body ?? null,
    // @ts-ignore
    duplex: "half",
    redirect: "manual",
    headers: {
      ...c.req.header(),
      "X-Forwarded-For": process.env.NEXT_PUBLIC_CREATE_HOST,
      "x-createxyz-host": process.env.NEXT_PUBLIC_CREATE_HOST,
      Host: process.env.NEXT_PUBLIC_CREATE_HOST,
      "x-createxyz-project-group-id": process.env.NEXT_PUBLIC_PROJECT_GROUP_ID
    }
  });
});
app.route(API_BASENAME, api);

const isVercel = !!process["env"].VERCEL;
const entryNode = isVercel ? app : await createHonoServer({
  app,
  defaultLogger: false
});

export { app as a, entryNode as e, fetchWithHeaders as f };
