# Handover Documentation: Student Absence Management System

This project is a React-based frontend for a **Student Exam Absence Management System**. It features a premium UI, role-based access control, and complete academic logic for a Computer Science Engineering department.

## 🚀 Tech Stack
- **Frontend**: React (Vite)
- **Icons**: Lucide-React
- **Styling**: Vanilla CSS (Premium design system in `index.css`)
- **State Management**: Context API (`AuthContext.jsx`) + Custom Store (`mockData.js`)
- **Persistence**: `localStorage` (Simulates a database for demo purposes)

---

## 🛠 Backend Requirements (Node.js + MongoDB)

The backend developer needs to replace the `Store` object in `src/store/mockData.js` with real API calls using `axios` or `fetch`.

### 1. Data Models (Mongoose Suggested)

#### **User Schema**
```javascript
{
  user_id: String, // e.g., STU001, ADM001
  email: { type: String, unique: true },
  password: String, // Should be hashed (bcrypt)
  role: { type: String, enum: ['Student', 'Administrator'] },
  full_name: String,
  matricule: String // Only for students
}
```

#### **Absence Schema**
```javascript
{
  absence_id: String,
  student_id: String, // Ref to Student
  module_code: String, // Ref to Module
  absence_date: Date,
  is_absent: Boolean,
  justification_deadline: Date,
  created_at: Date,
  recorded_by: String // Admin User ID
}
```

#### **Justification Schema**
```javascript
{
  justification_id: String,
  absence_id: String, // Ref to Absence
  student_id: String,
  file_name: String, // Path to file in storage (S3 or Local)
  file_type: String, // e.g., 'PDF'
  submitted_at: Date,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason_type: { type: String, enum: ['Raison Académique', 'Circonstance Familiale', 'Autre justificatif'] },
  comment: String, // Admin feedback on rejection
  processed_by: String // Admin ID
}
```

---

### 2. API Endpoints to Implement

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Validate credentials and return user object + JWT. |
| **GET** | `/api/absences` | Fetch absences. Admin: all (with filters). Student: only theirs. |
| **POST** | `/api/absences/toggle` | Admin action to mark a student absent/present. |
| **POST** | `/api/justifications` | Student submits file. **Note**: Use `multer` for PDF handling. |
| **PUT** | `/api/justifications/:id` | Admin processes justification (Approve/Reject). |
| **GET** | `/api/notifications` | Fetch user-specific notifications. |
| **POST** | `/api/reports` | Submit bug reports or suggestions. |

---

## 🎓 Academic Logic (Curriculum)

The system is configured for a **CS Engineering Department** at the University of Bordj Bou Arréridj:

1.  **Years 1 & 2 (Tronc Commun)**:
    - Specialty is always "Informatique".
    - Semesters 1 to 4.
2.  **Year 3 (Specialization)**:
    - Branches into **Intelligence Artificielle (AI)** or **Sécurité Informatique**.
    - Semesters 5 & 6.

**Admin Filtering Rule**: When configuring a session, if Year 1 or 2 is selected, the specialty defaults to "Informatique". If Year 3 is selected, the admin must choose between AI or Security.

---

## 📂 Project Structure Highlights

- `src/store/mockData.js`: Contains the entire `Store` object. This is the **primary file** the backend developer needs to modify to integrate the API.
- `src/context/AuthContext.jsx`: Manages the logged-in user state and persistence.
- `src/index.css`: Contains the **Premium Design System**. Do not change unless modifying the brand identity.
- `src/pages/AdminDashboard.jsx`: Complex logic for multi-criteria filtering and absence toggling.
- `src/pages/StudentDashboard.jsx`: Handling and justification submission UI.

## 📝 Next Steps for Backend Integration
1. Replace `localStorage` calls in `mockData.js` with `async/await` fetch calls.
2. Setup a Node.js/Express server with MongoDB/Mongoose.
3. Implement File Upload storage (using a folder like `/uploads` or a cloud provider).
4. Implement JWT authentication to secure the routes.

---
*Documentation generated for handover to Backend Developer.*
