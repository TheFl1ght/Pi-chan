import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ApiError, fetchOverrides, patchField, postItem, deleteItemApi, resetOverrides } from './api';
import { useEditMode } from './EditModeContext';
import { EMPTY_OVERRIDES, type OverridesData } from './types';

interface OverridesApi {
  isLoading: boolean;
  loadError: string | null;
  getField: (path: string, fallback: string) => string;
  setField: (path: string, value: string) => void;
  getAddedItems: <T>(groupKey: string) => T[];
  addItem: <T>(groupKey: string, item: T) => void;
  deleteItem: (groupKey: string, identifier: string) => void;
  isDeleted: (groupKey: string, identifier: string) => boolean;
  hasChanges: boolean;
  resetAll: () => void;
  exportJson: () => string;
}

const OverridesContext = createContext<OverridesApi | null>(null);

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}

export function OverridesProvider({ children }: { children: ReactNode }) {
  const { token } = useEditMode();
  const [data, setData] = useState<OverridesData>(EMPTY_OVERRIDES);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchOverrides()
      .then((payload) => {
        if (cancelled) return;
        setData({
          fields: payload.fields || {},
          addedItems: payload.addedItems || {},
          deletedItems: payload.deletedItems || {},
        });
        setLoadError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(errorMessage(err, 'Не удалось загрузить правки с сервера — админ-сервер запущен?'));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getField = useCallback((path: string, fallback: string) => data.fields[path] ?? fallback, [data]);

  const setField = useCallback(
    (path: string, value: string) => {
      setData((prev) => ({ ...prev, fields: { ...prev.fields, [path]: value } }));
      patchField(token, path, value).catch((err: unknown) => {
        console.error(errorMessage(err, 'Не удалось сохранить правку на сервере.'));
      });
    },
    [token],
  );

  const getAddedItems = useCallback(
    <T,>(groupKey: string): T[] => (data.addedItems[groupKey] as T[] | undefined) ?? [],
    [data],
  );

  const addItem = useCallback(
    <T,>(groupKey: string, item: T) => {
      setData((prev) => {
        const list = (prev.addedItems[groupKey] as T[] | undefined) ?? [];
        return { ...prev, addedItems: { ...prev.addedItems, [groupKey]: [...list, item] } };
      });
      postItem(token, groupKey, item).catch((err: unknown) => {
        console.error(errorMessage(err, 'Не удалось сохранить новый пункт на сервере.'));
      });
    },
    [token],
  );

  const isDeleted = useCallback(
    (groupKey: string, identifier: string) => {
      const list = data.deletedItems?.[groupKey];
      return Boolean(list && list.includes(identifier));
    },
    [data],
  );

  const deleteItem = useCallback(
    (groupKey: string, identifier: string) => {
      setData((prev) => {
        // Remove from addedItems if it was an added item
        const prevAdded = (prev.addedItems[groupKey] as unknown[] | undefined) ?? [];
        const nextAdded = prevAdded.filter((item: unknown) => {
          if (item && typeof item === 'object') {
            const h = 'h' in item ? (item as { h: unknown }).h : undefined;
            const title = 'title' in item ? (item as { title: unknown }).title : undefined;
            const t = 't' in item ? (item as { t: unknown }).t : undefined;
            if (h === identifier || title === identifier || t === identifier) return false;
          }
          return true;
        });

        // Add to deletedItems
        const prevDeleted = prev.deletedItems[groupKey] ?? [];
        const nextDeleted = prevDeleted.includes(identifier) ? prevDeleted : [...prevDeleted, identifier];

        return {
          ...prev,
          addedItems: { ...prev.addedItems, [groupKey]: nextAdded },
          deletedItems: { ...prev.deletedItems, [groupKey]: nextDeleted },
        };
      });

      deleteItemApi(token, groupKey, identifier).catch((err: unknown) => {
        console.error(errorMessage(err, 'Не удалось удалить пункт на сервере.'));
      });
    },
    [token],
  );

  const resetAll = useCallback(() => {
    if (!token) return;
    resetOverrides(token)
      .then(() => setData(EMPTY_OVERRIDES))
      .catch((err: unknown) => console.error(errorMessage(err, 'Не удалось сбросить правки.')));
  }, [token]);

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const hasChanges = useMemo(
    () =>
      Object.keys(data.fields).length > 0 ||
      Object.values(data.addedItems).some((arr) => Array.isArray(arr) && arr.length > 0) ||
      Object.values(data.deletedItems).some((arr) => Array.isArray(arr) && arr.length > 0),
    [data],
  );

  const value = useMemo(
    () => ({
      isLoading,
      loadError,
      getField,
      setField,
      getAddedItems,
      addItem,
      deleteItem,
      isDeleted,
      hasChanges,
      resetAll,
      exportJson,
    }),
    [
      isLoading,
      loadError,
      getField,
      setField,
      getAddedItems,
      addItem,
      deleteItem,
      isDeleted,
      hasChanges,
      resetAll,
      exportJson,
    ],
  );

  return <OverridesContext.Provider value={value}>{children}</OverridesContext.Provider>;
}

export function useOverrides(): OverridesApi {
  const ctx = useContext(OverridesContext);
  if (!ctx) throw new Error('useOverrides must be used within OverridesProvider');
  return ctx;
}
