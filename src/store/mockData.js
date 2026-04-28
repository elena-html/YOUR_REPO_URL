// ─── MOCK DATA STORE ───────────────────────────────────────────────────────────
// Simulates backend data for the Student Exam Absence Management System

export const USERS = [
  { user_id: 'ADM001', email: 'admin@univ-bba.dz', password: 'admin123', role: 'Administrator', full_name: 'Responsable Administratif' },
  { user_id: 'STU001', email: '221831001@univ-bba.dz', password: 'pass123', role: 'Student', full_name: 'Ahmed Benali', matricule: '221831001' },
  { user_id: 'STU002', email: '221831002@univ-bba.dz', password: 'pass123', role: 'Student', full_name: 'Sara Meddour', matricule: '221831002' },
  { user_id: 'STU003', email: '221831003@univ-bba.dz', password: 'pass123', role: 'Student', full_name: 'Youcef Khaldi', matricule: '221831003' },
  { user_id: 'STU004', email: '221831004@univ-bba.dz', password: 'pass123', role: 'Student', full_name: 'Imane Zerrouk', matricule: '221831004' },
  { user_id: 'STU005', email: '221831005@univ-bba.dz', password: 'pass123', role: 'Student', full_name: 'Karim Bouzidi', matricule: '221831005' },
];

