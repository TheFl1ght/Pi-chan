import type { CSSProperties } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import type { PageHeaderProps } from './PageHeader';
import './PageHeader.css';

export default function PageHeader({ trail, current, accent, title, titleExtra, desc }: PageHeaderProps) {
  return (
    <div className="page-header" style={accent ? ({ '--accent': accent } as CSSProperties) : undefined}>
      <Breadcrumbs trail={trail} current={current} />
      {title && (
        <div className="title-row">
          <h2>{title}</h2>
          {titleExtra}
        </div>
      )}
      {desc && <p className="page-desc">{desc}</p>}
    </div>
  );
}
