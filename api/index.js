import { createRequestHandler } from 'react-router';
// @ts-ignore – virtual module provided by React Router at build time
import * as build from 'virtual:react-router/server-build';

import * as hono_server from '../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js';

// The Hono app is exported from the server build by entry-node.ts
const app = hono_server.app;

if (!app) {
    throw new Error(
        '❌ Could not find Hono app in server build. ' +
        'Make sure __create/entry-node.ts exports { app }.'
    );
}

export const config = {
    runtime: 'nodejs',
};

// Export a standard Web API handler for Vercel
export default async function handler(request) {
    return app.fetch(request);
}
