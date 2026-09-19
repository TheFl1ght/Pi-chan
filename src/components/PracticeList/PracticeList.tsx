import { Fragment } from 'react';
import { isGroupedPractice, type PracticeArr } from '../../models/types';
import PracticeItem from '../PracticeItem/PracticeItem';
import './PracticeList.css';

export default function PracticeList({ practice, pathPrefix }: { practice: PracticeArr; pathPrefix: string }) {
  if (isGroupedPractice(practice)) {
    return (
      <>
        {practice.map((group, gi) => (
          <Fragment key={gi}>
            <div className="practice-group-label">{group.group}</div>
            {group.problems.map((problem, pi) => (
              <PracticeItem key={pi} item={problem} pathPrefix={`${pathPrefix}.practice.${gi}.problems.${pi}`} />
            ))}
          </Fragment>
        ))}
      </>
    );
  }
  return (
    <>
      {practice.map((problem, pi) => (
        <PracticeItem key={pi} item={problem} pathPrefix={`${pathPrefix}.practice.${pi}`} />
      ))}
    </>
  );
}
