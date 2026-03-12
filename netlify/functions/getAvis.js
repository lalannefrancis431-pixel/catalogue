export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      tokenExists: !!process.env.NETLIFY_TOKEN,
      tokenLength: process.env.NETLIFY_TOKEN ? process.env.NETLIFY_TOKEN.length : 0
    })
  };
}
