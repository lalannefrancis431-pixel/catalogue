import fetch from "node-fetch";

export async function handler(event) {
  const { nom, message } = JSON.parse(event.body);

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  const res = await fetch(`${url}/rest/v1/avis`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ nom, message })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}