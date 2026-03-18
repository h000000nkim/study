import { useAuth } from '../hooks/useAuth';

export default function LoginButton() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <div className="user-info">
        <img src={user.photoURL} alt={user.displayName} className="avatar" />
        <span>{user.displayName}</span>
        <button onClick={logout} className="btn btn-secondary">
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button onClick={login} className="btn btn-primary">
      Google로 로그인
    </button>
  );
}
