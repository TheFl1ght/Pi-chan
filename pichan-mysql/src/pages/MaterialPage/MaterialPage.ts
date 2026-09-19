import type { Breadcrumb, Subtopic, Topic } from '../../models/types';

export interface MaterialPageProps {
  topic: Topic;
  index: number;
  sub: Subtopic;
  accent: string;
  trail: Breadcrumb[];
  hrefBase: string;
}
