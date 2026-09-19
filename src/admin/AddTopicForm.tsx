import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import MathFormula from '../components/MathFormula';
import type { Topic } from '../models/types';
import './AddSubtopicForm.css';

interface AddTopicFormProps {
  boardAccent?: string;
  buttonLabel?: string;
  formTitle?: string;
  onAdd: (topic: Topic) => void;
}

const BADGE_PRESETS = [
  { label: 'Без бейджа', text: '', color: '' },
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

export default function AddTopicForm({
  boardAccent,
  buttonLabel = '+ Добавить директорию',
  formTitle = 'Новая директория',
  onAdd,
}: AddTopicFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [formula, setFormula] = useState('');
  const [badgeText, setBadgeText] = useState('в разработке');
  const [badgeColor, setBadgeColor] = useState('var(--chalk-yellow)');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button
        type="button"
        className="admin-add-toggle"
        style={{ '--accent': boardAccent } as React.CSSProperties}
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>
    );
  }

  const submit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const trimmedFormula = formula.trim() || '\\dots';
    const trimmedBadge = badgeText.trim();

    onAdd({
      t: trimmedTitle,
      f: trimmedFormula,
      status: trimmedBadge ? trimmedBadge : undefined,
      badge: trimmedBadge ? trimmedBadge : undefined,
      badgeColor: trimmedBadge ? badgeColor : undefined,
    });

    setTitle('');
    setFormula('');
    setBadgeText('в разработке');
    setBadgeColor('var(--chalk-yellow)');
    setOpen(false);
  };

  return (
    <div
      className="admin-add-form"
      style={{ '--accent': boardAccent } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--chalk-white)', fontFamily: 'JetBrains Mono, monospace' }}>
          {formTitle}
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ background: 'none', border: 'none', color: 'var(--chalk-dim-2)', cursor: 'pointer', fontSize: '16px' }}
        >
          ✕
        </button>
      </div>

      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Название директории (например: Дифференциальные уравнения)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        autoFocus
      />

      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Формула-превью (LaTeX, например: y' + p(x)y = q(x))"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />

      {formula.trim() && (
        <div style={{ padding: '8px 12px', background: 'var(--bg-tile)', borderRadius: '3px', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '11px', color: 'var(--chalk-dim-2)', display: 'block', marginBottom: '4px', fontFamily: 'JetBrains Mono, monospace' }}>
            Предпросмотр формулы:
          </span>
          <MathFormula mode="block">{formula.trim()}</MathFormula>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 12px', background: 'var(--bg-tile)', borderRadius: '4px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--chalk-dim)', fontFamily: 'JetBrains Mono, monospace' }}>
            Бейдж директории:
          </span>
          {badgeText.trim() && (
            <span
              className="row-status"
              style={{
                color: badgeColor,
                borderColor: badgeColor,
              }}
            >
              {badgeText.trim()}
            </span>
          )}
        </div>

        <input
          className="admin-editable-input admin-editable-input--single"
          placeholder="Текст бейджа (или оставьте пустым)"
          value={badgeText}
          onChange={(e) => setBadgeText(e.target.value)}
          style={{ fontSize: '13px', padding: '5px 8px' }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--chalk-dim-2)', fontFamily: 'JetBrains Mono, monospace' }}>Быстрый выбор:</span>
          {BADGE_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="badge-preset-btn"
              onClick={() => {
                setBadgeText(p.text);
                if (p.color) setBadgeColor(p.color);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {badgeText.trim() && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '11px', color: 'var(--chalk-dim-2)', fontFamily: 'JetBrains Mono, monospace' }}>Цвет:</span>
            {BADGE_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`badge-color-dot ${badgeColor === c.value ? 'active' : ''}`}
                style={{ background: c.value }}
                title={c.label}
                onClick={() => setBadgeColor(c.value)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="admin-add-actions">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          style={{ background: 'var(--chalk-yellow)', color: '#182019', fontWeight: 600, borderColor: 'var(--chalk-yellow)' }}
          onClick={submit}
        >
          Добавить директорию
        </button>
        <button type="button" className="admin-btn" onClick={() => setOpen(false)}>
          Отмена
        </button>
      </div>
    </div>
  );
}
