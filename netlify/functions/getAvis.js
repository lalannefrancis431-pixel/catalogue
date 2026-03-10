export async function handler() {
  try {
    const token = process.env.NETLIFY_TOKEN;

    const submissionsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${process.env.SITE_URL}/forms/avis/submissions?access_token=${token}`
    );

    const submissions = await submissionsRes.json();

    const formatted = submissions.map(s => ({
      nom: s.data.nom,
      message: s.data.message
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formatted)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}