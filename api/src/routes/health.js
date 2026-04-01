import { Router } from 'express';
import { createPool } from '../db/pool.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pool = await createPool();
    await pool.query('SELECT 1');
    await pool.end();

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
    });
  }
});

export default router;
