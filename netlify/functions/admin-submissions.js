// Admin Submissions — Netlify Function
// GET  /admin/submissions — list submissions
// PATCH /admin/submissions/:id/status — update submission status (via redirect)

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'submissions.json');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

async function ensureDataDir() {
  const dir = join(__dirname, '..', 'data');
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // already exists
  }
}

async function getSubmissions() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveSubmissions(submissions) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 0), 'utf-8');
}

function verifyAuth(event) {
  if (!ADMIN_PASSWORD) return true; // No password set, allow all (dev mode)

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

  if (event.httpMethod === 'GET') {
    return handleGet(event);
  }
  if (event.httpMethod === 'PATCH') {
    return handlePatch(event);
  }
  return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
};

async function handleGet(event) {
  try {
    const submissions = await getSubmissions();

    const limit = parseInt(event.queryStringParameters?.limit || '100', 10);
    const offset = parseInt(event.queryStringParameters?.offset || '0', 10);
    const status = event.queryStringParameters?.status;

    let filtered = submissions;
    if (status) {
      filtered = filtered.filter((s) => s.activation_status === status);
    }

    const paginated = filtered
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(offset, offset + limit);

    return {
      statusCode: 200,
      body: JSON.stringify(paginated),
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

async function handlePatch(event) {
  try {
    // Extract ID from path (Netlify redirect passes it through)
    const pathParts = event.path.split('/');
    const idIndex = pathParts.indexOf('submissions');
    const id = idIndex >= 0 ? pathParts[idIndex + 1] : null;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Submission ID is required' }),
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { activation_status } = body;

    if (!activation_status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'activation_status is required' }),
      };
    }

    const submissions = await getSubmissions();
    const submission = submissions.find((s) => s.id === id);

    if (!submission) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Submission not found' }),
      };
    }

    submission.activation_status = activation_status;
    await saveSubmissions(submissions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Status updated', submission }),
    };
  } catch (error) {
    console.error('Error updating submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
