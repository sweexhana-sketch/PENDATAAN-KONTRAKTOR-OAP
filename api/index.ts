import { handle } from '@hono/node-server/vercel';
// @ts-ignore
import { app } from '../__create/index';

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
