const submissions = []

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const data = JSON.parse(event.body || '{}')
    const entry = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: data.name || '',
      email: data.email || '',
      role: data.role || '',
      challenge: data.challenge || '',
      source: data.source || 'waitlist',
      date: new Date().toISOString(),
      activationStatus: 'pending',
    }

    submissions.push(entry)

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: entry.id }),
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    }
  }
}
