import { getStore } from '@netlify/blobs/node';

export async function handler() {
  const store = getStore('soundindustry-avis');

  const avis = await store.get('avis.json', { type: 'json' }) || [];

  return {
    statusCode: 200,
    body: JSON.stringify(avis),
    headers: { "Content-Type": "application/json" }
  };
}
