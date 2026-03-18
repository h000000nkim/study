import { useState } from 'react';
import RecordForm from './RecordForm';
import RecordList from './RecordList';

export default function StudyDetail({ study, onBack }) {
  const [showMembers, setShowMembers] = useState(false);

  if (!study) return null;

  return (
    <div>
      <div className="study-detail-header">
        <button className="btn btn-secondary btn-sm" onClick={onBack}>← 목록으로</button>
        <div className="study-info">
          <div className="invite-code">초대 코드: <strong>{study.inviteCode}</strong></div>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowMembers(!showMembers)}>
            멤버 {study.members.length}명
          </button>
        </div>
      </div>
      {showMembers && (
        <div className="member-list">
          {study.members.map(member => (
            <div key={member.uid} className="member-item">
              <img src={member.photoURL} alt={member.displayName} className="avatar" />
              <span>{member.displayName}</span>
              {study.createdBy === member.uid && <span className="badge">방장</span>}
            </div>
          ))}
        </div>
      )}
      <div className="app-main">
        <RecordForm studyId={study.id} />
        <RecordList studyId={study.id} />
      </div>
    </div>
  );
}
