import { createContext, useContext, useState, useCallback } from 'react';
import { USERS, STUDENTS } from '../store/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('abs_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentStudent, setCurrentStudent] = useState(() => {
    const saved = localStorage.getItem('abs_student');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Email ou mot de passe incorrect.' };
    
    setCurrentUser(user);
    localStorage.setItem('abs_user', JSON.stringify(user));
    
    if (user.role === 'Student') {
      const student = STUDENTS.find(s => s.user_id === user.user_id);
      setCurrentStudent(student || null);
      if (student) localStorage.setItem('abs_student', JSON.stringify(student));
    }
    return { success: true, user };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentStudent(null);
    localStorage.removeItem('abs_user');
    localStorage.removeItem('abs_student');
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, currentStudent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
