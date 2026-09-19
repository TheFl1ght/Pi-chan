import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import type { TheoryItem } from '../models/types';
import './AddSubtopicForm.css';

interface AddTheoryItemFormProps {
  onAdd: (item: TheoryItem) => void;
}

export default function AddTheoryItemForm({ onAdd }: AddTheoryItemFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isTheorem, setIsTheorem] = useState(false);
  const [statement, setStatement] = useState('');
  const [text, setText] = useState('');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button type="button" className="admin-add-toggle" onClick={() => setOpen(true)}>
        + Добавить определение или теорему
      </button>
    );
  }

  const submit = () => {
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();
    if (!trimmedTitle || !trimmedText) return;
    onAdd({
      h: trimmedTitle,
      theorem: isTheorem,
      statement: statement.trim() || undefined,
      text: trimmedText,
    });
    setTitle('');
    setIsTheorem(false);
    setStatement('');
    setText('');
    setOpen(false);
  };

  return (
    <div className="admin-add-form">
      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Название (например «Теорема Лагранжа»)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <label className="admin-checkbox-label">
        <input type="checkbox" checked={isTheorem} onChange={(e) => setIsTheorem(e.target.checked)} />
        это теорема (получит бейдж и место для доказательства)
      </label>
      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Формула (LaTeX, необязательно)"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
      />
      <textarea
        className="admin-editable-input"
        placeholder="Определение / формулировка"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
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
