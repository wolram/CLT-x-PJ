// Submissions — Netlify Function
// POST /.netlify/functions/submissions — create waitlist submission
// GET  /.netlify/functions/submissions — list submissions (admin)

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'submissions.json');

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
    const { name, email, role, challenge, source } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'email is required' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    const submission = {
      id: crypto.randomUUID(),
      name: name || null,
      email,
      role: role || null,
      challenge: challenge || null,
      source: source || null,
      activation_status: 'pending',
      created_at: new Date().toISOString(),
    };

    const submissions = await getSubmissions();
    submissions.push(submission);
    await saveSubmissions(submissions);

    return {
      statusCode: 201,
      body: JSON.stringify({ id: submission.id, message: 'Submission created' }),
    };
  } catch (error) {
    console.error('Error creating submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

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

    const paginated = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(offset, offset + limit);

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
