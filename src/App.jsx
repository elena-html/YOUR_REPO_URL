import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function AppRouter() {
  const { currentUser } = useAuth();

  // Safety check - if currentUser exists but has no role, log out
  if (currentUser && !currentUser.role) {
    console.warn('Invalid user object in storage, clearing...');
    localStorage.removeItem('abs_system_user');
    window.location.reload();
    return null;
  }

  if (!currentUser) return <LoginPage />;
  if (currentUser.role === 'Administrator') return <AdminDashboard />;
  return <StudentDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
