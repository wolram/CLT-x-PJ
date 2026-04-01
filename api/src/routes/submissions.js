import { Router } from 'express';
import { z } from 'zod';
import { createPool } from '../db/pool.js';

const router = Router();

const submissionSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.string().email(),
  role: z.string().max(100).optional(),
  challenge: z.string().optional(),
  source: z.string().max(100).optional(),
});

const updateStatusSchema = z.object({
  activation_status: z.enum(['pending', 'contacted', 'scheduled', 'onboarded', 'not_interested']),
});

// Public: create waitlist submission
router.post('/', async (req, res) => {
  try {
    const data = submissionSchema.parse(req.body);
    const pool = await createPool();

    const [result] = await pool.query(
      'INSERT INTO waitlist_submissions (name, email, role, challenge, source) VALUES (?, ?, ?, ?, ?)',
      [data.name || null, data.email, data.role || null, data.challenge || null, data.source || null]
    );

    await pool.end();

    res.status(201).json({
      id: result.insertId,
      message: 'Submission created',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: list submissions
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0, status } = req.query;
    const pool = await createPool();

    let query = 'SELECT * FROM waitlist_submissions';
    const params = [];

    if (status) {
      query += ' WHERE activation_status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    await pool.end();

    res.json(rows);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: get single submission
router.get('/:id', async (req, res) => {
  try {
    const pool = await createPool();
    const [rows] = await pool.query('SELECT * FROM waitlist_submissions WHERE id = ?', [req.params.id]);
    await pool.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: update submission status
router.patch('/:id/status', async (req, res) => {
  try {
    const data = updateStatusSchema.parse(req.body);
    const pool = await createPool();

    const [result] = await pool.query(
      'UPDATE waitlist_submissions SET activation_status = ? WHERE id = ?',
      [data.activation_status, req.params.id]
    );
    await pool.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ message: 'Status updated' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: delete submission
router.delete('/:id', async (req, res) => {
  try {
    const pool = await createPool();
    const [result] = await pool.query('DELETE FROM waitlist_submissions WHERE id = ?', [req.params.id]);
    await pool.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
