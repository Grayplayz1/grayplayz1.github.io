const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const { mock } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3000;
const FORTNITE_API_KEY = process.env.TRN_API_KEY || '67cbf9b5-6210-4f39-9586-9b8e157ecabe';

app.use(cors());
app.use(bodyParser.json());

// initialize DB and seed mock data
db.init();
db.seedFromMock(mock, () => {
  console.log('Mock data seeded');
});

// Connect account endpoint — returns stats if found (or null)
app.post('/api/connect', (req, res) => {
  const { name, game } = req.body || {};
  if (!name || !game) return res.status(400).json({ error: 'Missing name or game' });
  // first try DB
  db.lookupPlayer(game, name, (err, stats) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const account = { name, game, connectedAt: Date.now() };
    if (stats) {
      account.rank = stats.rank;
      account.stats = stats.stats;
      account.details = stats.details;
    }
    db.upsertAccount(account, () => {
      res.json({ name: account.name, game: account.game, stats: stats || null });
    });
  });
});

app.get('/api/profile/:game/:name', (req, res) => {
  const { game, name } = req.params;
  db.lookupPlayer(game, name, (err, stats) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ name, game, stats: stats || null });
  });
});

app.get('/api/fortnite/profile/:name', async (req, res) => {
  const { name } = req.params;
  if (!name) return res.status(400).json({ error: 'Missing name' });

  const url = `https://api.tracker.gg/api/v2/fortnite/standard/profile/epic/${encodeURIComponent(name)}`;
  const headers = {
    'Content-Type': 'application/json',
    'TRN-Api-Key': FORTNITE_API_KEY
  };

  try {
    let response = await fetch(url, { headers });
    if (!response.ok && FORTNITE_API_KEY) {
      response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    }
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Fortnite stats lookup failed' });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Fortnite stats lookup failed' });
  }
});

app.get('/api/leaderboard/:game', (req, res) => {
  const { game } = req.params;
  db.listLeaderboard(game, 50, (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

app.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!post || !post.game || !post.author || !post.description) return res.status(400).json({ error: 'Missing fields' });
  db.savePost(post, (err, id) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true, id });
  });
});

app.get('/api/posts', (req, res) => {
  // simple: return latest posts from DB
  db.db = db.db || null;
  const sqlite = require('sqlite3').verbose();
  const path = require('path');
  const DB_PATH = path.join(__dirname, 'teamup.db');
  const rdb = new sqlite.Database(DB_PATH);
  rdb.all('SELECT * FROM posts ORDER BY createdAt DESC LIMIT 200', (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows || []);
  });
});

app.listen(PORT, () => {
  console.log(`Teamup backend listening on http://localhost:${PORT}`);
});
