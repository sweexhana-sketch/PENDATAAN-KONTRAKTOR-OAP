import { handle } from '@hono/node-server/vercel';
// @ts-ignore
import server from '../build/server/index.js';

export const config = {
    runtime: 'nodejs',
};

// The bundled server from react-router-hono-server 
// usually exports the Hono app as default or a property.
// Based on build/server/index.js check, it exports a default.
export default handle(server.app || server);
