// Telemetry — Netlify Function
// POST /.netlify/functions/telemetry — record event
// GET  /.netlify/functions/telemetry — get events (admin)

import { getStore } from '@netlify/blobs';

const TELEMETRY_STORE = 'telemetry';

export const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    return handlePost(event);
  }
  if (event.httpMethod === 'GET') {
    return handleGet(event);
  }
  return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
};

async function handlePost(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const { event_type, event_data } = body;

    if (!event_type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'event_type is required' }),
      };
    }

    const store = getStore(TELEMETRY_STORE);
    const id = crypto.randomUUID();

    const record = {
      id,
      event_type,
      event_data: event_data || {},
      ip_address: event.headers?.['x-nf-client-connection-ip'] || event.headers?.['client-ip'] || null,
      user_agent: event.headers?.['user-agent'] || null,
      created_at: new Date().toISOString(),
    };

    await store.setJSON(`events/${id}`, record);

    return {
      statusCode: 201,
      body: JSON.stringify({ id }),
    };
  } catch (error) {
    console.error('Error recording telemetry:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

async function handleGet(event) {
  try {
    const store = getStore(TELEMETRY_STORE);
    const { blobs } = await store.list({ prefix: 'events/' });

    const events = await Promise.all(
      blobs.map(async (b) => {
        try {
          return await store.get(b.key, { type: 'json' });
        } catch {
          return null;
        }
      })
    );

    const validEvents = events.filter(Boolean);

    if (event.queryStringParameters?.summary === 'true') {
      const counts = {};
      validEvents.forEach((e) => {
        counts[e.event_type] = (counts[e.event_type] || 0) + 1;
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ eventCounts: counts, totalEvents: validEvents.length }),
      };
    }

    const limit = parseInt(event.queryStringParameters?.limit || '100', 10);
    const sorted = validEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const recent = sorted.slice(0, limit);

    return {
      statusCode: 200,
      body: JSON.stringify(recent),
    };
  } catch (error) {
    console.error('Error fetching telemetry:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
