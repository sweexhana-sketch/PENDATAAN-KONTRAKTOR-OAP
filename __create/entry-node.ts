import { app } from './index';
import { createHonoServer } from 'react-router-hono-server/node';

export { app };
export default process.env.VERCEL ? app : await createHonoServer({
    app,
    defaultLogger: false,
});
