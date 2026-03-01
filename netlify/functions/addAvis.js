import { getStore } from '@netlify/blobs/node';

export async function handler(event) {
  const store = getStore('soundindustry-avis');

  const body = JSON.parse(event.body || "{}");
  const { nom, message } = body;

  if (!nom || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing fields" })
    };
  }

  const avis = await store.get('avis.json', { type: 'json' }) || [];

  avis.push({
    nom,
    message,
    date: new Date().toISOString()
  });

  await store.set('avis.json', JSON.stringify(avis));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
