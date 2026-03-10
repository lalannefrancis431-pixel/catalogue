export async function handler() {
  try {
    const res = await fetch("https://sound-industry.netlify.app/.netlify/functions/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "list-submissions",
        formName: "avis"
      })
    });

    const data = await res.json();

    const formatted = data.submissions.map(s => ({
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