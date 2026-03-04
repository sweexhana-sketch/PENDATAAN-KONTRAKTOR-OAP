import { handle } from '@hono/node-server/vercel';
// @ts-ignore
import * as server from '../build/server/index.js';

// Support both named export { app } and default export as the app
const app = server.app || (server.default && server.default.app) || server.default;

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
