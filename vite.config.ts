import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, type Plugin} from 'vite';

function adminApiPlugin(): Plugin {
  const dataDir = path.resolve(__dirname, 'data');
  const dataFile = path.resolve(dataDir, 'overrides.json');

  function readData() {
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify({ fields: {}, addedItems: {}, deletedItems: {} }, null, 2));
      }
      const raw = fs.readFileSync(dataFile, 'utf-8');
      const parsed = JSON.parse(raw);
      parsed.fields = parsed.fields || {};
      parsed.addedItems = parsed.addedItems || {};
      parsed.deletedItems = parsed.deletedItems || {};
      return parsed;
    } catch {
      return { fields: {}, addedItems: {}, deletedItems: {} };
    }
  }

  function writeData(data: unknown) {
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write overrides.json:', e);
    }
  }

  const ADMIN_PASS = process.env.ADMIN_PASSPHRASE || 'pichan-admin';

  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/')) return next();

        const readBody = async (): Promise<Record<string, unknown>> => {
          return new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });
        };

        const sendJson = (status: number, obj: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(obj));
        };

        if (url === '/api/health' && req.method === 'GET') {
          return sendJson(200, { ok: true });
        }

        if (url === '/api/auth/login' && req.method === 'POST') {
          const body = await readBody();
          if (body.password === ADMIN_PASS) {
            return sendJson(200, { token: ADMIN_PASS });
          } else {
            return sendJson(401, { error: 'Неверный пароль.' });
          }
        }

        if (url === '/api/overrides' && req.method === 'GET') {
          const data = readData();
          return sendJson(200, data);
        }

        // Auth check for write routes
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
        if (token !== ADMIN_PASS) {
          return sendJson(401, { error: 'Неверный или отсутствующий пароль администратора.' });
        }

        if (url === '/api/overrides/field' && req.method === 'PATCH') {
          const body = await readBody();
          const fieldPath = typeof body.path === 'string' ? body.path : '';
          const value = typeof body.value === 'string' ? body.value : undefined;
          if (!fieldPath || value === undefined) {
            return sendJson(400, { error: 'Нужны поля path и value.' });
          }
          const data = readData();
          data.fields = data.fields || {};
          data.fields[fieldPath] = value;
          writeData(data);
          return sendJson(200, { ok: true });
        }

        if (url === '/api/overrides/item' && req.method === 'POST') {
          const body = await readBody();
          const groupKey = typeof body.groupKey === 'string' ? body.groupKey : '';
          const item = body.item;
          if (!groupKey || item === undefined) {
            return sendJson(400, { error: 'Нужны поля groupKey и item.' });
          }
          const data = readData();
          data.addedItems = data.addedItems || {};
          data.addedItems[groupKey] = data.addedItems[groupKey] || [];
          data.addedItems[groupKey].push(item);
          writeData(data);
          return sendJson(200, { ok: true });
        }

        if (url === '/api/overrides/delete-item' && req.method === 'POST') {
          const body = await readBody();
          const groupKey = typeof body.groupKey === 'string' ? body.groupKey : '';
          const identifier = typeof body.identifier === 'string' ? body.identifier : '';
          if (!groupKey || !identifier) {
            return sendJson(400, { error: 'Нужны поля groupKey и identifier.' });
          }
          const data = readData();
          data.addedItems = data.addedItems || {};
          data.deletedItems = data.deletedItems || {};

          // Filter out from addedItems if present
          if (Array.isArray(data.addedItems[groupKey])) {
            data.addedItems[groupKey] = data.addedItems[groupKey].filter((it: unknown) => {
              if (it && typeof it === 'object') {
                const h = 'h' in it ? (it as { h: unknown }).h : undefined;
                const title = 'title' in it ? (it as { title: unknown }).title : undefined;
                const t = 't' in it ? (it as { t: unknown }).t : undefined;
                return h !== identifier && title !== identifier && t !== identifier;
              }
              return true;
            });
          }

          // Record in deletedItems
          const delList = (data.deletedItems[groupKey] as string[] | undefined) || [];
          if (!delList.includes(identifier)) {
            delList.push(identifier);
          }
          data.deletedItems[groupKey] = delList;
          writeData(data);
          return sendJson(200, { ok: true });
        }

        if (url === '/api/overrides/reset' && req.method === 'POST') {
          writeData({ fields: {}, addedItems: {}, deletedItems: {} });
          return sendJson(200, { ok: true });
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), adminApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
