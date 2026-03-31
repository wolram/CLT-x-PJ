const submissions = []
const telemetryEvents = []

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const eventCounts = {}
  telemetryEvents.forEach(e => {
    eventCounts[e.type] = (eventCounts[e.type] || 0) + 1
  })

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      submissions,
      telemetry: {
        eventCounts,
        totalEvents: telemetryEvents.length,
      },
    }),
  }
}
