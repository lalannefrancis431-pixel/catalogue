export async function handler() {
  try {
    const token = process.env.NETLIFY_TOKEN;

    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/f5631fa2-0720-48be-8bd8-a26c47e228c3/forms/avis/submissions?access_token=${token}`
    );

    const text = await res.text(); // read raw response

    return {
      statusCode: 200,
      body: text
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
