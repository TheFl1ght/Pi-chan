import SubtopicItem from '../SubtopicItem';
import type { SubtopicListProps } from './SubtopicList';
import './SubtopicList.css';

export default function SubtopicList({ label, items }: SubtopicListProps) {
  return (
    <>
      <div className="sub-label">{label}</div>
      <div className="sub-list">
        {items.length === 0 ? (
          <div
            style={{
              padding: '16px 18px',
              background: 'var(--bg-tile)',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--chalk-dim-2)',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            В этой теме пока нет подтем. Нажмите «+ Добавить подтему» ниже в режиме редактирования.
          </div>
        ) : (
          items.map((item, i) => (
            <SubtopicItem
              key={item.to + '-' + item.title}
              index={i}
              title={item.title}
              formula={item.formula}
              to={item.to}
              onDelete={item.onDelete}
            />
          ))
        )}
      </div>
    </>
  );
}
