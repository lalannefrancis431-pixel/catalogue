import { neon } from "@neondatabase/serverless";

export default async function handler(request) {
  if (request.method !== "GET") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT current_database() AS database, NOW() AS server_time
    `;

    return Response.json({
      success: true,
      message: "SoundIndustry database connected!",
      database: result[0].database,
      serverTime: result[0].server_time
    });

  } catch (error) {
    console.error("Database connection error:", error);

    return Response.json(
      { success: false, error: "Database connection failed." },
      { status: 500 }
    );
  }
}