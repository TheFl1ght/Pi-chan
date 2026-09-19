import { useState } from 'react';
import { Link } from 'react-router-dom';
import MathFormula from '../MathFormula';
import BadgeEditor, { DEFAULT_DIRECTORY_PRESETS } from '../../admin/BadgeEditor';
import type { SubtopicItemProps } from './SubtopicItem';
import './SubtopicItem.css';

export default function SubtopicItem({
  index,
  title,
  formula,
  to,
  badge,
  badgeColor,
  canEditBadge,
  onUpdateBadge,
  onDelete,
  showIndex = true,
}: SubtopicItemProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <Link to={to} className="sub-item">
      {showIndex && <span className="sub-num">{String(index + 1).padStart(2, '0')}</span>}
      <div className="sub-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h4>{title}</h4>
          {(badge || canEditBadge) && (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <BadgeEditor
                badge={badge}
                badgeColor={badgeColor}
                canEdit={canEditBadge}
                presets={DEFAULT_DIRECTORY_PRESETS}
                title={`Бейдж: ${title}`}
                onUpdateBadge={onUpdateBadge}
              />
            </div>
          )}
        </div>
        {formula && (
          <span className="sub-formula-badge">
            {typeof formula === 'string' ? (
              <MathFormula mode="inline">{formula.startsWith('$') ? formula : `$${formula}$`}</MathFormula>
            ) : (
              formula
            )}
          </span>
        )}
      </div>
      {onDelete && (
        <div
          className="sub-del-wrapper"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {confirming ? (
            <div className="sub-del-confirm-box">
              <span className="sub-del-confirm-label">Удалить?</span>
              <button
                type="button"
                className="sub-del-btn-confirm"
                title="Подтвердить удаление"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConfirming(false);
                  onDelete();
                }}
              >
                Да
              </button>
              <button
                type="button"
                className="sub-del-btn-cancel"
                title="Отмена"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConfirming(false);
                }}
              >
                Нет
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="sub-del-btn"
              title="Удалить подтему"
              aria-label={`Удалить подтему «${title}»`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirming(true);
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}
      <span className="sub-arrow">→</span>
    </Link>
  );
}
