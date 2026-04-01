// Admin Telemetry — Netlify Function
// GET /admin/telemetry/summary — get event summary
// GET /admin/telemetry — get recent events

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'telemetry.json');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

async function getEvents() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function verifyAuth(event) {
  if (!ADMIN_PASSWORD) return true;

  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  if (!authHeader) return false;

  try {
    const base64 = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(base64, 'base64').toString();
    const [username, password] = decoded.split(':');
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export const handler = async (event) => {
  if (!verifyAuth(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    const events = await getEvents();

    if (event.queryStringParameters?.summary === 'true' || event.path?.includes('summary')) {
      const counts = {};
      events.forEach((e) => {
        counts[e.event_type] = (counts[e.event_type] || 0) + 1;
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ eventCounts: counts, totalEvents: events.length }),
      };
    }

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
};
