import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { RowCardProps } from './RowCard';
import './RowCard.css';

export default function RowCard({
  index,
  formula,
  title,
  meta,
  to,
  accent,
  status,
  onDelete,
}: RowCardProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <Link to={to} className="row-card" style={{ '--accent': accent } as React.CSSProperties}>
      <span className="row-num mono">{String(index + 1).padStart(2, '0')}</span>
      <span className="row-formula">{formula}</span>
      <span className="row-title">{title}</span>
      {status && (
        <span className={`row-status row-status--${status}`}>
          {status === 'dev' ? 'в разработке' : 'скоро'}
        </span>
      )}
      <span className="row-meta">{meta}</span>
      {onDelete && (
        <div
          className="row-del-wrapper"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {confirming ? (
            <div className="row-del-confirm-box">
              <span className="row-del-confirm-label">Удалить?</span>
              <button
                type="button"
                className="row-del-btn-confirm"
                title="Подтвердить удаление темы"
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
                className="row-del-btn-cancel"
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
              className="row-del-btn"
              title="Удалить тему"
              aria-label={`Удалить тему «${title}»`}
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
    </Link>
  );
}
