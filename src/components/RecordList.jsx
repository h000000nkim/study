import { useRecords } from '../hooks/useRecords';
import { useAuth } from '../hooks/useAuth';

export default function RecordList({ studyId }) {
  const { records, loading, deleteRecord } = useRecords(studyId);
  const { user } = useAuth();

  if (loading) return <p className="hint">불러오는 중...</p>;
  if (records.length === 0) return <p className="hint">아직 기록이 없습니다.</p>;

  return (
    <div className="record-list">
      <h2>스터디 기록</h2>
      {records.map((record) => (
        <div key={record.id} className="record-card">
          <div className="record-header">
            <div className="record-meta">
              <img src={record.authorPhoto} alt={record.author} className="avatar" />
              <span className="author">{record.author}</span>
              <span className="date">{record.date}</span>
            </div>
            {user?.uid === record.authorId && (
              <button onClick={() => deleteRecord(record.id)} className="btn btn-danger btn-sm">
                삭제
              </button>
            )}
          </div>
          <h3 className="topic">{record.topic}</h3>
          <p className="content">{record.content}</p>
        </div>
      ))}
    </div>
  );
}
