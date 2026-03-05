import { app } from './index';
import { createHonoServer } from 'react-router-hono-server/node';

export { app };

// IMPORTANT: We use `process['env']` instead of `process.env` here to completely 
// prevent Vite from statically replacing this variable with `undefined` during the build step.
// Otherwise, Vite aggressively hardcodes the `await createHonoServer` into the production bundle,
// which causes Vercel Serverless functions to hang forever trying to bind to a local port.
const isVercel = !!process['env'].VERCEL;

export default isVercel ? app : await createHonoServer({
    app,
    defaultLogger: false,
});
