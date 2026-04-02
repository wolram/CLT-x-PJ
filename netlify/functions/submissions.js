// Submissions — Netlify Function
// POST /.netlify/functions/submissions — create waitlist submission
// GET  /.netlify/functions/submissions — list submissions (admin)

import { getStore } from '@netlify/blobs';

const SUBMISSIONS_STORE = 'submissions';

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

    const store = getStore(SUBMISSIONS_STORE);
    const id = crypto.randomUUID();

    const submission = {
      id,
      name: name || null,
      email,
      role: role || null,
      challenge: challenge || null,
      source: source || null,
      activation_status: 'pending',
      created_at: new Date().toISOString(),
    };

    await store.setJSON(`submissions/${id}`, submission);

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
