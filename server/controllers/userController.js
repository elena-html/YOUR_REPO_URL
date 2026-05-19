import User from '../models/User.js';
import xlsx from 'xlsx';

// @desc    Get all students
// @route   GET /api/users/students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Import students from Excel
// @route   POST /api/users/students/upload
export const importStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Veuillez uploader un fichier Excel.' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let importedCount = 0;

    for (const row of data) {
      const { 
        full_name, 
        email, 
        matricule, 
        specialty, 
        year, 
        semester, 
        group_id 
      } = row;

      if (!full_name || !email || !matricule) continue;

      const existingUser = await User.findOne({ $or: [{ email }, { matricule: matricule.toString() }] });
      
      if (!existingUser) {
        await User.create({
          user_id: `STU${Date.now()}${Math.floor(Math.random() * 1000)}`,
          email,
          password: matricule.toString(),
          role: 'Student',
          full_name,
          matricule: matricule.toString(),
          specialty: specialty || 'Informatique',
          year: year?.toString() || '1',
          semester: semester?.toString() || '1',
          group_id: group_id?.toString() || 'G1'
        });
        importedCount++;
      }
    }

    res.status(200).json({ message: `${importedCount} étudiants importés avec succès !` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
