import { Link } from 'react-router-dom';
import type { BreadcrumbsProps } from './Breadcrumbs';
import './Breadcrumbs.css';

export default function Breadcrumbs({ trail, current }: BreadcrumbsProps) {
  return (
    <div className="crumbs">
      {trail.map((c) => (
        <span key={c.href}>
          <Link to={c.href}>{c.label}</Link> /{' '}
        </span>
      ))}
      {current}
    </div>
  );
}
