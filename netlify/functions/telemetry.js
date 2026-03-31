const telemetryEvents = []

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const data = JSON.parse(event.body || '{}')
    const entry = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: data.type || 'unknown',
      userId: data.userId || null,
      timestamp: new Date().toISOString(),
      metadata: data.metadata || {},
    }

    telemetryEvents.push(entry)

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
