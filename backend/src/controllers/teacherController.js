import Teacher from '../models/Teacher.js';
import SessionBooking from '../models/SessionBooking.js';
import { analyzeWeakTopics, recommendTeacherAgent } from '../services/agentService.js';

// Seed initial faculty directory if empty
const INITIAL_TEACHERS = [
  {
    name: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@campushub.edu',
    department: 'Computer Science',
    designation: 'Professor & Head of AI Lab',
    qualification: 'Ph.D in AI & Algorithms (IIT Delhi)',
    rating: 4.9,
    reviewCount: 42,
    subjects: ['Data Structures', 'Operating Systems', 'Machine Learning'],
    officeHours: 'Mon - Wed 2:00 PM - 4:00 PM',
    googleMeetLink: 'https://meet.google.com/abc-defg-hij',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Prof. Sunita Rao',
    email: 'sunita.rao@campushub.edu',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D in Database Systems',
    rating: 4.8,
    reviewCount: 31,
    subjects: ['Database Systems', 'System Design'],
    officeHours: 'Tue - Thu 11:00 AM - 1:00 PM',
    googleMeetLink: 'https://meet.google.com/xyz-uvwx-rst',
    avatar: 'https://images.unsplash.com/photo-1580894732413-a923f71a936c?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: 'Dr. V. K. Singh',
    email: 'vk.singh@campushub.edu',
    department: 'Electrical Eng.',
    designation: 'Professor',
    qualification: 'Ph.D in Signal Processing',
    rating: 4.7,
    reviewCount: 25,
    subjects: ['Computer Networks', 'Digital Communications'],
    officeHours: 'Fri 10:00 AM - 12:00 PM',
    googleMeetLink: 'https://meet.google.com/ece-meet-link',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
  }
];

// @desc    Get all Teachers
// @route   GET /api/teachers
// @access  Public
export const getAllTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.find({});
    if (teachers.length === 0) {
      teachers = await Teacher.insertMany(INITIAL_TEACHERS);
    }
    res.json({ success: true, count: teachers.length, teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Book a 1-on-1 Office Hour Session
// @route   POST /api/teachers/book
// @access  Private
export const bookSession = async (req, res) => {
  try {
    const { teacherName, subject, topic, date, timeSlot, notes } = req.body;

    const booking = await SessionBooking.create({
      studentName: req.user ? req.user.name : 'Aman Sharma',
      studentEmail: req.user ? req.user.email : 'aman.sharma@campushub.edu',
      teacherName: teacherName || 'Dr. Rajesh Verma',
      subject: subject || 'Data Structures',
      topic: topic || 'Binary Search Tree Balancing',
      date: date || 'Tomorrow, 3:00 PM',
      timeSlot: timeSlot || '3:00 PM - 3:45 PM',
      notes: notes || 'Need guidance on tree balancing algorithms.',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'PENDING',
    });

    res.status(201).json({
      success: true,
      message: 'Session booking requested successfully. Pending teacher approval.',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Session Bookings
// @route   GET /api/teachers/sessions
// @access  Public
export const getSessions = async (req, res) => {
  try {
    let sessions = await SessionBooking.find({}).sort({ createdAt: -1 });

    if (sessions.length === 0) {
      sessions = [
        {
          _id: 'sess_demo_01',
          studentName: 'Aman Sharma',
          studentEmail: 'aman.sharma@campushub.edu',
          teacherName: 'Dr. Rajesh Verma',
          subject: 'Data Structures',
          topic: 'B-Tree & Red-Black Tree Balancing',
          date: 'Tomorrow, 3:00 PM',
          timeSlot: '3:00 PM - 3:45 PM',
          status: 'APPROVED',
          meetLink: 'https://meet.google.com/abc-defg-hij',
          notes: 'Discussing low RAG confidence topics.',
        }
      ];
    }

    res.json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Session Approval Status (Teacher Workflow)
// @route   PATCH /api/teachers/sessions/:id/status
// @access  Private (Teacher / Admin)
export const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const session = await SessionBooking.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session booking not found' });
    }

    session.status = status || 'APPROVED';
    await session.save();

    res.json({
      success: true,
      message: `Session status updated to ${session.status}`,
      session,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Run Agentic AI Weak Topic Analysis
// @route   GET /api/teachers/agent/weak-topics
// @access  Public
export const getWeakTopicAnalysis = async (req, res) => {
  try {
    const analysis = await analyzeWeakTopics(req.user ? req.user.email : 'aman@campushub.edu');
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
