import { useEffect, useState, type ReactNode } from 'react';
import { useEditMode } from './EditModeContext';
import { useOverrides } from './OverridesContext';
import './Editable.css';

interface EditableProps {
  /** Unique, stable address for this piece of text (used as the override key). */
  path: string;
  /** Original value from the static data — used as a fallback when no override exists. */
  value: string;
  /** How to render the value when not editing. Defaults to plain text. */
  render?: (value: string) => ReactNode;
  /** Use a <textarea> (default) or a single-line <input>. */
  multiline?: boolean;
}

export default function Editable({ path, value, render, multiline = true }: EditableProps) {
  const { isEditMode } = useEditMode();
  const { getField, setField } = useOverrides();
  const effective = getField(path, value);
  const [draft, setDraft] = useState(effective);

  useEffect(() => {
    setDraft(effective);
  }, [effective]);

  if (!isEditMode) {
    return <>{render ? render(effective) : effective}</>;
  }

  const commit = () => {
    if (draft !== effective) setField(path, draft);
  };

  return multiline ? (
    <textarea
      className="admin-editable-input"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      rows={Math.min(10, Math.max(2, Math.ceil(draft.length / 50)))}
    />
  ) : (
    <input
      className="admin-editable-input admin-editable-input--single"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
    />
  );
}
