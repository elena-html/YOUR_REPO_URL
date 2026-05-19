import { useState } from 'react';
import { Store } from '../store/mockData';
import { Bug, MessageSquare, X, Send } from 'lucide-react';

export default function FeedbackModal({ user, onClose, onSubmit }) {
  const [type, setType] = useState('bug');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await Store.submitBugReport(message, type);
      setSubmitting(false);
      onSubmit();
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3><Bug size={20} /> Signalement de problème</h3>
          <button className="pass-toggle" style={{ position: 'static' }} onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Sujet du signalement</label>
              <div className="type-toggle" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className={`type-btn ${type === 'bug' ? 'active' : ''}`}
                  onClick={() => setType('bug')}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: type === 'bug' ? 'linear-gradient(135deg, #ef4444, #f43f5e)' : 'white', color: type === 'bug' ? 'white' : 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600' }}
                >
                  <Bug size={16} /> Problème technique
                </button>
                <button
                  type="button"
                  className={`type-btn ${type === 'comment' ? 'active' : ''}`}
                  onClick={() => setType('comment')}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: type === 'comment' ? 'linear-gradient(135deg, var(--primary), #00b894)' : 'white', color: type === 'comment' ? 'white' : 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600' }}
                >
                  <MessageSquare size={16} /> Commentaire / Suggestion
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Description détaillée</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder={type === 'bug'
                  ? 'Expliquez-nous le problème technique rencontré...'
                  : 'Partagez vos idées pour améliorer le système...'
                }
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                style={{ padding: '15px' }}
              />
            </div>
            <div className="modal-footer" style={{ padding: '20px 0 0' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
              <button type="submit" className="btn-premium" disabled={submitting || !message.trim()}>
                {submitting ? "Envoi..." : <><Send size={16} /> Envoyer</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
