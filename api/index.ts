import { handle } from '@hono/node-server/vercel';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello from Vercel! API is running.'));
app.all('*', (c) => c.json({ message: 'Catch all route working' }, 200));

export const config = {
    runtime: 'nodejs',
};

export default handle(app);
