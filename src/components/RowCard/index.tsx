import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { RowCardProps } from './RowCard';
import './RowCard.css';

const BADGE_PRESETS = [
  { label: 'В разработке', text: 'в разработке', color: 'var(--chalk-yellow)' },
  { label: 'Скоро', text: 'скоро', color: 'var(--chalk-red)' },
  { label: 'Готово', text: 'готово', color: 'var(--chalk-teal)' },
  { label: 'Новое', text: 'новое', color: 'var(--chalk-blue)' },
  { label: 'Обновлено', text: 'обновлено', color: 'var(--chalk-pink)' },
];

const BADGE_COLORS = [
  { label: 'Жёлтый', value: 'var(--chalk-yellow)' },
  { label: 'Красный', value: 'var(--chalk-red)' },
  { label: 'Бирюзовый', value: 'var(--chalk-teal)' },
  { label: 'Синий', value: 'var(--chalk-blue)' },
  { label: 'Розовый', value: 'var(--chalk-pink)' },
];

export default function RowCard({
  index,
  formula,
  title,
  meta,
  to,
  accent,
  status,
  badge,
  badgeColor,
  canEditBadge,
  onUpdateBadge,
  onDelete,
}: RowCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [isEditingBadge, setIsEditingBadge] = useState(false);

  const currentBadgeText =
    badge !== undefined
      ? badge
      : status === 'dev'
        ? 'в разработке'
        : status === 'soon'
          ? 'скоро'
          : status ?? '';

  const defaultColor =
    status === 'dev'
      ? 'var(--chalk-yellow)'
      : status === 'soon'
        ? 'var(--chalk-red)'
        : 'var(--chalk-yellow)';
  const currentBadgeColor = badgeColor || defaultColor;

  const [draftText, setDraftText] = useState(currentBadgeText);
  const [draftColor, setDraftColor] = useState(currentBadgeColor);

  const startEditBadge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraftText(currentBadgeText);
    setDraftColor(currentBadgeColor);
    setIsEditingBadge(true);
  };

  const handleSaveBadge = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onUpdateBadge?.(draftText.trim(), draftColor);
    setIsEditingBadge(false);
  };

  const handleRemoveBadge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdateBadge?.('', '');
    setIsEditingBadge(false);
  };

  const handleCancelBadge = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingBadge(false);
  };

  return (
    <Link to={to} className="row-card" style={{ '--accent': accent } as React.CSSProperties}>
      <span className="row-num mono">{String(index + 1).padStart(2, '0')}</span>
      <span className="row-formula">{formula}</span>
      <span className="row-title">{title}</span>

      <div className="badge-editor-wrapper">
        {currentBadgeText ? (
          <span
            className={`row-status ${canEditBadge ? 'row-status--editable' : ''}`}
            style={{ color: currentBadgeColor, borderColor: currentBadgeColor }}
            title={canEditBadge ? 'Редактировать бейдж директории' : undefined}
            onClick={canEditBadge ? startEditBadge : undefined}
          >
            {currentBadgeText}
            {canEditBadge && <span className="row-badge-edit-icon" aria-hidden="true">✎</span>}
          </span>
        ) : canEditBadge ? (
          <button
            type="button"
            className="row-add-badge-btn"
            title="Добавить бейдж к директории"
            onClick={startEditBadge}
          >
            + бейдж
          </button>
        ) : null}

        {isEditingBadge && (
          <div
            className="badge-editor-popover"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="badge-editor-title">Бейдж директории «{title}»</div>
            <input
              type="text"
              className="admin-editable-input admin-editable-input--single"
              placeholder="Текст бейджа (например: в разработке, скоро, новое)"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveBadge(e);
                if (e.key === 'Escape') handleCancelBadge(e);
              }}
            />

            <div className="badge-editor-presets">
              {BADGE_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="badge-preset-btn"
                  onClick={() => {
                    setDraftText(p.text);
                    setDraftColor(p.color);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="badge-editor-colors">
              {BADGE_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`badge-color-dot ${draftColor === c.value ? 'active' : ''}`}
                  style={{ background: c.value }}
                  title={c.label}
                  onClick={() => setDraftColor(c.value)}
                />
              ))}
            </div>

            <div className="badge-editor-actions">
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={handleSaveBadge}
              >
                Сохранить
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleRemoveBadge}
                title="Убрать бейдж у этой директории"
              >
                Убрать
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={handleCancelBadge}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

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
