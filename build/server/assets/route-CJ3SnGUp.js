import { a as auth, s as sql } from './auth-CzO2Uz6f.js';
import '@neondatabase/serverless';
import '@auth/core/jwt';
import 'hono/context-storage';
import '@auth/core/providers/credentials';
import 'argon2';

// Mendapatkan statistik untuk dashboard admin
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
    const totalContractors = await sql`SELECT COUNT(*) as count FROM contractors`;
    const pendingApprovals = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'pending'`;
    const approvedContractors = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'approved'`;
    const rejectedContractors = await sql`SELECT COUNT(*) as count FROM contractors WHERE status = 'rejected'`;
    const recentSubmissions = await sql`
      SELECT * FROM contractors 
      ORDER BY created_at DESC 
      LIMIT 5
    `;
    return Response.json({
      stats: {
        total: parseInt(totalContractors[0].count),
        pending: parseInt(pendingApprovals[0].count),
        approved: parseInt(approvedContractors[0].count),
        rejected: parseInt(rejectedContractors[0].count)
      },
      recentSubmissions
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { GET };
