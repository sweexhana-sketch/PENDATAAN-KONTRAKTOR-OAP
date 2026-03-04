import { a as auth, s as sql } from './auth-CzO2Uz6f.js';
import '@neondatabase/serverless';
import '@auth/core/jwt';
import 'hono/context-storage';
import '@auth/core/providers/credentials';
import 'argon2';

async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const result = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;
    if (result.length === 0) {
      return Response.json({
        role: "kontraktor"
      });
    }
    return Response.json({
      role: result[0].role || "kontraktor"
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { GET };
