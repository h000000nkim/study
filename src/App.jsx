import LoginButton from './components/LoginButton';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>스터디 기록</h1>
        <LoginButton />
      </header>
      <main className="app-main">
        <RecordForm />
        <RecordList />
      </main>
    </div>
  );
}
