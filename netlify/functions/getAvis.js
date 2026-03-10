export async function handler() {
  try {
    const res = await fetch(
      "https://sound-industry.netlify.app/forms/avis/submissions.json"
    );

    const submissions = await res.json();

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