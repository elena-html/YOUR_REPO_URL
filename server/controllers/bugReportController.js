import BugReport from '../models/BugReport.js';

// @desc    Get bug reports
// @route   GET /api/bugReports
export const getBugReports = async (req, res) => {
  try {
    let reports;
    if (req.user.role === 'Administrator') {
      reports = await BugReport.find({}).populate('user_id', 'full_name email role');
    } else {
      reports = await BugReport.find({ user_id: req.user.id });
    }
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a bug report
// @route   POST /api/bugReports
export const submitBugReport = async (req, res) => {
  const { message, type } = req.body;

  try {
    const report = await BugReport.create({
      user_id: req.user.id,
      message,
      type
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update bug report status (Admin)
// @route   PUT /api/bugReports/:id
export const updateBugReportStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const report = await BugReport.findById(req.params.id);

    if (report) {
      report.status = status;
      await report.save();
      res.json(report);
    } else {
      res.status(404).json({ message: 'Bug report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
