import Justification from '../models/Justification.js';

// @desc    Get all justifications (Admin) or own justifications (Student)
// @route   GET /api/justifications
export const getJustifications = async (req, res) => {
  try {
    let justifications;
    if (req.user.role === 'Administrator') {
      justifications = await Justification.find({});
    } else {
      justifications = await Justification.find({ student_id: req.user.id });
    }
    res.json(justifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a justification (Student)
// @route   POST /api/justifications
export const submitJustification = async (req, res) => {
  const { justification_id, absence_id, reason_type } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const justification = await Justification.create({
      justification_id,
      absence_id,
      student_id: req.user.id,
      file_name: req.file.filename,
      file_type: req.file.mimetype,
      reason_type
    });

    res.status(201).json(justification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update justification status (Admin)
// @route   PUT /api/justifications/:id
export const updateJustificationStatus = async (req, res) => {
  const { status, comment } = req.body;

  try {
    const justification = await Justification.findOne({ justification_id: req.params.id });

    if (justification) {
      justification.status = status;
      justification.comment = comment;
      justification.processed_by = req.user.id;
      
      const updatedJustification = await justification.save();
      res.json(updatedJustification);
    } else {
      res.status(404).json({ message: 'Justification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
