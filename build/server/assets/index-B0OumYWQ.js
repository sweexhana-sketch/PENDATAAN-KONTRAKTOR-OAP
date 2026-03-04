import { AsyncLocalStorage } from 'node:async_hooks';
import nodeConsole from 'node:console';
import { skipCSRFCheck } from '@auth/core';
import Credentials from '@auth/core/providers/credentials';
import { initAuthConfig, authHandler } from '@hono/auth-js';
import { verify, hash } from 'argon2';
import { Hono } from 'hono';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createMiddleware } from 'hono/factory';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { logger } from 'hono/logger';
import { createRequestHandler } from 'react-router';
import { serializeError } from 'serialize-error';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

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

/**
 * Local file-based user store for development.
 * Stores users and hashed passwords in .data/users.json
 */

const DATA_DIR = join(process.cwd(), '.data');
const USERS_FILE = join(DATA_DIR, 'users.json');

function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
}

function readUsers() {
    ensureDataDir();
    if (!existsSync(USERS_FILE)) {
        return [];
    }
    try {
        return JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
    } catch {
        return [];
    }
}

function writeUsers(users) {
    ensureDataDir();
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

function getUserByEmail(email) {
    const users = readUsers();
    return users.find(u => u.email === email) ?? null;
}

function createUser({ email, name, password }) {
    const users = readUsers();
    const id = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const newUser = {
        id,
        email,
        name: name ?? email.split('@')[0],
        password,         // already hashed
        emailVerified: null,
        image: null,
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    return newUser;
}

const getHTMLForErrorPage = (err) => {
  return `
<html>
  <head>
    <script>
    window.onload = () => {
      const error = ${JSON.stringify(serializeError(err))};
      window.parent.postMessage({ type: 'sandbox:web:ready' }, '*');
      window.parent.postMessage({ type: 'sandbox:error:detected', error: error }, '*');

      const healthyResponse = {
        type: 'sandbox:web:healthcheck:response',
        healthy: true,
        hasError: true,
        supportsErrorDetected: true,
      };
      window.addEventListener('message', (event) => {
        if (event.data.type === 'sandbox:navigation') {
          window.location.pathname = event.data.pathname;
        }
        if (event.data.type === 'sandbox:web:healthcheck') {
          window.parent.postMessage(healthyResponse, '*');
        }
      });
      console.error(error);
    }
    <\/script>
  </head>
  <body></body>
</html>
    `;
};

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
const routeModules = /* #__PURE__ */ Object.assign({"../src/app/api/__create/ssr-test/route.js": () => import('./route-CTW8GF-q.js'),"../src/app/api/auth/expo-web-success/route.js": () => import('./route-Ds7wDXew.js'),"../src/app/api/auth/token/route.js": () => import('./route-CnUs8NfG.js'),"../src/app/api/certifications/route.js": () => import('./route-2pNsxPmS.js'),"../src/app/api/contractors/[id]/route.js": () => import('./route-BliuqY2V.js'),"../src/app/api/contractors/my-profile/route.js": () => import('./route-CjMIgMp5.js'),"../src/app/api/contractors/route.js": () => import('./route-C5WjLRPJ.js'),"../src/app/api/contractors/verify/route.js": () => import('./route-BZkgHUpV.js'),"../src/app/api/documents/route.js": () => import('./route-ByeQSxba.js'),"../src/app/api/make-admin/route.js": () => import('./route-Bm2T6F6z.js'),"../src/app/api/projects/route.js": () => import('./route-KBIXsB81.js'),"../src/app/api/stats/route.js": () => import('./route-CJ3SnGUp.js'),"../src/app/api/submit-kegiatan/route.js": () => import('./route-BGDDcmuM.js'),"../src/app/api/submit-kontraktor/route.js": () => import('./route-DnZhX0Bn.js'),"../src/app/api/user/role/route.js": () => import('./route-GlXCYa4c.js')});
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
async function registerRoutes() {
  const sortedPaths = Object.keys(routeModules).sort((a, b) => b.length - a.length);
  api.routes = [];
  for (const path of sortedPaths) {
    try {
      const route = await routeModules[path]();
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
await registerRoutes();

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
              const existing = getUserByEmail(email);
              if (existing) {
                nodeConsole.log("AUTH: User found, verifying password");
                const ok = await verify(existing.password, password);
                if (!ok) {
                  nodeConsole.log("AUTH: Wrong password");
                  return null;
                }
                nodeConsole.log("AUTH: Login success for:", email);
                return { id: existing.id, email: existing.email, name: existing.name, image: existing.image };
              }
              nodeConsole.log("AUTH: Creating new user:", email);
              const hashed = await hash(password);
              const newUser = createUser({ email, name: name ?? "", password: hashed });
              nodeConsole.log("AUTH: User created:", newUser.id);
              return { id: newUser.id, email: newUser.email, name: newUser.name, image: null };
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
const index = await createHonoServer({
  app,
  defaultLogger: false
});

export { fetchWithHeaders as f, index as i };
