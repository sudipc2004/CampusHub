import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

// @desc    Register a new Student
// @route   POST /api/auth/register/student
// @access  Public
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, department, semester, skills, interests } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'STUDENT',
      department: department || 'Computer Science',
      semester: semester || 6,
      skills: skills || ['Data Structures', 'Python', 'React'],
      interests: interests || ['AI', 'Web Dev'],
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        semester: user.semester,
        skills: user.skills,
        interests: user.interests,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register a new Teacher
// @route   POST /api/auth/register/teacher
// @access  Public
export const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, department, qualification, expertise, subjectsTaught, officeHours } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'TEACHER',
      department: department || 'Computer Science',
      qualification: qualification || 'M.Tech / Ph.D in Computer Science',
      expertise: expertise || ['Algorithms', 'Machine Learning'],
      subjectsTaught: subjectsTaught || ['Data Structures', 'Operating Systems'],
      officeHours: officeHours || 'Mon-Wed 2:00 PM - 4:00 PM',
      isApproved: true,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        qualification: user.qualification,
        expertise: user.expertise,
        subjectsTaught: user.subjectsTaught,
        officeHours: user.officeHours,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register an Admin
// @route   POST /api/auth/register/admin
// @access  Public (Secured with Admin Secret Passcode)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Check admin secret passcode
    const expectedSecret = process.env.ADMIN_SECRET || 'CAMPUSHUB_ADMIN_2026';
    if (adminSecret !== expectedSecret) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Authorization Passcode' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'ADMIN',
      department: 'Administration',
      adminPermissions: ['USER_MANAGEMENT', 'CONTENT_MODERATION', 'SYSTEM_AUDIT', 'ROLE_MANAGEMENT'],
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        adminPermissions: user.adminPermissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login User (Student, Teacher, Admin)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Optional role check validation if specified from frontend
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Account is registered as ${user.role}, not ${role}`,
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        semester: user.semester,
        skills: user.skills,
        interests: user.interests,
        expertise: user.expertise,
        qualification: user.qualification,
        officeHours: user.officeHours,
        subjectsTaught: user.subjectsTaught,
        adminPermissions: user.adminPermissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/profile
// @access  Private (All Roles)
export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update User Profile
// @route   PUT /api/auth/profile
// @access  Private (All Roles)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.department = req.body.department || user.department;

    if (user.role === 'STUDENT') {
      if (req.body.semester) user.semester = req.body.semester;
      if (req.body.skills) user.skills = req.body.skills;
      if (req.body.interests) user.interests = req.body.interests;
    }

    if (user.role === 'TEACHER') {
      if (req.body.expertise) user.expertise = req.body.expertise;
      if (req.body.qualification) user.qualification = req.body.qualification;
      if (req.body.officeHours) user.officeHours = req.body.officeHours;
      if (req.body.subjectsTaught) user.subjectsTaught = req.body.subjectsTaught;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin: Get all users with filtering
// @route   GET /api/auth/admin/users
// @access  Private (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin: Approve or toggle teacher approval status
// @route   PATCH /api/auth/admin/approve-teacher/:id
// @access  Private (Admin Only)
export const approveTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'TEACHER') {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    teacher.isApproved = req.body.isApproved !== undefined ? req.body.isApproved : !teacher.isApproved;
    await teacher.save();

    res.json({
      success: true,
      message: `Teacher ${teacher.name} approval status updated to ${teacher.isApproved}`,
      user: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
