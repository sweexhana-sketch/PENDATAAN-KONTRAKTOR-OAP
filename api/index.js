import { handle } from '@hono/node-server/vercel';
import * as server from '../build/server/index.js';

// The bundled server from react-router-hono-server exports { app }
const app = server.app || (server.default && server.default.app) || server.default;

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
