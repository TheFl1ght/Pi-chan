import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import type { TheoryItem, TheoryKind } from '../models/types';
import './AddSubtopicForm.css';

interface AddTheoryItemFormProps {
  onAdd: (item: TheoryItem) => void;
}

export default function AddTheoryItemForm({ onAdd }: AddTheoryItemFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<TheoryKind>('definition');
  const [statement, setStatement] = useState('');
  const [text, setText] = useState('');
  const [proof, setProof] = useState('');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button type="button" className="admin-add-toggle" onClick={() => setOpen(true)}>
        + Добавить блок теории (определение, теорема, введение или текст)
      </button>
    );
  }

  const submit = () => {
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();
    if (!trimmedTitle || !trimmedText) return;
    onAdd({
      h: trimmedTitle,
      kind,
      theorem: kind === 'theorem',
      statement: statement.trim() || undefined,
      text: trimmedText,
      proof: kind === 'theorem' && proof.trim() ? proof.trim() : undefined,
    });
    setTitle('');
    setKind('definition');
    setStatement('');
    setText('');
    setProof('');
    setOpen(false);
  };

  return (
    <div className="admin-add-form">
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <button
          type="button"
          className={`badge-preset-btn ${kind === 'definition' ? 'active' : ''}`}
          style={{
            borderColor: kind === 'definition' ? '#2dd4bf' : undefined,
            color: kind === 'definition' ? '#2dd4bf' : undefined,
          }}
          onClick={() => setKind('definition')}
        >
          Определение / Понятие (прямоугольник)
        </button>
        <button
          type="button"
          className={`badge-preset-btn ${kind === 'theorem' ? 'active' : ''}`}
          style={{
            borderColor: kind === 'theorem' ? 'var(--accent, #f6c445)' : undefined,
            color: kind === 'theorem' ? 'var(--accent, #f6c445)' : undefined,
          }}
          onClick={() => setKind('theorem')}
        >
          Теорема / Свойство (прямоугольник)
        </button>
        <button
          type="button"
          className={`badge-preset-btn ${kind === 'text' ? 'active' : ''}`}
          style={{
            borderColor: kind === 'text' ? 'var(--chalk-white)' : undefined,
            color: kind === 'text' ? 'var(--chalk-white)' : undefined,
          }}
          onClick={() => setKind('text')}
        >
          Текст подтемы (без рамки)
        </button>
      </div>

      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder={
          kind === 'definition'
            ? 'Название (например «Определение предела последовательности»)'
            : kind === 'theorem'
            ? 'Название (например «Теорема Вейерштрасса»)'
            : 'Подзаголовок текста (например «Геометрический смысл»)'
        }
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Формула (LaTeX, например \lim_{n\to\infty} a_n = L, необязательно)"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
      />

      <textarea
        className="admin-editable-input"
        placeholder={
          kind === 'definition'
            ? 'Текст определения (поддерживаются формулы $...$ и $$...$$)'
            : kind === 'theorem'
            ? 'Формулировка теоремы'
            : 'Содержание блока'
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />

      {kind === 'theorem' && (
        <textarea
          className="admin-editable-input"
          placeholder="Доказательство теоремы (необязательно, можно заполнить позже)"
          value={proof}
          onChange={(e) => setProof(e.target.value)}
          rows={3}
        />
      )}

      <div className="admin-add-actions">
        <button type="button" className="admin-btn admin-btn--primary" onClick={submit}>
          Добавить
        </button>
        <button type="button" className="admin-btn" onClick={() => setOpen(false)}>
          Отмена
        </button>
      </div>
    </div>
  );
}
