import { useState } from 'react';
import Editable from '../../admin/Editable';
import { useEditMode } from '../../admin/EditModeContext';
import './MaterialText.css';

export default function MaterialText({
  path,
  text,
  onDelete,
}: {
  path: string;
  text: string;
  onDelete?: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { isEditMode } = useEditMode();

  return (
    <div className="material-text-container" style={{ position: 'relative', marginBottom: '16px' }}>
      {isEditMode && onDelete && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
          <div className="theory-del-wrapper">
            {confirmDelete ? (
              <div className="theory-del-confirm-box">
                <span className="theory-del-confirm-label">Удалить блок текста?</span>
                <button
                  type="button"
                  className="theory-del-btn-confirm"
                  onClick={() => {
                    setConfirmDelete(false);
                    onDelete();
                  }}
                >
                  Да
                </button>
                <button
                  type="button"
                  className="theory-del-btn-cancel"
                  onClick={() => setConfirmDelete(false)}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="theory-del-btn"
                title="Удалить текст"
                onClick={() => setConfirmDelete(true)}
              >
                🗑 Удалить текст
              </button>
            )}
          </div>
        </div>
      )}
      <p className="material-text">
        <Editable path={path} value={text} />
      </p>
    </div>
  );
}

