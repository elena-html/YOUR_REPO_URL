import mongoose from 'mongoose';

const absenceSchema = new mongoose.Schema({
  absence_id: { type: String, required: true, unique: true },
  student_id: { type: String, ref: 'User', required: true },
  module_code: { type: String, required: true },
  absence_date: { type: Date, required: true },
  is_absent: { type: Boolean, default: true },
  justification_deadline: { type: Date },
  recorded_by: { type: String, ref: 'User' } // Admin User ID
}, { timestamps: true });

export default mongoose.model('Absence', absenceSchema);
