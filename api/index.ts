import { handle } from '@hono/node-server/vercel';
import app from '../build/server/index.js'; // Sesuaikan dengan lokasi export Hono kamu

export const config = {
    runtime: 'edge',
};

export default handle(app);
