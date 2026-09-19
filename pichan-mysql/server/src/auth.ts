import type { NextFunction, Request, Response } from 'express';

function adminPassphrase(): string {
  return process.env.ADMIN_PASSPHRASE ?? 'pichan-admin';
}

/** Verifies the `Authorization: Bearer <password>` header on write requests. */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  if (token !== adminPassphrase()) {
    res.status(401).json({ error: 'Неверный или отсутствующий пароль администратора.' });
    return;
  }
  next();
}

export function login(req: Request, res: Response) {
  const { password } = req.body as { password?: string };
  if (password === adminPassphrase()) {
    res.json({ token: password });
  } else {
    res.status(401).json({ error: 'Неверный пароль.' });
  }
}
