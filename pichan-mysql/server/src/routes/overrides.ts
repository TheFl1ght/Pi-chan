import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../auth.js';

export const overridesRouter = Router();

interface OverridesPayload {
  fields: Record<string, string>;
  addedItems: Record<string, unknown[]>;
  deletedItems: Record<string, string[]>;
}

// ---- read: anyone can fetch the current set of overrides ----
overridesRouter.get('/overrides', async (_req, res) => {
  const [fieldRows] = await pool.query<import('mysql2').RowDataPacket[]>(
    'SELECT path, value FROM field_overrides',
  );
  const [itemRows] = await pool.query<import('mysql2').RowDataPacket[]>(
    'SELECT group_key, item_json FROM added_items ORDER BY group_key, sort_order ASC, id ASC',
  );
  const [deletedRows] = await pool.query<import('mysql2').RowDataPacket[]>(
    'SELECT group_key, identifier FROM deleted_items',
  );

  const fields: Record<string, string> = {};
  for (const row of fieldRows) fields[row.path as string] = row.value as string;

  const addedItems: Record<string, unknown[]> = {};
  for (const row of itemRows) {
    const key = row.group_key as string;
    const parsed = typeof row.item_json === 'string' ? JSON.parse(row.item_json) : row.item_json;
    (addedItems[key] ??= []).push(parsed);
  }

  const deletedItems: Record<string, string[]> = {};
  for (const row of deletedRows) {
    const key = row.group_key as string;
    const id = row.identifier as string;
    (deletedItems[key] ??= []).push(id);
  }

  const payload: OverridesPayload = { fields, addedItems, deletedItems };
  res.json(payload);
});

// ---- write: admin only from here down ----
overridesRouter.use(requireAdmin);

overridesRouter.patch('/overrides/field', async (req, res) => {
  const { path, value } = req.body as { path?: string; value?: string };
  if (!path || typeof value !== 'string') {
    res.status(400).json({ error: 'Нужны поля path и value.' });
    return;
  }
  await pool.query(
    'INSERT INTO field_overrides (path, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
    [path, value],
  );
  res.json({ ok: true });
});

overridesRouter.post('/overrides/item', async (req, res) => {
  const { groupKey, item } = req.body as { groupKey?: string; item?: unknown };
  if (!groupKey || item === undefined) {
    res.status(400).json({ error: 'Нужны поля groupKey и item.' });
    return;
  }
  const [rows] = await pool.query<import('mysql2').RowDataPacket[]>(
    'SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM added_items WHERE group_key = ?',
    [groupKey],
  );
  const nextOrder = (rows[0]?.maxOrder as number ?? -1) + 1;
  await pool.query('INSERT INTO added_items (group_key, item_json, sort_order) VALUES (?, ?, ?)', [
    groupKey,
    JSON.stringify(item),
    nextOrder,
  ]);
  res.json({ ok: true });
});

overridesRouter.post('/overrides/delete-item', async (req, res) => {
  const { groupKey, identifier } = req.body as { groupKey?: string; identifier?: string };
  if (!groupKey || !identifier) {
    res.status(400).json({ error: 'Нужны поля groupKey и identifier.' });
    return;
  }
  // Remove from added_items if present
  await pool.query(
    `DELETE FROM added_items WHERE group_key = ? AND (JSON_UNQUOTE(JSON_EXTRACT(item_json, '$.h')) = ? OR JSON_UNQUOTE(JSON_EXTRACT(item_json, '$.title')) = ? OR JSON_UNQUOTE(JSON_EXTRACT(item_json, '$.t')) = ?)`,
    [groupKey, identifier, identifier, identifier],
  );
  // Insert into deleted_items
  await pool.query(
    'INSERT INTO deleted_items (group_key, identifier) VALUES (?, ?) ON DUPLICATE KEY UPDATE identifier = VALUES(identifier)',
    [groupKey, identifier],
  );
  res.json({ ok: true });
});

overridesRouter.post('/overrides/reset', async (_req, res) => {
  await pool.query('DELETE FROM field_overrides');
  await pool.query('DELETE FROM added_items');
  await pool.query('DELETE FROM deleted_items');
  res.json({ ok: true });
});
