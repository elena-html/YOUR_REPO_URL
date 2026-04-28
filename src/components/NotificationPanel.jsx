import { Bell, X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const iconMap = {
  success: <CheckCircle size={18} color="#22c55e" />,
  warning: <AlertTriangle size={18} color="#f59e0b" />,
  error: <XCircle size={18} color="#ef4444" />,
  info: <Info size={18} color="#3b82f6" />,
};

export default function NotificationPanel({ notifications, onClose }) {
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()} style={{ zIndex: 2000 }}>
      <div className="notif-panel-premium" style={{ 
        position: 'fixed', right: '20px', top: '20px', width: '380px', height: 'calc(100vh - 40px)', 
        background: 'white', borderRadius: '24px', boxShadow: '-10px 10px 40px rgba(0,0,0,0.1)', 
        display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'slideInRight 0.4s ease-out' 
      }}>
        <div className="modal-header" style={{ padding: '25px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Bell size={22} color="var(--primary)" /> Notifications</h3>
          <button className="pass-toggle" style={{ position: 'static' }} onClick={onClose}><X size={20} /></button>
        </div>
        <div className="notif-list" style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          {sorted.length === 0 ? (
            <div className="empty-state" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
              <Bell size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
              <p>Aucune notification pour le moment.</p>
            </div>
          ) : sorted.map(n => (
            <div key={n.id} className={`notif-item ${!n.read ? 'notif-unread' : ''}`} style={{ 
              padding: '16px', borderRadius: '16px', marginBottom: '10px', display: 'flex', gap: '15px', 
              transition: 'all 0.2s ease', background: !n.read ? '#f0f9ff' : 'white', border: '1px solid ' + (!n.read ? '#e0f2fe' : '#f1f5f9') 
            }}>
              <div style={{ marginTop: '2px' }}>{iconMap[n.type] || iconMap.info}</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: !n.read ? '600' : '400', color: 'var(--text-main)' }}>{n.message}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>{new Date(n.created_at).toLocaleString('fr-DZ')}</span>
              </div>
              {!n.read && <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', marginTop: '6px' }} />}
            </div>
          ))}
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9' }}>
          <button className="btn-secondary" style={{ width: '100%' }} onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}
