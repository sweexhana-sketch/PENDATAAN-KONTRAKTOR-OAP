import { handle } from '@hono/node-server/vercel';
import { Hono } from 'hono';

const app = new Hono();

app.all('*', async (c) => {
    try {
        // Attempt to dynamically load the compiled application bundle
        const server = await import('../build/server/index.js');
        const mainApp = server.app || (server.default && server.default.app) || server.default;

        if (!mainApp) {
            return c.json({ error: 'Imported server bundle did not export a valid Hono app' });
        }

        // We can't easily forward the request to another Hono app instance mid-flight 
        // in a simple way without fetch, but if we reach here, it means it didn't crash.
        return c.json({ success: 'Successfully loaded server bundle without crashing!', exports: Object.keys(server) });
    } catch (e: any) {
        // If importing the bundle throws an error (e.g. missing native module), print it to the screen!
        return c.text(`FATAL CRASH DURING APP INITIALIZATION:\n\n${e.message}\n\n${e.stack}`, 500);
    }
});

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
