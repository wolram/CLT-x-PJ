// Health check — Netlify Function
// GET /.netlify/functions/health

export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'cltxpj-api',
      platform: 'netlify-functions',
    }),
  };
};
