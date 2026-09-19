import { useState, type CSSProperties } from 'react';
import Editable from '../../admin/Editable';
import BadgeEditor, { THEORY_BLOCK_PRESETS } from '../../admin/BadgeEditor';
import { useEditMode } from '../../admin/EditModeContext';
import { useOverrides } from '../../admin/OverridesContext';
import './DefinitionBox.css';

export default function DefinitionBox({
  path,
  text,
  accent,
  onDelete,
}: {
  path: string;
  text: string;
  accent: string;
  onDelete?: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { isEditMode } = useEditMode();
  const { getField, setField } = useOverrides();

  const overrideBadge = getField(`${path}.badge`, '__NO_OVERRIDE__');
  const overrideColor = getField(`${path}.badgeColor`, '__NO_OVERRIDE__');
  const effectiveBadge = overrideBadge !== '__NO_OVERRIDE__' ? overrideBadge.trim() : 'определение';
  const effectiveColor = overrideColor !== '__NO_OVERRIDE__' && overrideColor ? overrideColor : '#2dd4bf';

  return (
    <div className="def-box" style={{ '--accent': accent } as CSSProperties}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="def-icon">✎</span>
          <BadgeEditor
            badge={effectiveBadge}
            badgeColor={effectiveColor}
            canEdit={isEditMode}
            presets={THEORY_BLOCK_PRESETS}
            title="Бейдж определения"
            onUpdateBadge={(b, c) => {
              setField(`${path}.badge`, b);
              setField(`${path}.badgeColor`, c);
            }}
          />
        </div>
        {isEditMode && onDelete && (
          <div className="theory-del-wrapper">
            {confirmDelete ? (
              <div className="theory-del-confirm-box">
                <span className="theory-del-confirm-label">Удалить определение?</span>
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
                title="Удалить определение"
                onClick={() => setConfirmDelete(true)}
              >
                🗑 Удалить
              </button>
            )}
          </div>
        )}
      </div>
      <p>
        <Editable path={path} value={text} />
      </p>
    </div>
  );
}

