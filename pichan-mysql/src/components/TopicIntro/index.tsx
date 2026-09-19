import type { CSSProperties } from 'react';
import type { TopicIntroProps } from './TopicIntro';
import './TopicIntro.css';

export default function TopicIntro({ title, formula, accent }: TopicIntroProps) {
  return (
    <div className="topic-intro" style={{ '--accent': accent } as CSSProperties}>
      <h2>{title}</h2>
      {formula && <div className="topic-formula">{formula}</div>}
    </div>
  );
}
