export type TopicStatus = 'dev' | 'soon';

export interface Topic {
  t: string;
  f: string;
  status?: TopicStatus;
}

export interface Category {
  key: string;
  label: string;
  topics: Topic[];
}

export interface Grade {
  key: string;
  label: string;
  desc: string;
  topics?: Topic[];
  categories?: Category[];
}

export interface MathBoard {
  slug: string;
  accent: string;
  title: string;
  desc: string;
  topics?: Topic[];
  grades?: Grade[];
}

export type MathBoardKey = 'school' | 'olympiad' | 'higher';

export type MathBoards = Record<MathBoardKey, MathBoard>;

export interface WorkedExample {
  problem: string;
  steps: string[];
}

export interface SimpleSubtopic {
  h: string;
  f?: string;
  material: string;
}

export interface RichSubtopic {
  h: string;
  definition: string;
  rule?: string;
  example?: WorkedExample;
}

export type Subtopic = SimpleSubtopic | RichSubtopic;

export function isRichSubtopic(sub: Subtopic): sub is RichSubtopic {
  return 'definition' in sub;
}

export type TopicContentMap = Record<string, Subtopic[]>;

export interface TheoryTable {
  rows: string[];
}

export interface TheoryItem {
  h: string;
  statement?: string;
  text: string;
  theorem?: boolean;
  proof?: string;
  table?: TheoryTable;
}

export interface PracticeProblem {
  h: string;
  problem: string;
  steps: string[];
}

export interface PracticeGroup {
  group: string;
  problems: PracticeProblem[];
}

export type PracticeArr = PracticeProblem[] | PracticeGroup[];

export function isGroupedPractice(arr: PracticeArr): arr is PracticeGroup[] {
  return arr.length > 0 && 'problems' in arr[0];
}

export interface HigherSubtopic {
  h: string;
  f?: string;
  theory: TheoryItem[];
  practice: PracticeArr;
}

export interface HigherTopicDeep {
  subtopics: HigherSubtopic[];
}

export interface HigherTopicFlat {
  theory: TheoryItem[];
  practice: PracticeArr;
}

export type HigherTopicEntry = HigherTopicDeep | HigherTopicFlat;

export function isDeepHigherTopic(entry: HigherTopicEntry): entry is HigherTopicDeep {
  return 'subtopics' in entry;
}

export type HigherContentMap = Record<string, HigherTopicEntry>;

export interface Breadcrumb {
  label: string;
  href: string;
}
