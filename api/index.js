import { handle } from '@hono/node-server/vercel';
import * as server from '../build/server/index.js';

// The bundled server from react-router-hono-server exports { app }
const app = server.app || (server.default && server.default.app) || server.default;

if (!app) {
    console.error('❌ Could not find Hono app in server build');
    throw new Error('Hono app not found in server build. Check entry-node.ts exports.');
}

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
