import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', repos: [] });
});

app.get('/api/repos', (req, res) => {
  res.json({ repos: [] });
});

app.get('/api/repos/:name/status', (req, res) => {
  res.json({ indexed: false, staleness: 'none' });
});

app.get('/api/search', (req, res) => {
  res.json({ results: [] });
});

app.post('/api/query', (req, res) => {
  res.json({ processes: [], process_symbols: [], definitions: [] });
});

app.get('/api/context', (req, res) => {
  res.json({ symbol: null, incoming: {}, outgoing: {}, processes: [] });
});

app.get('/api/impact', (req, res) => {
  res.json({ summary: { affected_count: 0, changed_count: 0 }, changed_symbols: [], affected_processes: [] });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
