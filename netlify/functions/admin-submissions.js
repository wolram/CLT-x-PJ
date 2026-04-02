// Admin Submissions — Netlify Function
// GET  /admin/submissions — list submissions
// PATCH /admin/submissions/:id/status — update submission status (via redirect)

import { getStore } from '@netlify/blobs';

const SUBMISSIONS_STORE = 'submissions';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

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
    const store = getStore(SUBMISSIONS_STORE);
    const { blobs } = await store.list({ prefix: 'submissions/' });

    const submissions = await Promise.all(
      blobs.map(async (b) => {
        try {
          return await store.get(b.key, { type: 'json' });
        } catch {
          return null;
        }
      })
    );

    const validSubmissions = submissions.filter(Boolean);

    const limit = parseInt(event.queryStringParameters?.limit || '100', 10);
    const offset = parseInt(event.queryStringParameters?.offset || '0', 10);
    const status = event.queryStringParameters?.status;

    let filtered = validSubmissions;
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

    const store = getStore(SUBMISSIONS_STORE);
    const key = `submissions/${id}`;
    const submission = await store.get(key, { type: 'json' });

    if (!submission) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Submission not found' }),
      };
    }

    submission.activation_status = activation_status;
    await store.setJSON(key, submission);

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
