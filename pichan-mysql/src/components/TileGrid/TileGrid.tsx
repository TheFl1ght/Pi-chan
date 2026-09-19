import type { ReactNode } from 'react';
import './TileGrid.css';

export default function TileGrid({ children }: { children: ReactNode }) {
  return <div className="tile-grid">{children}</div>;
}
