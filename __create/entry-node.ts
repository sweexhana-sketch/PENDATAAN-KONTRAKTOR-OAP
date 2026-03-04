import { app } from './index';
import { createHonoServer } from 'react-router-hono-server/node';

export { app };
export default await createHonoServer({
    app,
    defaultLogger: false,
});
