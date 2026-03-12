export async function handler() {
  try {
    const token = process.env.NETLIFY_TOKEN;

    // 1. Get all forms
    const formsRes = await fetch("https://api.netlify.com/api/v1/forms", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const forms = await formsRes.json();
    const avisForm = forms.find(f => f.name === "avis");

    if (!avisForm) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Form 'avis' not found" })
      };
    }

    // 2. Get submissions for this form
    const submissionsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${avisForm.id}/submissions`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const submissions = await submissionsRes.json();

    // 3. Format the data
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
