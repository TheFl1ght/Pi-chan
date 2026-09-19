import { useState } from 'react';
import type { TheoryItem as TheoryItemModel } from '../../models/types';
import MathFormula from '../MathFormula';
import Disclosure from '../Disclosure';
import Editable from '../../admin/Editable';
import BadgeEditor, { THEORY_BLOCK_PRESETS } from '../../admin/BadgeEditor';
import { useEditMode } from '../../admin/EditModeContext';
import { useOverrides } from '../../admin/OverridesContext';
import './TheoryItem.css';

type BlockCategory = 'definition' | 'theorem' | 'text';

interface Classification {
  category: BlockCategory;
  badgeLabel?: string;
  badgeClass?: string;
}

function classifyTheoryItem(item: TheoryItemModel): Classification {
  if (item.kind === 'text' || item.kind === 'remark') {
    return { category: 'text' };
  }

  if (item.kind === 'definition') {
    const isConcept = item.h.toLowerCase().includes('понятие');
    return {
      category: 'definition',
      badgeLabel: isConcept ? 'понятие' : 'определение',
      badgeClass: 'theory-badge theory-badge--def',
    };
  }
  if (item.kind === 'theorem') {
    const title = item.h.toLowerCase();
    let label = 'теорема';
    let cls = 'theory-badge theory-badge--theorem';
    if (title.includes('лемма')) {
      label = 'лемма';
      cls = 'theory-badge theory-badge--lemma';
    } else if (title.includes('следствие')) {
      label = 'следствие';
      cls = 'theory-badge theory-badge--corollary';
    } else if (title.includes('критерий')) {
      label = 'критерий';
      cls = 'theory-badge theory-badge--criterion';
    } else if (title.includes('свойств')) {
      label = 'свойство';
      cls = 'theory-badge theory-badge--theorem';
    }
    return { category: 'theorem', badgeLabel: label, badgeClass: cls };
  }

  // Check theorem flag
  if (item.theorem) {
    const title = item.h.toLowerCase();
    let label = 'теорема';
    let cls = 'theory-badge theory-badge--theorem';
    if (title.includes('лемма')) {
      label = 'лемма';
      cls = 'theory-badge theory-badge--lemma';
    } else if (title.includes('следствие')) {
      label = 'следствие';
      cls = 'theory-badge theory-badge--corollary';
    } else if (title.includes('критерий')) {
      label = 'критерий';
      cls = 'theory-badge theory-badge--criterion';
    } else if (title.includes('свойств')) {
      label = 'свойство';
      cls = 'theory-badge theory-badge--theorem';
    }
    return { category: 'theorem', badgeLabel: label, badgeClass: cls };
  }

  const title = item.h.toLowerCase();

  if (title.includes('определение') || title.includes('понятие') || title.includes('аксиом')) {
    let badge = 'определение';
    if (title.includes('аксиом')) badge = 'аксиома';
    else if (title.includes('понятие')) badge = 'понятие';
    return {
      category: 'definition',
      badgeLabel: badge,
      badgeClass: 'theory-badge theory-badge--def',
    };
  }

  if (
    title.includes('теорема') ||
    title.includes('лемма') ||
    title.includes('следствие') ||
    title.includes('критерий') ||
    title.includes('свойств')
  ) {
    let label = 'теорема';
    let cls = 'theory-badge theory-badge--theorem';
    if (title.includes('лемма')) {
      label = 'лемма';
      cls = 'theory-badge theory-badge--lemma';
    } else if (title.includes('следствие')) {
      label = 'следствие';
      cls = 'theory-badge theory-badge--corollary';
    } else if (title.includes('критерий')) {
      label = 'критерий';
      cls = 'theory-badge theory-badge--criterion';
    } else if (title.includes('свойств')) {
      label = 'свойство';
      cls = 'theory-badge theory-badge--theorem';
    }
    return { category: 'theorem', badgeLabel: label, badgeClass: cls };
  }

  // Remaining information is rendered as clean article text
  return { category: 'text' };
}

