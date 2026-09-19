import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import { useOverrides } from './OverridesContext';
import './AdminBar.css';

export default function AdminBar() {
  const { isAdmin, isEditMode, login, logout, setEditMode } = useEditMode();
  const { isLoading, loadError, hasChanges, resetAll, exportJson } = useOverrides();
  const [showExport, setShowExport] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passInput) return;
    setIsSubmitting(true);
    setLoginErr(null);
    try {
      await login(passInput);
      setShowLogin(false);
      setPassInput('');
    } catch (err: unknown) {
      setLoginErr(err instanceof Error ? err.message : 'Ошибка авторизации');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportJson());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — the textarea in the panel can still be selected manually
    }
  };

  if (!isAdmin) {
    return (
      <>
        <button
          type="button"
          className="admin-gear"
          onClick={() => {
            setLoginErr(null);
            setShowLogin(true);
          }}
          title="Войти как администратор"
        >
          ⚙
        </button>

        {showLogin && (
          <div className="admin-export-overlay" onClick={() => setShowLogin(false)}>
            <div
              className="admin-export-panel"
              style={{ maxWidth: '420px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-export-header">
                <h3>Вход администратора</h3>
                <button type="button" className="admin-btn" onClick={() => setShowLogin(false)}>
                  Закрыть
                </button>
              </div>
              <p className="admin-export-hint">
                Введите пароль для редактирования контента и формул прямо на страницах.
              </p>
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="password"
                  className="admin-editable-input admin-editable-input--single"
                  placeholder="Пароль администратора"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  autoFocus
                />
                {loginErr && (
                  <div style={{ color: 'var(--chalk-red)', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>
                    {loginErr}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn--primary"
                    disabled={isSubmitting || !passInput}
                  >
                    {isSubmitting ? 'Вход…' : 'Войти'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => setPassInput('pichan-admin')}
                  >
                    Вставить демо-пароль
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="admin-bar">
        <span className="admin-bar-label">
          админ
          {isLoading ? ' · загрузка правок…' : loadError ? ` · ${loadError}` : hasChanges ? ' · есть правки' : ''}
        </span>

        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={isEditMode}
            onChange={(e) => setEditMode(e.target.checked)}
          />
          <span className="admin-toggle-track">
            <span className="admin-toggle-thumb" />
          </span>
          <span>Режим редактирования</span>
        </label>

        <div className="admin-bar-actions">
          <button type="button" className="admin-btn" onClick={() => setShowExport(true)}>
            Экспорт
          </button>
          {confirmReset ? (
            <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                style={{ color: '#fff', background: '#ef4444', borderColor: '#dc2626' }}
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
              >
                Точно сбросить?
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={() => setConfirmReset(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => setConfirmReset(true)}
              disabled={!hasChanges}
            >
              Сбросить всё
            </button>
          )}
          <button type="button" className="admin-btn" onClick={logout}>
            Выйти
          </button>
        </div>
      </div>

      {showExport && (
        <div className="admin-export-overlay" onClick={() => setShowExport(false)}>
          <div className="admin-export-panel" onClick={(e) => e.stopPropagation()}>
            <div className="admin-export-header">
              <h3>Экспорт правок</h3>
              <button type="button" className="admin-btn" onClick={() => setShowExport(false)}>
                Закрыть
              </button>
            </div>
            <p className="admin-export-hint">
              Правки уже сохранены в MySQL на сервере и видны всем посетителям — экспорт нужен только если хочешь
              когда-нибудь «влить» их обратно в статические файлы models/*.ts и закоммитить в код.
            </p>
            <textarea
              className="admin-export-textarea"
              readOnly
              value={exportJson()}
              onFocus={(e) => e.target.select()}
            />
            <button type="button" className="admin-btn admin-btn--primary" onClick={copyExport}>
              {copied ? 'Скопировано ✓' : 'Скопировать в буфер обмена'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
