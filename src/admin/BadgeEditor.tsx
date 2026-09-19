import { useState, type ReactNode } from 'react';
import './BadgeEditor.css';

export interface BadgePreset {
  label: string;
  text: string;
  color: string;
}

export const DEFAULT_DIRECTORY_PRESETS: BadgePreset[] = [
  { label: 'В разработке', text: 'в разработке', color: 'var(--chalk-yellow)' },
  { label: 'Скоро', text: 'скоро', color: 'var(--chalk-red)' },
  { label: 'Готово', text: 'готово', color: 'var(--chalk-teal)' },
  { label: 'Новое', text: 'новое', color: 'var(--chalk-blue)' },
  { label: 'Обновлено', text: 'обновлено', color: 'var(--chalk-pink)' },
  { label: 'Важно', text: 'важно', color: '#fb923c' },
];

export const THEORY_BLOCK_PRESETS: BadgePreset[] = [
  { label: 'Теорема', text: 'теорема', color: '#f6c445' },
  { label: 'Определение', text: 'определение', color: '#2dd4bf' },
  { label: 'Свойство', text: 'свойство', color: '#f6c445' },
  { label: 'Формула', text: 'формула', color: '#f6c445' },
  { label: 'Правило', text: 'правило', color: '#f6c445' },
  { label: 'Лемма', text: 'лемма', color: '#60a5fa' },
  { label: 'Следствие', text: 'следствие', color: '#f472b6' },
  { label: 'Критерий', text: 'критерий', color: '#fb923c' },
  { label: 'Аксиома', text: 'аксиома', color: '#2dd4bf' },
  { label: 'Понятие', text: 'понятие', color: '#2dd4bf' },
  { label: 'Замечание', text: 'замечание', color: '#9ca3af' },
];

export const BADGE_COLOR_PALETTE = [
  { label: 'Жёлтый / Золотой', value: '#f6c445' },
  { label: 'Бирюзовый', value: '#2dd4bf' },
  { label: 'Синий', value: '#60a5fa' },
  { label: 'Розовый', value: '#f472b6' },
  { label: 'Оранжевый', value: '#fb923c' },
  { label: 'Красный', value: '#ef4444' },
  { label: 'Серый', value: '#9ca3af' },
];

export function resolveBadgeColor(badgeText?: string, customColor?: string, presets: BadgePreset[] = []): string {
  if (customColor && customColor.trim()) return customColor;
  const text = (badgeText || '').trim().toLowerCase();
  if (!text) return '#f6c445';

  const matched = presets.find((p) => p.text.toLowerCase() === text);
  if (matched) return matched.color;

  if (
    text.includes('теор') ||
    text.includes('свойств') ||
    text.includes('формул') ||
    text.includes('правил') ||
    text.includes('разработ')
  ) {
    return '#f6c445';
  }
  if (text.includes('определ') || text.includes('понят') || text.includes('аксиом') || text.includes('готов')) {
    return '#2dd4bf';
  }
  if (text.includes('лемм') || text.includes('нов')) {
    return '#60a5fa';
  }
  if (text.includes('следств') || text.includes('обнов')) {
    return '#f472b6';
  }
  if (text.includes('критер') || text.includes('важн')) {
    return '#fb923c';
  }
  if (text.includes('скор')) {
    return 'var(--chalk-red)';
  }
  return '#f6c445';
}

export interface BadgeEditorProps {
  badge?: string;
  badgeColor?: string;
  canEdit?: boolean;
  onUpdateBadge?: (badgeText: string, badgeColor: string) => void;
  title?: string;
  presets?: BadgePreset[];
  addLabel?: string;
  className?: string;
  badgeClassName?: string;
  alignRight?: boolean;
  children?: ReactNode;
}

export default function BadgeEditor({
  badge,
  badgeColor,
  canEdit = false,
  onUpdateBadge,
  title = 'Редактирование бейджа',
  presets = DEFAULT_DIRECTORY_PRESETS,
  addLabel = '+ бейдж',
  className = '',
  badgeClassName = '',
  alignRight = false,
}: BadgeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const currentText = (badge || '').trim();
  const activeColor = resolveBadgeColor(currentText, badgeColor, presets);

  const [draftText, setDraftText] = useState(currentText);
  const [draftColor, setDraftColor] = useState(activeColor);

  const startEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraftText(currentText);
    setDraftColor(activeColor);
    setIsEditing(true);
  };

  const handleSave = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onUpdateBadge?.(draftText.trim(), draftColor);
    setIsEditing(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdateBadge?.('', '');
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsEditing(false);
  };

  // If explicit custom badgeColor is set, use it in style.
  // If badgeClassName is provided and no custom badgeColor is set, let dedicated CSS classes style it cleanly.
  // Otherwise, apply activeColor.
  const pillStyle: React.CSSProperties = badgeColor
    ? { color: badgeColor, borderColor: badgeColor }
    : badgeClassName
      ? {}
      : { color: activeColor, borderColor: activeColor };

  return (
    <div className={`badge-editor-wrapper ${className}`}>
      {currentText ? (
        <span
          className={`badge-editor-pill ${badgeClassName} ${canEdit ? 'badge-editor-pill--editable' : ''}`}
          style={pillStyle}
          title={canEdit ? 'Нажмите, чтобы изменить бейдж' : undefined}
          onClick={canEdit ? startEdit : undefined}
        >
          {currentText}
          {canEdit && <span className="badge-editor-edit-icon" aria-hidden="true">✎</span>}
        </span>
      ) : canEdit ? (
        <button
          type="button"
          className="badge-editor-add-btn"
          title="Добавить бейдж"
          onClick={startEdit}
        >
          {addLabel}
        </button>
      ) : null}

      {isEditing && (
        <div
          className={`badge-editor-popover ${alignRight ? 'badge-editor-popover--right' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="badge-editor-title">{title}</div>
          <input
            type="text"
            className="admin-editable-input admin-editable-input--single"
            placeholder="Текст бейджа (например: теорема, определение, скоро)"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(e);
              if (e.key === 'Escape') handleCancel(e);
            }}
          />

          {presets.length > 0 && (
            <div className="badge-editor-presets">
              {presets.map((p) => (
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
          )}

          <div className="badge-editor-colors">
            {BADGE_COLOR_PALETTE.map((c) => (
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
              onClick={handleSave}
            >
              Сохранить
            </button>
            {currentText && (
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleRemove}
                title="Удалить бейдж"
              >
                Убрать
              </button>
            )}
            <button
              type="button"
              className="admin-btn"
              onClick={handleCancel}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
