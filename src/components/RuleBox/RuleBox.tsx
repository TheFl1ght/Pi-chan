import { useState, type CSSProperties } from 'react';
import Editable from '../../admin/Editable';
import BadgeEditor, { THEORY_BLOCK_PRESETS } from '../../admin/BadgeEditor';
import { useEditMode } from '../../admin/EditModeContext';
import { useOverrides } from '../../admin/OverridesContext';
import './RuleBox.css';

export default function RuleBox({
  path,
  formula,
  accent,
  onDelete,
}: {
  path: string;
  formula: string;
  accent: string;
  onDelete?: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { isEditMode } = useEditMode();
  const { getField, setField } = useOverrides();

  const overrideBadge = getField(`${path}.badge`, '__NO_OVERRIDE__');
  const overrideColor = getField(`${path}.badgeColor`, '__NO_OVERRIDE__');
  const effectiveBadge = overrideBadge !== '__NO_OVERRIDE__' ? overrideBadge.trim() : 'теорема / формула';
  const effectiveColor = overrideColor !== '__NO_OVERRIDE__' && overrideColor ? overrideColor : '#f6c445';

  return (
    <div className="rule-box" style={{ '--accent': accent } as CSSProperties}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <BadgeEditor
          badge={effectiveBadge}
          badgeColor={effectiveColor}
          canEdit={isEditMode}
          presets={THEORY_BLOCK_PRESETS}
          title="Бейдж теоремы / правила"
          onUpdateBadge={(b, c) => {
            setField(`${path}.badge`, b);
            setField(`${path}.badgeColor`, c);
          }}
        />
        {isEditMode && onDelete && (
          <div className="theory-del-wrapper">
            {confirmDelete ? (
              <div className="theory-del-confirm-box">
                <span className="theory-del-confirm-label">Удалить блок?</span>
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
                title="Удалить теорему/правило"
                onClick={() => setConfirmDelete(true)}
              >
                🗑 Удалить
              </button>
            )}
          </div>
        )}
      </div>
      <div className="rule-formula">
        <Editable path={path} value={formula} />
      </div>
    </div>
  );
}

