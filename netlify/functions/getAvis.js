import fetch from "node-fetch";

export async function handler() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  const res = await fetch(`${url}/rest/v1/avis?select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}