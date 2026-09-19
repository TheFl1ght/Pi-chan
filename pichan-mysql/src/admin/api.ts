const API_URL = import.meta.env.VITE_API_URL ?? '';

export class ApiError extends Error {}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    let message = `Запрос завершился с ошибкой (${res.status}).`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new ApiError(message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export interface OverridesPayload {
  fields: Record<string, string>;
  addedItems: Record<string, unknown[]>;
  deletedItems?: Record<string, string[]>;
}

export function fetchOverrides(): Promise<OverridesPayload> {
  return request<OverridesPayload>('/overrides');
}

export function login(password: string): Promise<{ token: string }> {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ password }) });
}

export function patchField(token: string, path: string, value: string): Promise<void> {
  return request('/overrides/field', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ path, value }),
  });
}

export function postItem(token: string, groupKey: string, item: unknown): Promise<void> {
  return request('/overrides/item', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ groupKey, item }),
  });
}

export function deleteItemApi(token: string, groupKey: string, identifier: string): Promise<void> {
  return request('/overrides/delete-item', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ groupKey, identifier }),
  });
}

export function resetOverrides(token: string): Promise<void> {
  return request('/overrides/reset', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}
