import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Store, MODULES } from '../store/mockData';
import {
  FileText, CheckCircle, XCircle, Clock, Upload, Bell,
  ChevronDown, ChevronUp, AlertTriangle, Send, Bug, LogOut,
  GraduationCap, Calendar, BookOpen, X, Check, MessageSquare, ExternalLink
} from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';
import FeedbackModal from '../components/FeedbackModal';

export default function StudentDashboard() {
  const { currentUser, currentStudent, logout } = useAuth();
  const [absences, setAbsences] = useState([]);
  const [justifications, setJustifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bugReports, setBugReports] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [justifyModal, setJustifyModal] = useState(null);
  const [expandedAbsence, setExpandedAbsence] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeView, setActiveView] = useState('absences'); // 'absences' | 'bugs'

  const refresh = () => {
    if (!currentStudent) return;
    setAbsences(Store.getAbsencesByStudent(currentStudent.student_id));
    setJustifications(Store.getJustifications());
    setNotifications(Store.getNotifications(currentUser.user_id));
    setBugReports(Store.getBugReportsByUser(currentUser.user_id));
  };

  useEffect(() => { refresh(); }, [currentStudent]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getJusForAbsence = (absence_id) =>
    justifications.find(j => j.absence_id === absence_id);

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const getStatusBadge = (absence) => {
    const jus = getJusForAbsence(absence.absence_id);
    if (!absence.is_absent) return { label: 'Présent', cls: 'badge-present', icon: <Check size={12} /> };
    if (!jus) return { label: 'Non justifié', cls: 'badge-absent', icon: <XCircle size={12} /> };
    if (jus.status === 'pending') return { label: 'En attente', cls: 'badge-pending', icon: <Clock size={12} /> };
    if (jus.status === 'approved') return { label: 'Acceptée', cls: 'badge-approved', icon: <CheckCircle size={12} /> };
    if (jus.status === 'rejected') return { label: 'Refusée', cls: 'badge-rejected', icon: <XCircle size={12} /> };
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const stats = {
    total: absences.filter(a => a.is_absent).length,
    justified: absences.filter(a => {
      const j = getJusForAbsence(a.absence_id);
      return j && j.status === 'approved';
    }).length,
    pending: absences.filter(a => {
      const j = getJusForAbsence(a.absence_id);
      return j && j.status === 'pending';
    }).length,
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Store.markNotificationsRead(currentUser.user_id);
    setNotifications(Store.getNotifications(currentUser.user_id));
  };

  return (
    <div className="dashboard">
      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-left">
          <GraduationCap size={28} className="logo-icon" />
          <div>
            <h2>Portail Étudiant</h2>
            <span className="dash-subtitle">Université de Bordj Bou Arréridj</span>
          </div>
        </div>
        <div className="dash-header-right">
          <button className="btn-notif" onClick={openNotifications} title="Notifications">
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
          </button>
          <button className="btn-signaler" onClick={() => setShowFeedback(true)}>
            <Bug size={16} /> Signaler un problème
          </button>
          <div className="user-chip">
            <span className="user-avatar">{currentUser?.full_name?.charAt(0)}</span>
            <div>
              <span className="user-name">{currentUser?.full_name}</span>
              <span className="user-mat">Mat: {currentStudent?.matricule}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} /> Quitter
          </button>
        </div>
      </header>

      <main className="dash-main">
        {/* Student Info Bar */}
        <div className="student-info-bar" style={{ display: 'flex', gap: '20px', marginBottom: '25px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <div className="info-chip" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} />{currentStudent?.specialty}</div>
          <div className="info-chip" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} />Année {currentStudent?.year} • Semestre {currentStudent?.semester}</div>
          <div className="info-chip" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GraduationCap size={14} />Groupe {currentStudent?.group_id}</div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-num">{stats.total}</div>
            <div className="stat-label">Absences totales</div>
          </div>
          <div className="stat-card stat-justified">
            <div className="stat-num">{stats.justified}</div>
            <div className="stat-label">Justifiées</div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-num">{stats.pending}</div>
            <div className="stat-label">En attente</div>
          </div>
          <div className="stat-card stat-unjustified">
            <div className="stat-num">{stats.total - stats.justified - stats.pending}</div>
            <div className="stat-label">Non justifiées</div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeView === 'absences' ? 'active' : ''}`}
            onClick={() => setActiveView('absences')}
          >
            <FileText size={16} /> Mes Absences
          </button>
          <button 
            className={`filter-tab ${activeView === 'bugs' ? 'active' : ''}`}
            onClick={() => setActiveView('bugs')}
          >
            <MessageSquare size={16} /> Mes Commentaires / Bugs
          </button>
        </div>

        {activeView === 'absences' ? (
          <div className="card">
            <div className="card-header">
              <h3><FileText size={18} /> Liste des Absences</h3>
              <span className="badge-count">{absences.length} entrées</span>
            </div>
            {absences.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
                <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '15px' }} />
                <p>Aucune absence enregistrée ! 🎉</p>
              </div>
            ) : (
              <div className="absence-list">
                {absences.map(absence => {
                  const mod = MODULES.find(m => m.module_code === absence.module_code);
                  const jus = getJusForAbsence(absence.absence_id);
                  const deadlinePassed = isDeadlinePassed(absence.justification_deadline);
                  const status = getStatusBadge(absence);
                  const isExpanded = expandedAbsence === absence.absence_id;

                  return (
                    <div key={absence.absence_id} className={`absence-item`}>
                      <div className="absence-item-header" onClick={() => setExpandedAbsence(isExpanded ? null : absence.absence_id)}>
                        <div className="absence-item-main">
                          <div className={`status-dot ${!absence.is_absent ? 'dot-present' : 'dot-absent'}`} />
                          <div>
                            <div className="absence-module">{mod?.module_name || absence.module_code}</div>
                            <div className="absence-meta">
                              <span><Calendar size={12} /> {new Date(absence.absence_date).toLocaleDateString('fr-DZ')}</span>
                              {absence.is_absent && (
                                <span className={deadlinePassed ? 'badge-rejected' : ''} style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <Clock size={12} /> Délai: {new Date(absence.justification_deadline).toLocaleDateString('fr-DZ')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="absence-item-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span className={`badge ${status.cls}`}>{status.icon} {status.label}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="absence-detail">
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="detail-row"><span>Module :</span><strong>{mod?.module_name}</strong></div>
                            <div className="detail-row"><span>Code :</span><strong>{absence.module_code}</strong></div>
                            <div className="detail-row"><span>Enregistré par :</span><strong>Administration</strong></div>
                            <div className="detail-row"><span>Délai limite :</span><strong>{new Date(absence.justification_deadline).toLocaleDateString('fr-DZ')}</strong></div>
                          </div>

                          {jus && (
                            <div className="upload-preview" style={{ marginTop: '20px' }}>
                              <div className="upload-preview-icon"><FileText size={24} /></div>
                              <div className="upload-preview-info">
                                <span className="upload-preview-name">{jus.file_name}</span>
                                <span className="upload-preview-size">{jus.reason_type} • Soumis le {new Date(jus.submitted_at).toLocaleDateString('fr-DZ')}</span>
                              </div>
                              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={(e) => { e.stopPropagation(); window.alert("Visualisation du PDF: " + jus.file_name); }}>
                                <ExternalLink size={14} /> Voir le fichier
                              </button>
                            </div>
                          )}

                          {jus?.status === 'rejected' && (
                            <div className="error-banner" style={{ marginTop: '15px', background: '#fff1f2', color: '#e11d48', padding: '12px', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <AlertTriangle size={18} />
                              <div>
                                <strong>Refusée :</strong> {jus.comment || 'Aucun motif spécifié.'}
                              </div>
                            </div>
                          )}

                          <div style={{ marginTop: '20px' }}>
                            {absence.is_absent && (!jus || jus.status === 'pending') && !deadlinePassed && (
                              <button className="btn-premium" style={{ width: '100%' }} onClick={() => setJustifyModal(absence)}>
                                <Upload size={16} /> {jus ? 'Modifier la justification' : 'Soumettre une justification'}
                              </button>
                            )}
                            {absence.is_absent && !jus && deadlinePassed && (
                              <div className="badge-rejected" style={{ padding: '12px', textAlign: 'center', borderRadius: '10px' }}>
                                <Clock size={16} /> Délai dépassé — Impossible de soumettre une justification
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h3><MessageSquare size={18} /> Mes Rapports & Commentaires</h3>
              <button className="btn-premium" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setShowFeedback(true)}>
                <Send size={14} /> Nouveau rapport
              </button>
            </div>
            {bugReports.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
                <MessageSquare size={48} color="var(--grey)" style={{ marginBottom: '15px' }} />
                <p>Aucun commentaire envoyé.</p>
              </div>
            ) : (
              <div className="feedback-list">
                {bugReports.map(bug => (
                  <div key={bug.id} className="feedback-card">
                    <div className="feedback-header">
                      <span className="badge" style={{ background: bug.type === 'bug' ? '#fee2e2' : '#f0fdfa', color: bug.type === 'bug' ? '#991b1b' : '#166534' }}>
                        {bug.type === 'bug' ? 'Problème Technique' : 'Suggestion'}
                      </span>
                      <span>{new Date(bug.submitted_at).toLocaleString('fr-DZ')}</span>
                    </div>
                    <div className="feedback-body">{bug.message}</div>
                    <div className="feedback-footer" style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Statut: <strong>{bug.status === 'open' ? 'En cours d\'examen' : 'Traité'}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Justification Modal */}
      {justifyModal && (
        <JustificationModal
          absence={justifyModal}
          student={currentStudent}
          existingJus={getJusForAbsence(justifyModal.absence_id)}
          onClose={() => { setJustifyModal(null); refresh(); }}
          onSubmit={(msg) => { showToast(msg); setJustifyModal(null); refresh(); }}
        />
      )}

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal
          user={currentUser}
          onClose={() => setShowFeedback(false)}
          onSubmit={() => { showToast('Rapport envoyé. Merci !'); setShowFeedback(false); refresh(); }}
        />
      )}
    </div>
  );
}

// ─── Justification Modal ────────────────────────────────────────────────────────
function JustificationModal({ absence, student, existingJus, onClose, onSubmit }) {
  const [reasonType, setReasonType] = useState(existingJus?.reason_type || '');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const mod = MODULES.find(m => m.module_code === absence.module_code);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setFileError('Uniquement les fichiers PDF sont acceptés.');
      setFile(null);
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setFileError('Fichier trop grand (max 2MB).');
      setFile(null);
      return;
    }
    setFileError('');
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reasonType) return;
    if (!file && !existingJus) { setFileError('Veuillez joindre votre justificatif (PDF).'); return; }
    
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    Store.submitJustification(
      absence.absence_id, 
      student.student_id, 
      file ? file.name : existingJus.file_name, 
      'PDF', 
      reasonType
    );
    setSubmitting(false);
    onSubmit('Justification transmise à l\'administration.');
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3><Upload size={20} /> Justifier l'absence</h3>
          <button className="pass-toggle" style={{ position: 'static' }} onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
            <div style={{ marginBottom: '5px' }}>Module: <strong>{mod?.module_name}</strong></div>
            <div>Date: <strong>{new Date(absence.absence_date).toLocaleDateString('fr-DZ')}</strong></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Motif de l'absence</label>
              <select className="filter-select" style={{ backgroundImage: 'none' }} value={reasonType} onChange={e => setReasonType(e.target.value)} required>
                <option value="">-- Choisir un motif --</option>
                <option value="Raison Académique">Raison Académique</option>
                <option value="Circonstance Familiale">Circonstance Familiale</option>
                <option value="Autre justificatif">Autre justificatif</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                Note: Vous ne pouvez pas saisir de texte, veuillez uniquement choisir le motif et joindre le document officiel.
              </p>
            </div>

            <div className="form-group">
              <label>Document justificatif (PDF)</label>
              <div className="file-drop-area" onClick={() => document.getElementById('jus-file').click()}>
                <Upload size={32} />
                <div style={{ marginTop: '10px' }}>
                  {file ? (
                    <div style={{ color: 'var(--primary)', fontWeight: '600' }}>
                      <FileText size={16} /> {file.name}
                    </div>
                  ) : existingJus ? (
                    <div style={{ color: 'var(--primary)' }}>
                      Fichier actuel: {existingJus.file_name}
                    </div>
                  ) : (
                    "Cliquez pour charger le PDF"
                  )}
                </div>
              </div>
              <input id="jus-file" type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
              {fileError && <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '5px' }}>{fileError}</div>}
            </div>

            {file && (
              <div className="upload-preview">
                <CheckCircle size={18} className="upload-preview-icon" />
                <div className="upload-preview-info">
                  <span className="upload-preview-name">{file.name} prêt à l'envoi</span>
                </div>
              </div>
            )}

            <div className="modal-footer" style={{ padding: '20px 0 0' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
              <button type="submit" className="btn-premium" disabled={submitting || !reasonType}>
                {submitting ? "Envoi..." : "Envoyer à l'administration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
