// Telemetry — Netlify Function
// POST /.netlify/functions/telemetry — record event
// GET  /.netlify/functions/telemetry — get events (admin)

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'telemetry.json');

async function ensureDataDir() {
  const dir = join(__dirname, '..', 'data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // already exists
  }
}

async function getEvents() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveEvents(events) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 0), 'utf-8');
}

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

    const record = {
      id: crypto.randomUUID(),
      event_type,
      event_data: event_data || {},
      ip_address: event.headers?.['x-nf-client-connection-ip'] || event.headers?.['client-ip'] || null,
      user_agent: event.headers?.['user-agent'] || null,
      created_at: new Date().toISOString(),
    };

    const events = await getEvents();
    events.push(record);

    // Keep last 10000 events to avoid file size limits
    if (events.length > 10000) {
      events.splice(0, events.length - 10000);
    }

    await saveEvents(events);

    return {
      statusCode: 201,
      body: JSON.stringify({ id: record.id }),
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
    const events = await getEvents();

    // Summary mode
    if (event.queryStringParameters?.summary === 'true') {
      const counts = {};
      events.forEach((e) => {
        counts[e.event_type] = (counts[e.event_type] || 0) + 1;
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ eventCounts: counts, totalEvents: events.length }),
      };
    }

    // Recent events (default 100)
    const limit = parseInt(event.queryStringParameters?.limit || '100', 10);
    const recent = events.slice(-limit).reverse();

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
