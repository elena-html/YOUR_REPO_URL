import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function AppRouter() {
  const { currentUser } = useAuth();
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
