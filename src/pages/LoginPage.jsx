import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) setError(result.error);
  };

  const fillDemo = (role) => {
    if (role === 'student') {
      setEmail('221831001@univ-bba.dz');
      setPassword('pass123');
      setActiveRole('student');
    } else {
      setEmail('admin@univ-bba.dz');
      setPassword('admin123');
      setActiveRole('admin');
    }
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo" style={{ background: 'transparent', width: '120px', height: '120px' }}>
            <img src="/logo-univ.png" alt="Logo Univ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1>Portail d'Absence</h1>
          <p>Université de Bordj Bou Arréridj</p>
        </div>

        <div className="role-tabs">
          <button
            className={`role-tab ${activeRole === 'student' ? 'active' : ''}`}
            onClick={() => fillDemo('student')}
          >
            <User size={18} /> Étudiant
          </button>
          <button
            className={`role-tab ${activeRole === 'admin' ? 'active' : ''}`}
            onClick={() => fillDemo('admin')}
          >
            <Lock size={18} /> Administration
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Universitaire</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="email"
                className="form-control"
                placeholder="nom.prenom@univ-bba.dz"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mot de Passe</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-banner" style={{ margin: '15px 0', padding: '12px' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button type="submit" className={`btn-premium ${loading ? 'loading' : ''}`} disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? "Connexion..." : 'Se connecter'}
          </button>
        </form>

        <div className="demo-hint" style={{ marginTop: '25px', opacity: 0.7 }}>
          <span>Mode Démo :</span>
          <button onClick={() => fillDemo('student')} className="demo-link" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Étudiant</button>
          <span> | </span>
          <button onClick={() => fillDemo('admin')} className="demo-link" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Admin</button>
        </div>
      </div>
    </div>
  );
}
