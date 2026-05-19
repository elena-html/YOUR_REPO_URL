import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        matricule: user.matricule,
        specialty: user.specialty,
        year: user.year,
        semester: user.semester,
        group_id: user.group_id,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user (Usually Admin action or Initial Setup)
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { user_id, full_name, email, password, role, matricule } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      user_id,
      full_name,
      email,
      password,
      role,
      matricule
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
