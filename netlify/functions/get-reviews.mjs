import { neon } from "@neondatabase/serverless";

export default async function handler(request) {
  if (request.method !== "GET") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const url = new URL(request.url);
    const productId = Number(url.searchParams.get("productId"));

    if (!Number.isInteger(productId) || productId < 1 || productId > 18) {
      return Response.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const sql = neon(process.env.DATABASE_URL);

    const reviews = await sql`
      SELECT
        id,
        customer_name,
        rating,
        comment,
        created_at
      FROM reviews
      WHERE product_id = ${productId}
        AND status = 'approved'
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      reviews
    });

  } catch (error) {
    console.error("Review retrieval error:", error);

    return Response.json(
      { error: "Unable to retrieve reviews." },
      { status: 500 }
    );
  }
}
