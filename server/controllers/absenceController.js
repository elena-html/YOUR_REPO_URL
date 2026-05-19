import Absence from '../models/Absence.js';

// @desc    Get all absences (Admin) or user-specific absences (Student)
// @route   GET /api/absences
export const getAbsences = async (req, res) => {
  try {
    let absences;
    if (req.user.role === 'Administrator') {
      absences = await Absence.find({}).populate('student_id', 'full_name matricule');
    } else {
      // Find the user_id string from the User model first if req.user.id is the ObjectId
      absences = await Absence.find({ student_id: req.user.id });
    }
    res.json(absences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle absence status for a student
// @route   POST /api/absences/toggle
export const toggleAbsence = async (req, res) => {
  const { absence_id, student_id, module_code, absence_date, is_absent } = req.body;

  try {
    const absence = await Absence.findOneAndUpdate(
      { absence_id },
      {
        $set: {
          absence_id,
          student_id,
          module_code,
          absence_date,
          is_absent,
          recorded_by: req.user.id
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json(absence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