export const STUDENTS = [
  { student_id: 'S001', user_id: 'STU001', full_name: 'Ahmed Benali', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G1', matricule: '221831001' },
  { student_id: 'S002', user_id: 'STU002', full_name: 'Sara Meddour', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G1', matricule: '221831002' },
  { student_id: 'S003', user_id: 'STU003', full_name: 'Youcef Khaldi', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G2', matricule: '221831003' },
  { student_id: 'S004', user_id: 'STU004', full_name: 'Imane Zerrouk', specialty: 'Informatique', year: '1', semester: '1', group_id: 'G1', matricule: '221831004' },
  { student_id: 'S005', user_id: 'STU005', full_name: 'Karim Bouzidi', specialty: 'Intelligence Artificielle', year: '3', semester: '5', group_id: 'G1', matricule: '221831005' },
  { student_id: 'S006', user_id: 'STU006', full_name: 'Leila Amrani', specialty: 'Sécurité Informatique', year: '3', semester: '5', group_id: 'G2', matricule: '221831006' },
];

export const MODULES = [
  // 1ère Année Ingénieur - S1
  { module_code: 'ALG1', module_name: 'Algebra 1', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'ALGO1', module_name: 'Algorithmique', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'ARCH1', module_name: 'Architecture des ordinateurs', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'ELEC1', module_name: 'Electronique fondamentale', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'ISO1', module_name: 'Introduction de système d\'exploitation', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'MATH1', module_name: 'Mathematical Analyse 1', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'STRM1', module_name: 'Structure machine', year: '1', semester: '1', specialty: 'Informatique' },
  { module_code: 'WET1', module_name: 'Written expression technique', year: '1', semester: '1', specialty: 'Informatique' },
  
  // 1ère Année Ingénieur - S2
  { module_code: 'ASD1', module_name: 'Algorithmique et structure de données', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'ALG2', module_name: 'Algebra 2', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'ARCH2', module_name: 'Architecture des ordinateurs', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'LOGM1', module_name: 'Logique mathématique', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'ANL2', module_name: 'Analyse 2', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'PROB1', module_name: 'Probability and Statistics', year: '1', semester: '2', specialty: 'Informatique' },
  { module_code: 'OTC1', module_name: 'Techniques of oral communication', year: '1', semester: '2', specialty: 'Informatique' },

  // 2ème Année Ingénieur - S3
  { module_code: 'ALG3', module_name: 'Algebra 3', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'ALGC1', module_name: 'Algorithmique et complexité', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'ARCH3', module_name: 'Architecture des ordinateurs 2', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'ENT1', module_name: 'Entreprenariat', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'ANL3', module_name: 'Analyse 3', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'POO1', module_name: 'POO 1', year: '2', semester: '3', specialty: 'Informatique' },
  { module_code: 'SFSD1', module_name: 'SFSD', year: '2', semester: '3', specialty: 'Informatique' },

  // 2ème Année Ingénieur - S4
  { module_code: 'ENG1', module_name: 'English', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'IRI1', module_name: 'IRI', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'TG1', module_name: 'TG', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'POO2', module_name: 'POO 2', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'SI1', module_name: 'SI', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'TL1', module_name: 'TL', year: '2', semester: '4', specialty: 'Informatique' },
  { module_code: 'IBD1', module_name: 'IBD', year: '2', semester: '4', specialty: 'Informatique' },

  // 3ème Année Ingénieur - Computer Security - S5
  { module_code: 'COMP1', module_name: 'Compilation', year: '3', semester: '5', specialty: 'Sécurité Informatique' },
  { module_code: 'CRYP1', module_name: 'Mathematical tools for cryptography', year: '3', semester: '5', specialty: 'Sécurité Informatique' },
  { module_code: 'GL1', module_name: 'Software engineering', year: '3', semester: '5', specialty: 'Sécurité Informatique' },
  { module_code: 'WEB1', module_name: 'Webdev', year: '3', semester: '5', specialty: 'Sécurité Informatique' },

  // 3ème Année Ingénieur - Computer Security - S6
  { module_code: 'AI1', module_name: 'AI notions & principles', year: '3', semester: '6', specialty: 'Sécurité Informatique' },
  { module_code: 'ACRYP1', module_name: 'Advanced cryptography', year: '3', semester: '6', specialty: 'Sécurité Informatique' },
  { module_code: 'ADB1', module_name: 'Advanced databases', year: '3', semester: '6', specialty: 'Sécurité Informatique' },
  { module_code: 'DSP1', module_name: 'Digital signal processing', year: '3', semester: '6', specialty: 'Sécurité Informatique' },
  { module_code: 'CLOUD1', module_name: 'Cloud computing', year: '3', semester: '6', specialty: 'Sécurité Informatique' },

  // 3ème Année Ingénieur - AI - S5
  { module_code: 'AIF1', module_name: 'Artificial intelligence fundamentals', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },
  { module_code: 'COMP2', module_name: 'Compilation', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },
  { module_code: 'DBAA1', module_name: 'Database architecture and administration', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },
  { module_code: 'GL2', module_name: 'Software engineering', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },
  { module_code: 'NUM1', module_name: 'Numerical analysis 1', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },
  { module_code: 'PLD1', module_name: 'Programmation linéaire et dynamique', year: '3', semester: '5', specialty: 'Intelligence Artificielle' },

  // 3ème Année Ingénieur - AI - S6
  { module_code: 'SEC1', module_name: 'Introduction to computer security', year: '3', semester: '6', specialty: 'Intelligence Artificielle' },
  { module_code: 'NUM2', module_name: 'Analyse numérique 2', year: '3', semester: '6', specialty: 'Intelligence Artificielle' },
  { module_code: 'AIM1', module_name: 'Artificial intelligence management', year: '3', semester: '6', specialty: 'Intelligence Artificielle' },
  { module_code: 'PM1', module_name: 'Project management', year: '3', semester: '6', specialty: 'Intelligence Artificielle' },
  { module_code: 'OS1', module_name: 'Système d\'exploitation: synchronisation et communication', year: '3', semester: '6', specialty: 'Intelligence Artificielle' },
];

export const SPECIALTIES = ['Informatique', 'Intelligence Artificielle', 'Sécurité Informatique'];
export const YEARS = ['1', '2', '3'];
export const SEMESTERS = ['1', '2', '3', '4', '5', '6'];
export const GROUPS = ['G1', 'G2', 'G3', 'G4'];

// ─── MUTABLE STORE ─────────────────────────────────────────────────────────────
const load = (key, def) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : def;
};

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let _absences = load('abs_data_absences', [
  {
    absence_id: 'ABS001', student_id: 'S001', module_code: 'ALGO1',
    absence_date: '2026-04-15', is_absent: true,
    justification_deadline: '2026-04-22', created_at: '2026-04-15T09:00:00Z',
    recorded_by: 'ADM001',
  },
]);

let _justifications = load('abs_data_justifications', [
  {
    justification_id: 'JUS001', absence_id: 'ABS001',
    student_id: 'S001', file_name: 'certificat_medical.pdf',
    file_type: 'PDF', submitted_at: '2026-04-16T10:30:00Z',
    status: 'pending', comment: '',
    reason_type: 'Circonstance Familiale',
  },
]);

let _notifications = load('abs_data_notifications', [
  { id: 'N001', user_id: 'STU001', message: 'Votre justification pour ALGO1 est en attente de traitement.', read: false, created_at: '2026-04-16T11:00:00Z', type: 'info' },
]);

let _bugReports = load('abs_data_bugreports', []);
let _idCounter = load('abs_data_counter', 2000);

// ─── STORE API ─────────────────────────────────────────────────────────────────
export const Store = {
  getAbsences: () => [..._absences],
  getAbsencesByStudent: (student_id) => _absences.filter(a => a.student_id === student_id),
  getJustifications: () => [..._justifications],
  getJustificationByAbsence: (absence_id) => _justifications.find(j => j.absence_id === absence_id),
  getNotifications: (user_id) => _notifications.filter(n => n.user_id === user_id),
  getUnreadCount: (user_id) => _notifications.filter(n => n.user_id === user_id && !n.read).length,
  getBugReports: () => [..._bugReports],
  getBugReportsByUser: (user_id) => _bugReports.filter(b => b.user_id === user_id),

  toggleAbsence: (student_id, module_code, date, admin_user_id, deadline) => {
    const existing = _absences.find(a => a.student_id === student_id && a.module_code === module_code && a.absence_date === date);
    if (existing) {
      existing.is_absent = !existing.is_absent;
      if (!existing.is_absent) {
        _justifications = _justifications.filter(j => j.absence_id !== existing.absence_id);
        save('abs_data_justifications', _justifications);
      }
      save('abs_data_absences', _absences);
      return existing;
    } else {
      const newAbsence = {
        absence_id: `ABS${++_idCounter}`,
        student_id, module_code,
        absence_date: date,
        is_absent: true,
        justification_deadline: deadline,
        created_at: new Date().toISOString(),
        recorded_by: admin_user_id,
      };
      _absences.push(newAbsence);
      save('abs_data_absences', _absences);
      
      const student = STUDENTS.find(s => s.student_id === student_id);
      if (student) {
        _notifications.push({
          id: `N${++_idCounter}`,
          user_id: student.user_id,
          message: `Absence enregistrée pour ${module_code} le ${date}.`,
          read: false,
          created_at: new Date().toISOString(),
          type: 'warning',
        });
        save('abs_data_notifications', _notifications);
      }
      save('abs_data_counter', _idCounter);
      return newAbsence;
    }
  },

  submitJustification: (absence_id, student_id, file_name, file_type, reason_type) => {
    const existing = _justifications.find(j => j.absence_id === absence_id);
    if (existing) {
      existing.file_name = file_name;
      existing.file_type = file_type;
      existing.submitted_at = new Date().toISOString();
      existing.status = 'pending';
      existing.reason_type = reason_type;
      save('abs_data_justifications', _justifications);
      return existing;
    }
    const jus = {
      justification_id: `JUS${++_idCounter}`,
      absence_id, student_id, file_name, file_type,
      submitted_at: new Date().toISOString(),
      status: 'pending',
      comment: '',
      reason_type,
    };
    _justifications.push(jus);
    save('abs_data_justifications', _justifications);
    save('abs_data_counter', _idCounter);
    return jus;
  },

  processJustification: (justification_id, action, comment, admin_user_id) => {
    const jus = _justifications.find(j => j.justification_id === justification_id);
    if (!jus) return null;
    jus.status = action;
    jus.comment = comment;
    jus.processed_by = admin_user_id;
    jus.processed_at = new Date().toISOString();
    save('abs_data_justifications', _justifications);

    const absence = _absences.find(a => a.absence_id === jus.absence_id);
    if (absence) {
      const student = STUDENTS.find(s => s.student_id === absence.student_id);
      if (student) {
        const msg = action === 'approved'
          ? `✅ Votre justification pour ${absence.module_code} a été acceptée.`
          : `❌ Votre justification pour ${absence.module_code} a été refusée. ${comment ? 'Motif: ' + comment : ''}`;
        _notifications.push({
          id: `N${++_idCounter}`,
          user_id: student.user_id,
          message: msg,
          read: false,
          created_at: new Date().toISOString(),
          type: action === 'approved' ? 'success' : 'error',
        });
        save('abs_data_notifications', _notifications);
        save('abs_data_counter', _idCounter);
      }
    }
    return jus;
  },

  markNotificationsRead: (user_id) => {
    _notifications.filter(n => n.user_id === user_id).forEach(n => n.read = true);
    save('abs_data_notifications', _notifications);
  },

  submitBugReport: (user_id, message, type) => {
    _bugReports.push({
      id: `BUG${++_idCounter}`,
      user_id, message, type,
      submitted_at: new Date().toISOString(),
      status: 'open',
    });
    save('abs_data_bugreports', _bugReports);
    save('abs_data_counter', _idCounter);
  },

  importStudents: (newStudents) => {
    newStudents.forEach(s => {
      if (!STUDENTS.find(ex => ex.matricule === s.matricule)) {
        STUDENTS.push({ ...s, student_id: `S${++_idCounter}` });
      }
    });
    save('abs_data_counter', _idCounter);
  },

  deleteAbsence: (absence_id) => {
    _absences = _absences.filter(a => a.absence_id !== absence_id);
    _justifications = _justifications.filter(j => j.absence_id !== absence_id);
    save('abs_data_absences', _absences);
    save('abs_data_justifications', _justifications);
  },
};
