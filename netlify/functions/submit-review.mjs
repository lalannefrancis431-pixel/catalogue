import { neon } from "@neondatabase/serverless";

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const body = await request.json();

    const productId = Number(body.productId);
    const customerName = String(body.customerName || "").trim();
    const rating = Number(body.rating);
    const comment = String(body.comment || "").trim();

    if (!Number.isInteger(productId) || productId < 1 || productId > 18) {
      return Response.json(
        { error: "Invalid product." },
        { status: 400 }
      );
    }

    if (!customerName || customerName.length > 80) {
      return Response.json(
        { error: "Name must contain between 1 and 80 characters." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return Response.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    if (!comment || comment.length > 3000) {
      return Response.json(
        { error: "Comment must contain between 1 and 3000 characters." },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO reviews (
        product_id,
        customer_name,
        rating,
        comment,
        status
      )
      VALUES (
        ${productId},
        ${customerName},
        ${rating},
        ${comment},
        'pending'
      )
    `;

    return Response.json({
      success: true,
      message: "Thank you! Your review is awaiting approval."
    });

  } catch (error) {
    console.error("Review submission error:", error);

    return Response.json(
      { error: "Unable to submit your review." },
      { status: 500 }
    );
  }
}
