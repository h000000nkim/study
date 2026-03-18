import { useState } from 'react';
import StudyCreate from './StudyCreate';
import StudyJoin from './StudyJoin';

export default function StudyList({ studies, loading, onSelect, onCreate, onJoin, user }) {
  const [view, setView] = useState(null);

  if (loading) return <p className="hint">불러오는 중...</p>;

  if (view === 'create') {
    return <StudyCreate user={user} onCreate={onCreate} onBack={() => setView(null)} />;
  }
  if (view === 'join') {
    return <StudyJoin user={user} onJoin={onJoin} onBack={() => setView(null)} />;
  }

  return (
    <div className="study-list">
      <div className="study-list-header">
        <h2>내 스터디</h2>
        <div className="study-list-actions">
          <button className="btn btn-secondary" onClick={() => setView('join')}>참여하기</button>
          <button className="btn btn-primary" onClick={() => setView('create')}>스터디 만들기</button>
        </div>
      </div>
      {studies.length === 0 ? (
        <p className="hint">참여 중인 스터디가 없습니다. 새로 만들거나 초대 코드로 참여하세요.</p>
      ) : (
        <div className="study-cards">
          {studies.map(study => (
            <div key={study.id} className="study-card" onClick={() => onSelect(study.id)}>
              <h3>{study.name}</h3>
              {study.description && <p>{study.description}</p>}
              <span className="member-count">멤버 {study.members.length}명</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
