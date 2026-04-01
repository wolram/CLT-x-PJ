import { Router } from 'express';
import { z } from 'zod';
import { createPool } from '../db/pool.js';

const router = Router();

const telemetrySchema = z.object({
  event_type: z.string().max(100),
  event_data: z.record(z.unknown()).optional(),
});

// Public: record telemetry event
router.post('/', async (req, res) => {
  try {
    const data = telemetrySchema.parse(req.body);
    const pool = await createPool();

    const [result] = await pool.query(
      'INSERT INTO telemetry_events (event_type, event_data, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [
        data.event_type,
        data.event_data ? JSON.stringify(data.event_data) : null,
        req.ip || req.connection.remoteAddress,
        req.headers['user-agent'] || null,
      ]
    );

    await pool.end();

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error recording telemetry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: get telemetry summary
router.get('/summary', async (req, res) => {
  try {
    const pool = await createPool();

    const [counts] = await pool.query(
      'SELECT event_type, COUNT(*) as count FROM telemetry_events GROUP BY event_type ORDER BY count DESC'
    );

    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM telemetry_events');

    await pool.end();

    const eventCounts = {};
    counts.forEach(row => {
      eventCounts[row.event_type] = row.count;
    });

    res.json({ eventCounts, totalEvents: total });
  } catch (error) {
    console.error('Error fetching telemetry summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: get recent telemetry events
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0, event_type } = req.query;
    const pool = await createPool();

    let query = 'SELECT * FROM telemetry_events';
    const params = [];

    if (event_type) {
      query += ' WHERE event_type = ?';
      params.push(event_type);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    await pool.end();

    res.json(rows);
  } catch (error) {
    console.error('Error fetching telemetry events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
