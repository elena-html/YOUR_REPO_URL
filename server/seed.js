import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing users
    await User.deleteMany({});

    const users = [
      {
        user_id: 'ADM001',
        email: 'admin@univ-bba.dz',
        password: 'admin123',
        role: 'Administrator',
        full_name: 'Responsable Administratif'
      },
      {
        user_id: 'STU001',
        email: '221831001@univ-bba.dz',
        password: 'pass123',
        role: 'Student',
        full_name: 'Ahmed Benali',
        matricule: '221831001',
        specialty: 'Informatique',
        year: '2',
        semester: '3',
        group_id: 'G1'
      },
      {
        user_id: 'STU002',
        email: '221831002@univ-bba.dz',
        password: 'pass123',
        role: 'Student',
        full_name: 'Sara Meddour',
        matricule: '221831002',
        specialty: 'Informatique',
        year: '2',
        semester: '3',
        group_id: 'G1'
      },
      {
        user_id: 'STU003',
        email: 'AZIBILINA@univ-bba.dz',
        password: 'univbba',
        role: 'Student',
        full_name: 'AZIB ILINA',
        matricule: '43324091',
        specialty: 'Informatique',
        year: '2',
        semester: '3',
        group_id: 'G1',
      }
    ];

    for (const u of users) {
      await User.create(u);
    }

    console.log('✅ Database seeded successfully with 1 Admin and 1 Student!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedUsers();
