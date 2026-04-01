import { createPool } from '../db/pool.js';

export async function authenticateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'API key required' });
  }

  const apiKey = authHeader.slice(7);
  const crypto = await import('crypto');
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  try {
    const pool = await createPool();
    const [rows] = await pool.query(
      'SELECT id, name, permissions, last_used_at FROM api_keys WHERE key_hash = ? AND is_active = TRUE',
      [keyHash]
    );
    await pool.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.apiKey = rows[0];
    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Admin credentials required' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const crypto = await import('crypto');
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  try {
    const pool = await createPool();
    const [rows] = await pool.query(
      'SELECT id, username, role FROM admin_users WHERE username = ? AND password_hash = ?',
      [username, passwordHash]
    );
    await pool.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.admin = rows[0];
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
