export async function handler() {
  try {
    const token = process.env.NETLIFY_TOKEN;
    const siteId = process.env.SITE_ID;

    const submissionsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms/avis/submissions?access_token=${token}`
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
