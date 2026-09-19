import { useState } from 'react';
import { useEditMode } from './EditModeContext';
import type { PracticeProblem } from '../models/types';
import './AddSubtopicForm.css';

interface AddPracticeItemFormProps {
  onAdd: (item: PracticeProblem) => void;
}

export default function AddPracticeItemForm({ onAdd }: AddPracticeItemFormProps) {
  const { isEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [stepsText, setStepsText] = useState('');

  if (!isEditMode) return null;

  if (!open) {
    return (
      <button type="button" className="admin-add-toggle" onClick={() => setOpen(true)}>
        + Добавить задачу
      </button>
    );
  }

  const submit = () => {
    const trimmedTitle = title.trim();
    const trimmedProblem = problem.trim();
    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!trimmedTitle || !trimmedProblem || steps.length === 0) return;
    onAdd({ h: trimmedTitle, problem: trimmedProblem, steps });
    setTitle('');
    setProblem('');
    setStepsText('');
    setOpen(false);
  };

  return (
    <div className="admin-add-form">
      <input
        className="admin-editable-input admin-editable-input--single"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="admin-editable-input"
        placeholder="Условие задачи"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        rows={2}
      />
      <textarea
        className="admin-editable-input"
        placeholder={'Шаги решения — по одному на строку'}
        value={stepsText}
        onChange={(e) => setStepsText(e.target.value)}
        rows={4}
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
