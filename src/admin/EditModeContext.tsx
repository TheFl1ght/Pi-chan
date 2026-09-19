import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { login as apiLogin, ApiError } from './api';

interface EditModeApi {
  /** Logged in with the admin passphrase for this session. */
  isAdmin: boolean;
  /** Whether the inline editing UI (textareas, add-item forms) is currently shown. */
  isEditMode: boolean;
  /** The admin token, sent as a bearer token on write requests. Empty when not logged in. */
  token: string;
  login: (pass?: string) => Promise<boolean>;
  logout: () => void;
  setEditMode: (value: boolean) => void;
}

const EditModeContext = createContext<EditModeApi | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const login = useCallback(async (pass?: string) => {
    const input = pass ?? '';
    if (!input) return false;
    try {
      const { token: newToken } = await apiLogin(input);
      setToken(newToken);
      setIsEditMode(true);
      return true;
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Не удалось связаться с сервером админки.';
      throw new Error(msg);
    }
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setIsEditMode(false);
  }, []);

  const setEditMode = useCallback((value: boolean) => setIsEditMode(value), []);

  const value: EditModeApi = {
    isAdmin: token !== '',
    isEditMode: token !== '' && isEditMode,
    token,
    login,
    logout,
    setEditMode,
  };

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode(): EditModeApi {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