export default function TheoryItem({
  item,
  pathPrefix,
  onDelete,
}: {
  item: TheoryItemModel;
  pathPrefix: string;
  onDelete?: () => void;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const { isEditMode } = useEditMode();
  const { getField, setField } = useOverrides();

  const classified = classifyTheoryItem(item);
  const overrideBadge = getField(`${pathPrefix}.badge`, '__NO_OVERRIDE__');
  const overrideColor = getField(`${pathPrefix}.badgeColor`, '__NO_OVERRIDE__');

  const hasBadgeOverride = overrideBadge !== '__NO_OVERRIDE__';
  const effectiveBadgeText = hasBadgeOverride ? overrideBadge.trim() : (classified.badgeLabel || '');
  const effectiveBadgeColor = overrideColor !== '__NO_OVERRIDE__' && overrideColor ? overrideColor : undefined;

  let category: BlockCategory = classified.category;
  if (hasBadgeOverride) {
    if (!effectiveBadgeText) {
      category = 'text';
    } else {
      const lower = effectiveBadgeText.toLowerCase();
      if (lower.includes('определ') || lower.includes('понят') || lower.includes('аксиом')) {
        category = 'definition';
      } else if (
        lower.includes('теор') ||
        lower.includes('лемм') ||
        lower.includes('следств') ||
        lower.includes('критер') ||
        lower.includes('свойств')
      ) {
        category = 'theorem';
      } else {
        category = classified.category === 'text' ? 'definition' : classified.category;
      }
    }
  }

  const isBoxed = category !== 'text' || Boolean(effectiveBadgeText);

  let effectiveBadgeClass = classified.badgeClass || 'theory-badge';
  if (hasBadgeOverride && effectiveBadgeText) {
    const lower = effectiveBadgeText.toLowerCase();
    if (
      lower.includes('теор') ||
      lower.includes('свойств') ||
      lower.includes('формул') ||
      lower.includes('правил')
    ) {
      effectiveBadgeClass = 'theory-badge theory-badge--theorem';
    } else if (lower.includes('определ') || lower.includes('понят') || lower.includes('аксиом')) {
      effectiveBadgeClass = 'theory-badge theory-badge--def';
    } else if (lower.includes('лемм')) {
      effectiveBadgeClass = 'theory-badge theory-badge--lemma';
    } else if (lower.includes('следств')) {
      effectiveBadgeClass = 'theory-badge theory-badge--corollary';
    } else if (lower.includes('критер')) {
      effectiveBadgeClass = 'theory-badge theory-badge--criterion';
    }
  }

  const containerClass = isBoxed
    ? `theory-item theory-box theory-box--${category}`
    : 'theory-item theory-text-block';

  const handleUpdateBadge = (badgeText: string, badgeColor: string) => {
    setField(`${pathPrefix}.badge`, badgeText);
    setField(`${pathPrefix}.badgeColor`, badgeColor);
  };

  return (
    <div className={containerClass}>
      <div className={isBoxed ? 'theory-box-header' : 'theory-text-header'}>
        <div className="theory-header-left">
          <h4 className={isBoxed ? 'theory-box-title' : 'theory-text-title'}>
            <Editable path={`${pathPrefix}.h`} value={item.h} multiline={false} />
          </h4>
          <BadgeEditor
            badge={effectiveBadgeText}
            badgeColor={effectiveBadgeColor}
            canEdit={isEditMode}
            presets={THEORY_BLOCK_PRESETS}
            title={`Бейдж блока: ${item.h}`}
            addLabel="+ бейдж"
            badgeClassName={effectiveBadgeClass}
            onUpdateBadge={handleUpdateBadge}
          />
        </div>

        {onDelete && isEditMode && (
          <div className="theory-del-wrapper">
            {confirmingDelete ? (
              <div className="theory-del-confirm-box">
                <span className="theory-del-confirm-label">Удалить этот блок?</span>
                <button
                  type="button"
                  className="theory-del-btn-confirm"
                  onClick={() => {
                    setConfirmingDelete(false);
                    onDelete();
                  }}
                >
                  Да, удалить
                </button>
                <button
                  type="button"
                  className="theory-del-btn-cancel"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="theory-del-btn"
                title="Удалить этот блок"
                aria-label="Удалить этот блок"
                onClick={() => setConfirmingDelete(true)}
              >
                🗑 Удалить блок
              </button>
            )}
          </div>
        )}
      </div>

      {item.statement && (
        <div className={isBoxed ? `theory-statement theory-statement--${category}` : 'theory-text-formula'}>
          <Editable
            path={`${pathPrefix}.statement`}
            value={item.statement}
            render={(v) => <MathFormula mode="block">{v}</MathFormula>}
          />
        </div>
      )}

      <div className={isBoxed ? 'theory-content' : 'theory-text-content'}>
        <Editable
          path={`${pathPrefix}.text`}
          value={item.text}
          render={(v) => {
            const paragraphs = v.split(/\n\s*\n/);
            return (
              <div className="theory-paragraphs">
                {paragraphs.map((para, pi) => (
                  <p key={pi} className={isBoxed ? 'theory-para' : 'theory-para theory-para--text'}>
                    <MathFormula mode="inline" as="span">
                      {para}
                    </MathFormula>
                  </p>
                ))}
              </div>
            );
          }}
        />
      </div>

      {(item.disclosures || (item.disclosure ? [item.disclosure] : [])).map((disc, dIdx) => (
        <Disclosure key={dIdx} label={disc.label}>
          <div className="theory-disclosure-content">
            {disc.items ? (
              <ul className="theory-disclosure-list">
                {disc.items.map((it, idx) => (
                  <li key={idx} className="theory-disclosure-item">
                    <Editable
                      path={item.disclosures ? `${pathPrefix}.disclosures.${dIdx}.items.${idx}` : `${pathPrefix}.disclosure.items.${idx}`}
                      value={it}
                      render={(v) => <MathFormula mode="inline" as="span">{v}</MathFormula>}
                    />
                  </li>
                ))}
              </ul>
            ) : disc.content ? (
              <Editable
                path={item.disclosures ? `${pathPrefix}.disclosures.${dIdx}.content` : `${pathPrefix}.disclosure.content`}
                value={disc.content}
                render={(v) => {
                  const paragraphs = v.split(/\n\s*\n/);
                  return (
                    <div className="theory-paragraphs">
                      {paragraphs.map((para, pi) => (
                        <p key={pi} className="theory-para">
                          <MathFormula mode="inline" as="span">
                            {para}
                          </MathFormula>
                        </p>
                      ))}
                    </div>
                  );
                }}
              />
            ) : null}
          </div>
        </Disclosure>
      ))}

      {item.table && (
        <Disclosure label={`Развернуть таблицу (${item.table.rows.length} формул)`}>
          <div className="theory-formula-grid">
            {item.table.rows.map((row, i) => (
              <div className="theory-formula-cell" key={i}>
                <Editable
                  path={`${pathPrefix}.table.${i}`}
                  value={row}
                  render={(v) => <MathFormula mode="block">{v}</MathFormula>}
                />
              </div>
            ))}
          </div>
        </Disclosure>
      )}

      {item.proof && (
        <Disclosure label="Доказательство">
          <div className="theory-proof-content">
            <Editable
              path={`${pathPrefix}.proof`}
              value={item.proof}
              render={(v) => {
                const paragraphs = v.split(/\n\s*\n/);
                return (
                  <div className="theory-paragraphs">
                    {paragraphs.map((para, pi) => (
                      <p key={pi} className="theory-para">
                        <MathFormula mode="inline" as="span">
                          {para}
                        </MathFormula>
                      </p>
                    ))}
                  </div>
                );
              }}
            />
          </div>
        </Disclosure>
      )}
    </div>
  );
}
