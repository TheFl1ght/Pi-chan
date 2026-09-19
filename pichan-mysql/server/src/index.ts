import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { overridesRouter } from './routes/overrides.js';
import { login } from './auth.js';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '2mb' }));

app.post('/api/auth/login', login);
app.use('/api', overridesRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`pi-chan admin API listening on http://localhost:${port}`);
});
