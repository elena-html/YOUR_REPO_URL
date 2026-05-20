import { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Store, STUDENTS, MODULES, SPECIALTIES, YEARS, SEMESTERS, GROUPS
} from '../store/mockData';
import {
  Users, ToggleLeft, ToggleRight, FileText, CheckCircle, XCircle,
  Clock, Search, Filter, Upload, LogOut, GraduationCap, Settings,
  ChevronDown, Bug, Bell, X, Check, AlertCircle, Download, Trash2,
  Calendar, BookOpen, BarChart3, UserCheck, FileUp, ExternalLink, Eye
} from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';
import FeedbackModal from '../components/FeedbackModal';

const TABS = [
  { id: 'absences', label: 'Gestion des Absences', icon: <ToggleRight size={18} /> },
  { id: 'justifications', label: 'Justifications', icon: <FileText size={18} /> },
  { id: 'students', label: 'Étudiants', icon: <Users size={18} /> },
  { id: 'reports', label: 'Signalements', icon: <Bug size={18} /> },
];

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('absences');
  const [showFeedback, setShowFeedback] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast] = useState(null);
  const [visitedTabs, setVisitedTabs] = useState([]);
  
  const [pendingJusCount, setPendingJusCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await Store.getStudents();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };
    
    const fetchCounts = async () => {
      try {
        const jus = await Store.getJustifications();
        setPendingJusCount(jus.filter(j => j.status === 'pending').length);
        const reps = await Store.getBugReports();
        setReportsCount(reps.filter(r => r.status !== 'resolved' && r.status !== 'closed').length);
      } catch (err) {
        console.error('Error fetching counts:', err);
      }
    };

    fetchStudents();
    fetchCounts();
  }, [activeTab]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="dashboard">
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      <header className="dash-header">
        <div className="dash-header-left">
          <div className="login-logo" style={{ width: '65px', height: '65px', margin: 0, borderRadius: '12px', background: 'transparent' }}>
            <img src="/logo-univ.png" alt="Logo Univ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Espace Administratif</h2>
            <span className="dash-subtitle">Université de Bordj Bou Arréridj</span>
          </div>
        </div>
        <div className="dash-header-right">
          <button className="btn-signaler" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }} onClick={() => setShowFeedback(true)}>
            <Bug size={16} /> Rapport technique
          </button>
          <div className="user-chip" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span className="user-avatar" style={{ background: 'linear-gradient(135deg, var(--primary), #00b894)', color: 'white' }}>A</span>
            <div>
              <span className="user-name">{currentUser?.full_name}</span>
              <span className="user-mat">Chef de Département</span>
            </div>
          </div>
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </header>

      <div style={{ background: '#f8fafc', padding: '0 40px' }}>
        <nav className="admin-tabs" style={{ padding: '10px 0 0', maxWidth: '1400px', margin: '0 auto' }}>
          {TABS.map(tab => {
            let count = 0;
            if (tab.id === 'justifications') count = pendingJusCount;
            if (tab.id === 'reports') count = reportsCount;
            
            return (
              <button
                key={tab.id}
                className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                style={{ position: 'relative' }}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (!visitedTabs.includes(tab.id)) {
                    setVisitedTabs([...visitedTabs, tab.id]);
                  }
                }}
              >
                {tab.icon} {tab.label}
                {count > 0 && !visitedTabs.includes(tab.id) && activeTab !== tab.id && (
                  <span className="badge-count" style={{ position: 'absolute', top: '5px', right: '5px', background: 'var(--error)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{count}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <main className="dash-main">
        {activeTab === 'absences' && <AbsenceManagementTab showToast={showToast} adminId={currentUser?.user_id} students={students} />}
        {activeTab === 'justifications' && <JustificationsTab showToast={showToast} adminId={currentUser?.user_id} students={students} />}
        {activeTab === 'students' && <StudentsTab showToast={showToast} students={students} />}
        {activeTab === 'reports' && <ReportsTab />}
      </main>

      {showFeedback && (
        <FeedbackModal
          user={currentUser}
          onClose={() => setShowFeedback(false)}
          onSubmit={() => { showToast('Rapport envoyé.'); setShowFeedback(false); }}
        />
      )}
    </div>
  );
}

// ─── Tab 1: Absence Management ──────────────────────────────────────────────────
function AbsenceManagementTab({ showToast, adminId, students }) {
  const [filters, setFilters] = useState({ year: '1', semester: '1', specialty: 'Informatique', group: '' });
  const [selectedModule, setSelectedModule] = useState('');
  const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0]);
  const [deadline, setDeadline] = useState('');
  const [absences, setAbsences] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const data = await Store.getAbsences();
        setAbsences(data);
      } catch (err) {
        showToast('Erreur lors du chargement des absences.', 'error');
      }
    };
    fetchAbsences();
  }, []);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    setDeadline(d.toISOString().split('T')[0]);
  }, []);

  // Filter modules based on year, semester and specialty
  const availableModules = useMemo(() => {
    return MODULES.filter(m => 
      m.year === filters.year && 
      m.semester === filters.semester && 
      (filters.year !== '3' ? m.specialty === 'Informatique' : m.specialty === filters.specialty)
    );
  }, [filters.year, filters.semester, filters.specialty]);

  // Reset selected module if not in available modules
  useEffect(() => {
    if (!availableModules.find(m => m.module_code === selectedModule)) {
      setSelectedModule('');
    }
  }, [availableModules]);

  const filteredStudents = students.filter(s => {
    if (filters.year && s.year !== filters.year) return false;
    if (filters.semester && s.semester !== filters.semester) return false;
    // For year 1 and 2, specialty is Informatique. For year 3, it can be AI or Security
    if (filters.year === '3') {
      if (filters.specialty && s.specialty !== filters.specialty) return false;
    } else {
      if (s.specialty !== 'Informatique') return false;
    }
    if (filters.group && s.group_id !== filters.group) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.full_name.toLowerCase().includes(q) || s.matricule.includes(q);
    }
    return true;
  });

  const getAbsenceRecord = (studentId) => {
    return absences.find(a => {
      if (!a.student_id) return false;
      const aStudentId = typeof a.student_id === 'object' ? a.student_id._id : a.student_id;
      return aStudentId === studentId &&
             a.module_code === selectedModule &&
             new Date(a.absence_date).toISOString().split('T')[0] === examDate;
    });
  };

  const handleToggle = async (student) => {
    if (!selectedModule) {
      showToast('Veuillez sélectionner un module.', 'error');
      return;
    }
    if (!deadline) {
      showToast('Veuillez définir une date limite.', 'error');
      return;
    }
    
    const rec = getAbsenceRecord(student._id);
    const willBeAbsent = !rec || !rec.is_absent;

    try {
      await Store.toggleAbsence(student._id, selectedModule, examDate, willBeAbsent);
      const data = await Store.getAbsences();
      setAbsences(data);
      
      showToast(
        willBeAbsent
          ? `${student.full_name} marqué(e) absent(e).`
          : `${student.full_name} marqué(e) présent(e).`,
        willBeAbsent ? 'error' : 'success'
      );
    } catch (err) {
      showToast('Erreur lors de la mise à jour.', 'error');
    }
  };

  const absentCount = filteredStudents.filter(s => {
    const r = getAbsenceRecord(s.student_id);
    return r && r.is_absent;
  }).length;

  return (
    <div>
      {/* Controls */}
      <div className="card">
        <h3 className="section-title" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={20} color="var(--primary)" /> Configuration de la séance d'examen
        </h3>
        <div className="control-grid">
          <div className="form-group">
            <label>Module d'examen</label>
            <select className="filter-select" value={selectedModule} onChange={e => setSelectedModule(e.target.value)}>
              <option value="">-- Sélectionner un module --</option>
              {availableModules.map(m => (
                <option key={m.module_code} value={m.module_code}>{m.module_name} ({m.module_code})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date de l'examen</label>
            <input type="date" className="form-control" value={examDate} onChange={e => setExamDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Date limite de justification</label>
            <input type="date" className="form-control" value={deadline} onChange={e => setDeadline(e.target.value)} min={examDate} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <h3 className="section-title" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={20} color="var(--primary)" /> Sélection des étudiants
        </h3>
        <div className="filter-grid">
          <div className="form-group">
            <label>Année</label>
            <select className="filter-select" value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value, semester: e.target.value === '1' ? '1' : e.target.value === '2' ? '3' : '5' }))}>
              {YEARS.map(y => <option key={y} value={y}>{y}ère Année Ingénieur</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Semestre</label>
            <select className="filter-select" value={filters.semester} onChange={e => setFilters(f => ({ ...f, semester: e.target.value }))}>
              {filters.year === '1' && (
                <>
                  <option value="1">Semestre 1</option>
                  <option value="2">Semestre 2</option>
                </>
              )}
              {filters.year === '2' && (
                <>
                  <option value="3">Semestre 3</option>
                  <option value="4">Semestre 4</option>
                </>
              )}
              {filters.year === '3' && (
                <>
                  <option value="5">Semestre 5</option>
                  <option value="6">Semestre 6</option>
                </>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Spécialité</label>
            <select 
              className="filter-select" 
              value={filters.specialty} 
              onChange={e => setFilters(f => ({ ...f, specialty: e.target.value }))}
              disabled={filters.year !== '3'}
            >
              {filters.year === '3' ? (
                <>
                  <option value="Intelligence Artificielle">Intelligence Artificielle (AI)</option>
                  <option value="Sécurité Informatique">Sécurité Informatique</option>
                </>
              ) : (
                <option value="Informatique">Tronc Commun (CS Engineering)</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Groupe</label>
            <select className="filter-select" value={filters.group} onChange={e => setFilters(f => ({ ...f, group: e.target.value }))}>
              <option value="">Tous les groupes</option>
              {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Recherche rapide</label>
            <div className="input-wrapper">
              <Search size={16} className="input-icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Nom ou matricule..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Student Toggle List */}
      <div className="card">
        <div className="card-header">
          <h3><UserCheck size={18} /> Saisie des Absences</h3>
          {selectedModule && (
            <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>{filteredStudents.length} Étudiants</span>
              <span style={{ color: 'var(--error)', fontWeight: '600' }}>{absentCount} Absents</span>
            </div>
          )}
        </div>
        {!selectedModule ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
            <BookOpen size={40} color="var(--grey)" style={{ marginBottom: '15px' }} />
            <p>Veuillez sélectionner un module pour afficher la liste des étudiants.</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
            <Users size={40} color="var(--grey)" style={{ marginBottom: '15px' }} />
            <p>Aucun étudiant trouvé pour ces filtres.</p>
          </div>
        ) : (
          <div className="student-toggle-list">
            <div className="toggle-list-header">
              <span>Étudiant</span>
              <span>Matricule</span>
              <span>Groupe</span>
              <span>Statut</span>
              <span>Action</span>
            </div>
            {filteredStudents.map(student => {
              const rec = getAbsenceRecord(student._id);
              const isAbsent = rec && rec.is_absent;
              return (
                <div key={student._id} className={`toggle-row ${isAbsent ? 'row-absent' : ''}`}>
                  <div className="student-name-cell" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="user-avatar" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>{student.full_name.charAt(0)}</span>
                    {student.full_name}
                  </div>
                  <span className="mono">{student.matricule}</span>
                  <span>{student.group_id}</span>
                  <div>
                    <span className={`badge ${isAbsent ? 'badge-absent' : 'badge-present'}`}>
                      {isAbsent ? 'Absent' : 'Présent'}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn-action"
                      style={{ color: isAbsent ? 'var(--error)' : 'var(--success)', background: 'none' }}
                      onClick={() => handleToggle(student)}
                    >
                      {isAbsent ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab 2: Justifications Review ──────────────────────────────────────────────
function JustificationsTab({ showToast, adminId, students }) {
  const [justifications, setJustifications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [academicFilters, setAcademicFilters] = useState({ year: '', semester: '', specialty: '', group: '' });

  const refresh = async () => {
    try {
      const data = await Store.getJustifications();
      setJustifications(data);
    } catch (err) {
      showToast('Erreur lors du rafraîchissement.', 'error');
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const enriched = useMemo(() => {
    return justifications.map(jus => {
      // Find student directly from the students list using student_id
      const student = students.find(s => s._id === jus.student_id || s.user_id === jus.student_id);
      // Find module from justification's stored module_code if available
      const mod = jus.module_code ? MODULES.find(m => m.module_code === jus.module_code) : null;
      return { ...jus, student, mod };
    }).filter(j => {
      if (filterStatus !== 'all' && j.status !== filterStatus) return false;
      if (academicFilters.year && j.student?.year !== academicFilters.year) return false;
      if (academicFilters.semester && j.student?.semester !== academicFilters.semester) return false;
      if (academicFilters.specialty && j.student?.specialty !== academicFilters.specialty) return false;
      if (academicFilters.group && j.student?.group_id !== academicFilters.group) return false;
      return true;
    });
  }, [justifications, filterStatus, academicFilters, students]);

  const handleApprove = async (jus) => {
    try {
      await Store.processJustification(jus.justification_id, 'approved', '');
      await refresh();
      showToast(`Justification acceptée.`);
    } catch (err) {
      showToast('Erreur lors de la validation.', 'error');
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    try {
      await Store.processJustification(rejectModal.justification_id, 'rejected', rejectComment);
      await refresh();
      showToast(`Justification refusée.`, 'error');
      setRejectModal(null);
      setRejectComment('');
    } catch (err) {
      showToast('Erreur lors du refus.', 'error');
    }
  };

  const [rejectModal, setRejectModal] = useState(null);
  const [rejectComment, setRejectComment] = useState('');

  return (
    <div>
      {/* Academic Filters */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div className="form-group">
            <label>Année</label>
            <select className="filter-select" value={academicFilters.year} onChange={e => setAcademicFilters(f => ({ ...f, year: e.target.value }))}>
              <option value="">Toutes</option>
              {YEARS.map(y => <option key={y} value={y}>{y}ère Ing.</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Semestre</label>
            <select className="filter-select" value={academicFilters.semester} onChange={e => setAcademicFilters(f => ({ ...f, semester: e.target.value }))}>
              <option value="">Tous</option>
              {SEMESTERS.map(s => <option key={s} value={s}>S{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Spécialité</label>
            <select className="filter-select" value={academicFilters.specialty} onChange={e => setAcademicFilters(f => ({ ...f, specialty: e.target.value }))}>
              <option value="">Toutes</option>
              {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Groupe</label>
            <select className="filter-select" value={academicFilters.group} onChange={e => setAcademicFilters(f => ({ ...f, group: e.target.value }))}>
              <option value="">Tous</option>
              {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3><FileText size={18} /> Examen des Justifications</h3>
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                className={`filter-tab ${filterStatus === s ? 'active' : ''}`}
                onClick={() => setFilterStatus(s)}
              >
                {s === 'all' ? 'Tous' : s === 'pending' ? 'En attente' : s === 'approved' ? 'Acceptées' : 'Refusées'}
              </button>
            ))}
          </div>
        </div>

        {enriched.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
            <CheckCircle size={40} color="var(--grey)" style={{ marginBottom: '15px' }} />
            <p>Aucun dossier trouvé pour ces filtres.</p>
          </div>
        ) : (
          <div className="data-table-wrapper" style={{ marginTop: '20px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Module</th>
                  <th>Motif</th>
                  <th>Document</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map(jus => (
                  <tr key={jus.justification_id}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{jus.student?.full_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{jus.student?.matricule} • {jus.student?.specialty}</div>
                    </td>
                    <td>{jus.mod?.module_name}</td>
                    <td><span className="badge" style={{ background: '#f1f5f9' }}>{jus.reason_type}</span></td>
                    <td>
                      <button className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }} onClick={() => window.open(`https://your-repo-url.onrender.com/uploads/${jus.file_name}`, '_blank')}>
                        <Eye size={14} /> {jus.file_name}
                      </button>
                    </td>
                    <td>
                      <span className={`badge badge-${jus.status}`}>
                        {jus.status === 'pending' ? 'En attente' : jus.status === 'approved' ? 'Acceptée' : 'Refusée'}
                      </span>
                    </td>
                    <td>
                      {jus.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-action" style={{ color: 'var(--success)' }} onClick={() => handleApprove(jus)} title="Accepter">
                            <Check size={20} />
                          </button>
                          <button className="btn-action" style={{ color: 'var(--error)' }} onClick={() => setRejectModal(jus)} title="Refuser">
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {new Date(jus.processed_at || jus.submitted_at).toLocaleDateString()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {rejectModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setRejectModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Refuser la justification</h3>
              <button className="pass-toggle" style={{ position: 'static' }} onClick={() => setRejectModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '15px' }}>Spécifiez le motif du refus pour l'étudiant <strong>{rejectModal.student?.full_name}</strong> :</p>
              <textarea 
                className="form-control" 
                rows={4} 
                placeholder="Ex: Document non lisible, certificat non conforme..."
                value={rejectComment}
                onChange={e => setRejectComment(e.target.value)}
                style={{ padding: '15px' }}
              />
              <div className="modal-footer" style={{ padding: '20px 0 0' }}>
                <button className="btn-secondary" onClick={() => setRejectModal(null)}>Annuler</button>
                <button className="btn-premium" style={{ background: 'var(--error)' }} onClick={handleReject}>Confirmer le refus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 3: Students Management ─────────────────────────────────────────────────
function StudentsTab({ showToast, students }) {
  const [search, setSearch] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [absences, setAbsences] = useState([]);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef();

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    try {
      const res = await Store.importStudents(file);
      showToast(res.message || 'Importation réussie !');
      setShowImportModal(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      showToast(error.response?.data?.message || 'Erreur lors de l\'importation', 'error');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  useEffect(() => {
    Store.getAbsences().then(setAbsences).catch(() => {});
  }, []);

  const filtered = students.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.full_name.toLowerCase().includes(q) || s.matricule.includes(q);
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3><Users size={18} /> Liste des Étudiants</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="input-wrapper" style={{ width: '250px' }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-premium" onClick={() => setShowImportModal(true)}>
            <FileUp size={16} /> Importer Excel
          </button>
        </div>
      </div>
      <div className="data-table-wrapper" style={{ marginTop: '20px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Matricule</th>
              <th>Année / Spécialité</th>
              <th>Groupe</th>
              <th>Absences</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const absCount = absences.filter(a => (a.student_id === s._id || a.student_id === s.user_id) && a.is_absent).length;
              return (
                <tr key={s._id || s.user_id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{s.full_name}</div>
                  </td>
                  <td className="mono">{s.matricule}</td>
                  <td>{s.year} Ing. • {s.specialty}</td>
                  <td>Groupe {s.group_id}</td>
                  <td>
                    <span className={`badge ${absCount > 0 ? 'badge-absent' : 'badge-present'}`}>
                      {absCount}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showImportModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowImportModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Importation Excel</h3>
              <button className="pass-toggle" style={{ position: 'static' }} onClick={() => setShowImportModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <Download size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
              <p>Sélectionnez un fichier Excel contenant la liste des étudiants.</p>
              <div className="file-drop-area" style={{ marginTop: '20px' }} onClick={() => fileRef.current?.click()}>
                <Upload size={24} />
                <span>Charger le fichier .xlsx</span>
              </div>
              <input ref={fileRef} type="file" accept=".xlsx, .xls" style={{ display: 'none' }} onChange={handleImport} />
              {importing && <p style={{ marginTop: '15px', color: 'var(--primary)' }}>Importation en cours...</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 4: Bug Reports ──────────────────────────────────────────────────────────
function ReportsTab() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    Store.getBugReports().then(setReports).catch(() => {});
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3><Bug size={18} /> Rapports Techniques & Suggestions</h3>
        <span className="badge-count">{reports.length} total</span>
      </div>
      {reports.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
          <CheckCircle size={40} color="var(--grey)" style={{ marginBottom: '15px' }} />
          <p>Aucun signalement en attente.</p>
        </div>
      ) : (
        <div className="reports-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {reports.map(r => (
            <div key={r._id} className="feedback-card">
              <div className="feedback-header">
                <span className="badge" style={{ background: r.type === 'bug' ? '#fee2e2' : '#f0fdfa', color: r.type === 'bug' ? '#991b1b' : '#166534' }}>
                  {r.type === 'bug' ? '🐛 Bug' : '💬 Suggestion'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(r.createdAt).toLocaleString('fr-DZ')}</span>
              </div>
              <div className="feedback-body" style={{ margin: '10px 0' }}>{r.message}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Envoyé par: <strong>{r.user_id?.full_name || 'Étudiant'}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
