import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useStudies } from './hooks/useStudies';
import LoginButton from './components/LoginButton';
import StudyList from './components/StudyList';
import StudyDetail from './components/StudyDetail';
import './App.css';

export default function App() {
  const { user } = useAuth();
  const { studies, loading, fetchMyStudies, createStudy, joinStudy } = useStudies();
  const [currentStudyId, setCurrentStudyId] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchMyStudies(user);
    return unsubscribe;
  }, [user]);

  const currentStudy = studies.find(s => s.id === currentStudyId);

  return (
    <div className="app">
      <header className="app-header">
        <h1 style={{ cursor: currentStudyId ? 'pointer' : 'default' }} onClick={() => setCurrentStudyId(null)}>
          {currentStudy ? currentStudy.name : '스터디 기록'}
        </h1>
        <LoginButton />
      </header>
      <main className="app-main">
        {!user ? (
          <p className="hint">Google로 로그인하여 스터디를 시작하세요.</p>
        ) : currentStudyId ? (
          <StudyDetail study={currentStudy} onBack={() => setCurrentStudyId(null)} />
        ) : (
          <StudyList
            studies={studies}
            loading={loading}
            onSelect={setCurrentStudyId}
            onCreate={createStudy}
            onJoin={joinStudy}
            user={user}
          />
        )}
      </main>
    </div>
  );
}
