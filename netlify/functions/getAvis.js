export async function handler() {
  const formId = "avis"; // your form name

  const response = await fetch(
    `https://api.netlify.com/api/v1/forms?access_token=${process.env.NETLIFY_TOKEN}`
  );
  const forms = await response.json();

  const avisForm = forms.find(f => f.name === formId);
  if (!avisForm) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Form not found" })
    };
  }

  const submissionsRes = await fetch(
    `https://api.netlify.com/api/v1/forms/${avisForm.id}/submissions?access_token=${process.env.NETLIFY_TOKEN}`
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
}
