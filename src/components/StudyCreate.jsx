import { useState } from 'react';

export default function StudyCreate({ user, onCreate, onBack }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      await onCreate(user, form.name.trim(), form.description.trim());
      onBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="record-form">
      <h2>새 스터디 만들기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>스터디 이름</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="스터디 이름을 입력하세요"
            required
          />
        </div>
        <div className="form-row">
          <label>설명 (선택)</label>
          <input
            type="text"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="스터디 설명을 입력하세요"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>취소</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '생성 중...' : '만들기'}
          </button>
        </div>
      </form>
    </div>
  );
}
