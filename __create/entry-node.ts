import { app } from './index';
import { createHonoServer } from 'react-router-hono-server/node';
import { createRequestHandler } from "react-router";
// @ts-ignore
import * as build from "virtual:react-router/server-build";

export { app };

const isVercel = !!process['env'].VERCEL;

if (isVercel) {
    const handler = createRequestHandler(build, "production");
    app.all("*", async (c) => {
        return handler(c.req.raw);
    });
}

export default isVercel ? app : await createHonoServer({
    app,
    defaultLogger: false,
});
