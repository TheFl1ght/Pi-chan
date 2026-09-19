import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage/HomePage';
import MathHubPage from './pages/MathHubPage';
import SchoolBoardPage from './pages/SchoolBoardPage';
import FlatBoardPage from './pages/FlatBoardPage/FlatBoardPage';
import OlympiadRoute from './pages/OlympiadRoute/OlympiadRoute';
import HigherTopicPage from './pages/HigherTopicPage/HigherTopicPage';
import HigherSubtopicPage from './pages/HigherSubtopicPage/HigherSubtopicPage';
import SchoolTopicRoute from './pages/SchoolTopicRoute';
import PhysicsPage from './pages/PhysicsPage/PhysicsPage';
import ForumPage from './pages/ForumPage/ForumPage';
import { EditModeProvider } from './admin/EditModeContext';
import { OverridesProvider } from './admin/OverridesContext';

export default function App() {
  return (
    <EditModeProvider>
      <OverridesProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="math" element={<MathHubPage />} />
              <Route path="math/school" element={<SchoolBoardPage />} />
              <Route path="math/school/:gradeKey/*" element={<SchoolTopicRoute />} />
              <Route path="math/olympiad" element={<FlatBoardPage boardKey="olympiad" />} />
              <Route path="math/olympiad/:idx" element={<OlympiadRoute />} />
              <Route path="math/olympiad/:idx/:subIdx" element={<OlympiadRoute />} />
              <Route path="math/higher" element={<FlatBoardPage boardKey="higher" />} />
              <Route path="math/higher/:idx" element={<HigherTopicPage />} />
              <Route path="math/higher/:idx/:subIdx" element={<HigherSubtopicPage />} />
              <Route path="physics" element={<PhysicsPage />} />
              <Route path="forum" element={<ForumPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </OverridesProvider>
    </EditModeProvider>
  );
}
