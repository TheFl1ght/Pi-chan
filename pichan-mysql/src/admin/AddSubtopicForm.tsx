import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import './AddSubtopicForm.css';

interface AddSubtopicFormProps {
  onAdd: (title: string, formula: string) => void;
}

export default function AddSubtopicForm({ onAdd }: AddSubtopicFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [formula, setFormula] = useState('');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button type="button" className="admin-add-toggle" onClick={() => setOpen(true)}>
        + Добавить подтему
      </button>
    );
  }

  const submit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, formula.trim());
    setTitle('');
    setFormula('');
    setOpen(false);
  };

  return (
    <div className="admin-add-form">
      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Название подтемы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Формула-превью (LaTeX, необязательно)"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
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
