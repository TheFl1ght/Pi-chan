import type { ReactNode } from 'react';
import './RowList.css';

export default function RowList({ children }: { children: ReactNode }) {
  return <div className="row-list">{children}</div>;
}
