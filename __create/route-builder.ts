import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Use import.meta.glob to find all API routes. This works in both dev and prod.
const routeModules = import.meta.glob('../src/app/api/**/route.js');

// Helper function to transform file path to Hono route path
function getHonoPath(path: string): string {
  // path is something like "../src/app/api/v1/users/[id]/route.js"
  // or "../src/app/api/route.js" for the root API route
  const prefix = '../src/app/api/';
  const suffix = '/route.js';

  let relativePath = path.slice(prefix.length);
  if (relativePath.endsWith(suffix)) {
    relativePath = relativePath.slice(0, -suffix.length);
  } else if (relativePath === 'route.js') {
    relativePath = '';
  }

  if (!relativePath) return '/';

  const parts = relativePath.split('/').filter(Boolean);
  const transformedParts = parts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? `:${param}{.+}`
        : `:${param}`;
    }
    return segment;
  });

  return `/${transformedParts.join('/')}`;
}

// Import and register all routes
async function registerRoutes() {
  const sortedPaths = Object.keys(routeModules).sort((a, b) => b.length - a.length);

  // Clear existing routes if needed (though usually not necessary in prod)
  api.routes = [];

  for (const path of sortedPaths) {
    try {
      // routeModules[path] is a function that returns a promise of the module
      const route: any = await routeModules[path]();
      const honoPath = getHonoPath(path);

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        if (route[method]) {
          const handler: Handler = async (c) => {
            const params = c.req.param();
            try {
              // In production, we just use the pre-imported route
              // If we wanted to support hot reloading in dev with glob, 
              // we'd need a different approach, but Vite handles glob reload.
              return await route[method](c.req.raw, { params });
            } catch (err) {
              console.error(`Error in ${method} ${honoPath}:`, err);
              return c.json({ error: 'Internal Server Error' }, 500);
            }
          };

          const methodLowercase = method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
          api[methodLowercase](honoPath, handler);
        }
      }
    } catch (error) {
      console.error(`Error registering route ${path}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept((newSelf) => {
    // Note: With glob, Vite usually reloads the whole module anyway
    // but we can try to re-register if needed.
  });
}

export { api, API_BASENAME };
