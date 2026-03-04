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
      certification_type,
      certification_number,
      issued_by,
      issue_date,
      expiry_date,
      document_url
    } = body;
    const result = await sql`
      INSERT INTO certifications (
        contractor_id, certification_type, certification_number,
        issued_by, issue_date, expiry_date, document_url
      ) VALUES (
        ${contractor_id}, ${certification_type}, ${certification_number || null},
        ${issued_by || null}, ${issue_date || null}, ${expiry_date || null},
        ${document_url || null}
      ) RETURNING *
    `;
    return Response.json({
      certification: result[0]
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { POST };
