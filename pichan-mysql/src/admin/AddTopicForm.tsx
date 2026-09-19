import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import MathFormula from '../components/MathFormula';
import type { Topic, TopicStatus } from '../models/types';
import './AddSubtopicForm.css';

interface AddTopicFormProps {
  boardAccent?: string;
  onAdd: (topic: Topic) => void;
}

export default function AddTopicForm({ boardAccent, onAdd }: AddTopicFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [formula, setFormula] = useState('');
  const [status, setStatus] = useState<TopicStatus | 'ready'>('ready');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button
        type="button"
        className="admin-add-toggle"
        style={{ '--accent': boardAccent } as React.CSSProperties}
        onClick={() => setOpen(true)}
      >
        + Добавить тему в вышмат
      </button>
    );
  }

  const submit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const trimmedFormula = formula.trim() || '\\dots';

    onAdd({
      t: trimmedTitle,
      f: trimmedFormula,
      status: status === 'ready' ? undefined : status,
    });

    setTitle('');
    setFormula('');
    setStatus('ready');
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
          Новая тема высшей математики
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
        placeholder="Название темы (например: Дифференциальные уравнения)"
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: 'var(--chalk-dim)', fontFamily: 'JetBrains Mono, monospace' }}>
          Статус:
        </span>
        <label className="admin-checkbox-label">
          <input
            type="radio"
            name="topic-status"
            checked={status === 'ready'}
            onChange={() => setStatus('ready')}
          />
          Готова
        </label>
        <label className="admin-checkbox-label">
          <input
            type="radio"
            name="topic-status"
            checked={status === 'dev'}
            onChange={() => setStatus('dev')}
          />
          В разработке
        </label>
        <label className="admin-checkbox-label">
          <input
            type="radio"
            name="topic-status"
            checked={status === 'soon'}
            onChange={() => setStatus('soon')}
          />
          Скоро
        </label>
      </div>

      <div className="admin-add-actions">
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          style={{ background: 'var(--chalk-yellow)', color: '#182019', fontWeight: 600, borderColor: 'var(--chalk-yellow)' }}
          onClick={submit}
        >
          Добавить тему
        </button>
        <button type="button" className="admin-btn" onClick={() => setOpen(false)}>
          Отмена
        </button>
      </div>
    </div>
  );
}
