import { Link } from 'react-router-dom';
import type { BreadcrumbsProps } from './Breadcrumbs';
import './Breadcrumbs.css';

function cleanTrailLabel(label: string): string {
  return label.replace(/\s*\(\d+\s*(?:из|\/)\s*\d+\)/gi, '').trim();
}

export default function Breadcrumbs({ trail, current }: BreadcrumbsProps) {
  return (
    <div className="crumbs">
      {trail.map((c) => (
        <span key={c.href}>
          <Link to={c.href}>{cleanTrailLabel(c.label)}</Link> /{' '}
        </span>
      ))}
      {typeof current === 'string' ? cleanTrailLabel(current) : current}
    </div>
  );
}

