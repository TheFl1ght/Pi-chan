import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import TopicIntro from '../../components/TopicIntro';
import DefinitionBox from '../../components/DefinitionBox/DefinitionBox';
import RuleBox from '../../components/RuleBox/RuleBox';
import ExampleBox from '../../components/ExampleBox';
import MaterialText from '../../components/MaterialText/MaterialText';
import BackLink from '../../components/BackLink/BackLink';
import { isRichSubtopic } from '../../models/types';
import { contentGroupKey } from '../../admin/useEffectiveContent';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import type { MaterialPageProps } from './MaterialPage';

export default function MaterialPage({ topic, index, sub, accent, trail, hrefBase }: MaterialPageProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { deleteItem } = useOverrides();
  const { isEditMode } = useEditMode();
  const rich = isRichSubtopic(sub);
  const topicHref = `${hrefBase}/${index}`;
  const pathPrefix = `${contentGroupKey(topic.t)}.${index}`;

  return (
    <>
      <PageHeader accent={accent} trail={[...trail, { label: topic.t, href: topicHref }]} current={sub.h} />
      <TopicIntro title={sub.h} formula={rich ? undefined : sub.f} accent={accent} />
      {rich ? (
        <>
          <DefinitionBox path={`${pathPrefix}.definition`} text={sub.definition} accent={accent} />
          {sub.rule && <RuleBox path={`${pathPrefix}.rule`} formula={sub.rule} accent={accent} />}
          {sub.example && (
            <ExampleBox
              pathPrefix={`${pathPrefix}.example`}
              problem={sub.example.problem}
              steps={sub.example.steps}
              accent={accent}
            />
          )}
        </>
      ) : (
        <MaterialText path={`${pathPrefix}.material`} text={sub.material} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
        <BackLink to={topicHref} label={topic.t} />
        {isEditMode && (
          confirmDelete ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#f87171', fontFamily: 'JetBrains Mono, monospace' }}>
                Точно удалить?
              </span>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                style={{ color: '#fff', background: '#ef4444', borderColor: '#dc2626' }}
                onClick={() => {
                  deleteItem(contentGroupKey(topic.t), sub.h);
                  navigate(topicHref);
                }}
              >
                Да, удалить
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={() => setConfirmDelete(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
              onClick={() => setConfirmDelete(true)}
            >
              🗑 Удалить эту подтему
            </button>
          )
        )}
      </div>
    </>
  );
}
