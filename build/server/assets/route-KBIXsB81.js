import { a as auth, s as sql } from './auth-CzO2Uz6f.js';
import '@neondatabase/serverless';
import '@auth/core/jwt';
import 'hono/context-storage';
import '@auth/core/providers/credentials';
import 'argon2';

async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const body = await request.json();
    const {
      contractor_id,
      project_name,
      project_location,
      project_value,
      client_name,
      project_type,
      start_date,
      end_date,
      project_status,
      description
    } = body;
    const result = await sql`
      INSERT INTO projects (
        contractor_id, project_name, project_location, project_value,
        client_name, project_type, start_date, end_date, project_status, description
      ) VALUES (
        ${contractor_id}, ${project_name}, ${project_location || null}, ${project_value || null},
        ${client_name || null}, ${project_type || null}, ${start_date || null},
        ${end_date || null}, ${project_status || null}, ${description || null}
      ) RETURNING *
    `;
    return Response.json({
      project: result[0]
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { POST };
