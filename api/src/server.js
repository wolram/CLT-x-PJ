import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import submissionsRouter from './routes/submissions.js';
import telemetryRouter from './routes/telemetry.js';
import healthRouter from './routes/health.js';
import { authenticateAdmin } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://cltxpj.app.br',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Public routes
app.use('/api/health', healthRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/telemetry', telemetryRouter);

// Admin routes (protected)
const adminRouter = express.Router();
adminRouter.use(authenticateAdmin);

// Admin submissions management
adminRouter.get('/submissions', async (req, res) => {
  const { createPool } = await import('./db/pool.js');
  const pool = await createPool();
  const [rows] = await pool.query('SELECT * FROM waitlist_submissions ORDER BY created_at DESC');
  await pool.end();
  res.json(rows);
});

adminRouter.patch('/submissions/:id/status', async (req, res) => {
  const { createPool } = await import('./db/pool.js');
  const { activation_status } = req.body;
  const pool = await createPool();
  const [result] = await pool.query(
    'UPDATE waitlist_submissions SET activation_status = ? WHERE id = ?',
    [activation_status, req.params.id]
  );
  await pool.end();
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Submission not found' });
  }
  res.json({ message: 'Status updated' });
});

adminRouter.delete('/submissions/:id', async (req, res) => {
  const { createPool } = await import('./db/pool.js');
  const pool = await createPool();
  const [result] = await pool.query('DELETE FROM waitlist_submissions WHERE id = ?', [req.params.id]);
  await pool.end();
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Submission not found' });
  }
  res.json({ message: 'Submission deleted' });
});

// Admin telemetry
adminRouter.get('/telemetry/summary', async (req, res) => {
  const { createPool } = await import('./db/pool.js');
  const pool = await createPool();
  const [counts] = await pool.query(
    'SELECT event_type, COUNT(*) as count FROM telemetry_events GROUP BY event_type ORDER BY count DESC'
  );
  const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM telemetry_events');
  await pool.end();
  const eventCounts = {};
  counts.forEach(row => { eventCounts[row.event_type] = row.count; });
  res.json({ eventCounts, totalEvents: total });
});

app.use('/api/admin', adminRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
