import { useState } from 'react';
import type { DisclosureProps } from './Disclosure';
import './Disclosure.css';

export default function Disclosure({ label, children }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? 'disclosure open' : 'disclosure'}>
      <button type="button" className="disclosure-toggle" onClick={() => setOpen((v) => !v)}>
        <span className="chevron">▸</span> {label}
      </button>
      <div className="disclosure-content">{children}</div>
    </div>
  );
}
