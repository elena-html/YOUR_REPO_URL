import api from './api';

// ─── STATIC CURRICULUM DATA (Kept as is) ──────────────────────────────────────
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

// Mock Students for UI lists (until you implement Student API)
export const STUDENTS = [
  { student_id: 'S001', full_name: 'Ahmed Benali', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G1', matricule: '221831001' },
  { student_id: 'S002', full_name: 'Sara Meddour', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G1', matricule: '221831002' },
  { student_id: 'S003', full_name: 'Youcef Khaldi', specialty: 'Informatique', year: '2', semester: '3', group_id: 'G2', matricule: '221831003' },
  { student_id: 'S004', full_name: 'Imane Zerrouk', specialty: 'Informatique', year: '1', semester: '1', group_id: 'G1', matricule: '221831004' },
  { student_id: 'S005', full_name: 'Karim Bouzidi', specialty: 'Intelligence Artificielle', year: '3', semester: '5', group_id: 'G1', matricule: '221831005' },
];

// ─── STORE API (Connected to Backend) ──────────────────────────────────────────
export const Store = {
  getAbsences: async () => {
    const res = await api.get('/absences');
    return res.data;
  },

  getStudents: async () => {
    const res = await api.get('/users/students');
    return res.data;
  },

  importStudents: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/users/students/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  getJustifications: async () => {
    const res = await api.get('/justifications');
    return res.data;
  },

  getBugReports: async () => {
    const res = await api.get('/bugReports');
    return res.data;
  },

  toggleAbsence: async (student_id, module_code, date, is_absent) => {
    const res = await api.post('/absences/toggle', {
      absence_id: `ABS-${student_id}-${module_code}-${date}`,
      student_id,
      module_code,
      absence_date: date,
      is_absent
    });
    return res.data;
  },

  submitJustification: async (absence_id, reason_type, file) => {
    const formData = new FormData();
    formData.append('justification_id', `JUS-${absence_id}`);
    formData.append('absence_id', absence_id);
    formData.append('reason_type', reason_type);
    formData.append('file', file);

    const res = await api.post('/justifications', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  processJustification: async (justification_id, status, comment) => {
    const res = await api.put(`/justifications/${justification_id}`, {
      status,
      comment
    });
    return res.data;
  },

  // These will be implemented as needed
  getNotifications: async () => [],
  submitBugReport: async (message, type) => {
    const res = await api.post('/bugReports', { message, type });
    return res.data;
  }
};
