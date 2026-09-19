import type { Breadcrumb, Topic } from '../../models/types';

export interface TopicPageProps {
  topic: Topic;
  index: number;
  accent: string;
  trail: Breadcrumb[];
  hrefBase: string;
}
