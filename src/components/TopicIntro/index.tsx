import { useState, type CSSProperties } from 'react';
import type { TopicIntroProps } from './TopicIntro';
import './TopicIntro.css';

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

export default function TopicIntro({
  title,
  formula,
  accent,
  badge,
  badgeColor,
  canEditBadge,
  onUpdateBadge,
}: TopicIntroProps) {
  const [isEditingBadge, setIsEditingBadge] = useState(false);
  const currentBadgeText = badge || '';
  const currentBadgeColor = badgeColor || 'var(--chalk-yellow)';
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

  return (
    <div className="topic-intro" style={{ '--accent': accent } as CSSProperties}>
      <div className="topic-intro-header">
        <h2>{title}</h2>
        <div className="badge-editor-wrapper">
          {currentBadgeText ? (
            <span
              className={`row-status ${canEditBadge ? 'row-status--editable' : ''}`}
              style={{ color: currentBadgeColor, borderColor: currentBadgeColor }}
              title={canEditBadge ? 'Редактировать бейдж' : undefined}
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
                  if (e.key === 'Escape') setIsEditingBadge(false);
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
                  title="Убрать бейдж"
                >
                  Убрать
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => setIsEditingBadge(false)}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {formula && <div className="topic-formula">{formula}</div>}
    </div>
  );
}
