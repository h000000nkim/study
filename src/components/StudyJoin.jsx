import { useState } from 'react';

export default function StudyJoin({ user, onJoin, onBack }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    try {
      await onJoin(user, code.trim());
      onBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="record-form">
      <h2>스터디 참여하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>초대 코드</label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="6자리 초대 코드 입력"
            maxLength={6}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>취소</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '참여 중...' : '참여하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
