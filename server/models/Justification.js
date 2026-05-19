import mongoose from 'mongoose';

const justificationSchema = new mongoose.Schema({
  justification_id: { type: String, required: true, unique: true },
  absence_id: { type: String, ref: 'Absence', required: true },
  student_id: { type: String, ref: 'User', required: true },
  file_name: { type: String, required: true },
  file_type: { type: String, default: 'PDF' },
  submitted_at: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  reason_type: { 
    type: String, 
    enum: ['Justification médicale', 'Raison Académique', 'Circonstance Familiale', 'Autre justificatif'],
    required: true 
  },
  comment: { type: String }, // Admin feedback
  processed_by: { type: String, ref: 'User' } // Admin ID
}, { timestamps: true });

export default mongoose.model('Justification', justificationSchema);
