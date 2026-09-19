# π-chan

A math (and, eventually, physics) reference site: school curriculum, olympiad topics, and
higher-education math, each broken down into topics and subtopics. Built with React + TypeScript
+ Vite, following an MVC-ish layering:

- **Models** (`src/models`) own the data and pure data-access logic.
- **Controllers** (`src/controllers`) own cross-cutting UI logic (search, formatting) as plain
  functions and hooks, independent of any one view.
- **Views** are split into **components** (`src/components`, reusable building blocks) and
  **pages** (`src/pages`, route-level screens that compose components against model data).

Every component/page lives in its own folder containing up to three files: `index.tsx` (or
`Name.tsx` where there's no name collision) for markup, `Name.ts` for the types/interfaces or
helper functions that file needs, and `Name.css` for its styles. Folders where the `.tsx` file
would otherwise collide with a same-named `.ts` logic file expose an `index.tsx` instead, so
imports simply reference the folder.

## Routing

Routing uses `react-router-dom` (`HashRouter`, so URLs look like `#/math/school/...`), wired up in
`src/App.tsx`. `components/Layout` renders the top bar, the `<Outlet />` for the current route,
and the footer on every page, and scrolls to top on navigation.

## `src/models`

Data and pure data-access functions — no React, no rendering.

- `types.ts` — shared interfaces/type guards: `Topic`, `Grade`, `Category`, `MathBoard(s)`,
  `Subtopic` (`SimpleSubtopic` | `RichSubtopic`, with the `isRichSubtopic` guard), theory/practice
  types for higher math (`TheoryItem`, `PracticeProblem`, `PracticeGroup`, `HigherSubtopic`,
  `HigherTopicEntry` with the `isDeepHigherTopic` guard), and `Breadcrumb`.
- `schoolGrades.ts` — `SCHOOL_GRADES`: the grade-by-grade tree (1–4, 5–9, 10–11, exam prep), with
  5–9/10–11 further split into algebra/geometry/other categories.
- `mathBoards.ts` — `MATH_BOARDS`: the three math subsections (`school`, `olympiad`, `higher`),
  each with a title, description, accent color, and either `grades` (school) or a flat `topics`
  list (olympiad, higher).
- `topicContent.ts` — `TOPIC_CONTENT`: subtopic material for school/olympiad topics, keyed by
  topic title (plain-text `material`, or a "rich" `definition`/`rule`/`example` shape).
- `higherContent.ts` — `HIGHER_CONTENT`: theory/practice material for higher-math topics, keyed by
  topic title. Most topics are a flat `{ theory, practice }`; "Математический анализ" instead
  nests further into per-subtopic `{ theory, practice }` groups (a `HigherTopicDeep`).
- `topicAccess.ts` — accessors used by the views: `getSubtopics`, `getHigherEntry`,
  `countHigherSubtopics`.

## `src/controllers`

- `search.ts` — `normalizeQuery`, `topicMatches` (title+formula substring match).
- `useSearchQuery.ts` — hook wrapping an input's query state + its normalized/`isSearching` form.
- `format.ts` — `pluralTopics`, Russian pluralization for "N подтем/подтемы/подтема".

## `src/components`

Reusable view building blocks, roughly from page chrome down to leaf widgets:

- `Layout` — top bar + `<Outlet />` wrap + footer shell; scrolls to top on route change.
- `TopBar`, `Footer` — site header (logo, nav, forum link) and footer.
- `Hero` — homepage intro banner.
- `TileGrid`, `Tile` — the big clickable card grid (used on home and the math hub).
- `PageHeader`, `Breadcrumbs` — page title/description block and the `a / b / c` crumb trail.
- `SearchBar`, `NoResults` — the topic search input and its "nothing found" message.
- `RowList`, `RowCard` — flat topic listing rows (used by olympiad/higher boards and inside the
  school grade tree).
- `GradeNode`, `CategoryNode` — the collapsible school grade/category accordion; each owns its
  open/closed state locally and hides/auto-expands itself based on the current search query.
- `TopicIntro` — the topic/subtopic title + formula banner shown at the top of detail pages.
- `SubtopicList`, `SubtopicItem` — the "pick a subtopic" list on a topic page.
- `DefinitionBox`, `RuleBox`, `ExampleBox`, `StepList` — building blocks for a "rich" subtopic
  (definition, formula, worked example with numbered steps).
- `TabsPanel` — the Теория/Практика tab switcher used on higher-math topic/subtopic pages.
- `TheoryItem`, `PracticeList`, `PracticeItem` — theory entries (with optional proof disclosure)
  and practice problems (with a solution disclosure), grouped or flat.
- `Disclosure` — generic collapsible reveal (used for proofs and solutions).
- `MathFormula` — renders KaTeX, either as a full formula (`mode="block"`) or inline `$...$`
  segments inside prose (`mode="inline"`).
- `MaterialText`, `BackLink`, `Placeholder` — plain subtopic body text, the "← back to topic"
  link, and the Physics/Forum "coming soon" panel.

## `src/pages`

Route-level screens:

- `HomePage` — `/` — the two top-level tiles (Математика, Физика).
- `MathHubPage` — `/math` — the school/olympiad/higher tile picker.
- `SchoolBoardPage` — `/math/school` — searchable grade accordion (composes `GradeNode`).
- `FlatBoardPage` — `/math/olympiad`, `/math/higher` — searchable flat topic list; takes a
  `boardKey` prop since higher-math rows render a KaTeX formula and count subtopics differently
  than olympiad rows.
- `TopicPage` / `MaterialPage` — generic subtopic-list and subtopic-content pages, reused by
  school and olympiad topics (higher math has its own pair, see below).
- `OlympiadRoute` — resolves `/math/olympiad/:idx(/:subIdx)` to `TopicPage`/`MaterialPage`.
- `SchoolTopicRoute` — resolves `/math/school/:gradeKey/*`. School routes are ambiguous in
  segment count (a grade with categories has one more path segment than one without), so this
  page inspects the matched grade's shape before deciding whether it's rendering a topic or a
  material page, and for which grade/category.
- `HigherTopicPage` / `HigherSubtopicPage` — `/math/higher/:idx` and `/math/higher/:idx/:subIdx`;
  higher-math topics show either a subtopic list (deep topics) or theory/practice tabs directly
  (flat topics), so these are kept separate from the generic Topic/Material pages.
- `PhysicsPage`, `ForumPage` — "coming soon" placeholders.
