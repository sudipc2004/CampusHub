import StudyGroup from '../models/StudyGroup.js';
import Gamification from '../models/Gamification.js';

const INITIAL_GROUPS = [
  {
    name: 'CS601 Data Structures Masters',
    department: 'Computer Science',
    subject: 'Data Structures',
    description: 'Channel for discussing B-Trees, AVL rotation algorithms, and mid-term exam prep.',
    memberCount: 24,
    discussions: [
      { senderName: 'Priya Patel', senderRole: 'STUDENT', text: 'Does anyone have clean notes on Red-Black tree deletion cases?' },
      { senderName: 'Aman Sharma', senderRole: 'STUDENT', text: 'Yes! Check out Unit 3 notes in the Academic Notes repository.' }
    ]
  },
  {
    name: 'OS502 Concurrency & Kernel Room',
    department: 'Computer Science',
    subject: 'Operating Systems',
    description: 'Deep dive into Bankers Deadlock Avoidance and Virtual Memory Page Replacement.',
    memberCount: 19,
    discussions: [
      { senderName: 'Rohan Gupta', senderRole: 'STUDENT', text: 'Can someone explain how LRU page replacement handles dirty bits?' }
    ]
  },
  {
    name: 'PHY201 Quantum Physics Group',
    department: 'Physics',
    subject: 'Quantum Mechanics',
    description: 'Wavefunction calculations, barrier penetration, and Schrödinger equation discussion.',
    memberCount: 14,
    discussions: []
  }
];

const INITIAL_LEADERBOARD = [
  { studentName: 'Aman Sharma', department: 'Computer Science', points: 1450, streakDays: 12, level: 6, rank: 1, badgesCount: 5 },
  { studentName: 'Priya Patel', department: 'Computer Science', points: 1320, streakDays: 10, level: 5, rank: 2, badgesCount: 4 },
  { studentName: 'Rohan Gupta', department: 'Electrical Eng.', points: 1180, streakDays: 8, level: 5, rank: 3, badgesCount: 4 },
  { studentName: 'Sneha Verma', department: 'Mechanical Eng.', points: 1050, streakDays: 7, level: 4, rank: 4, badgesCount: 3 },
  { studentName: 'Vikram Singh', department: 'Computer Science', points: 940, streakDays: 5, level: 4, rank: 5, badgesCount: 3 },
];

// @desc    Get Study Groups
// @route   GET /api/social/groups
// @access  Public
export const getStudyGroups = async (req, res) => {
  try {
    let groups = await StudyGroup.find({}).sort({ createdAt: -1 });
    if (groups.length === 0) {
      groups = await StudyGroup.insertMany(INITIAL_GROUPS);
    }
    res.json({ success: true, count: groups.length, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Study Group
// @route   POST /api/social/groups
// @access  Private
export const createStudyGroup = async (req, res) => {
  try {
    const { name, department, subject, description } = req.body;

    const group = await StudyGroup.create({
      name,
      department: department || 'Computer Science',
      subject: subject || 'Data Structures',
      description: description || 'Collaborative study group.',
      memberCount: 1,
      discussions: [
        {
          senderName: req.user ? req.user.name : 'Aman Sharma',
          senderRole: req.user ? req.user.role : 'STUDENT',
          text: `Welcome to ${name}! Ask questions and share revision notes here.`,
        }
      ]
    });

    res.status(201).json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Post Group Message
// @route   POST /api/social/groups/:id/message
// @access  Private
export const postGroupMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const group = await StudyGroup.findById(req.params.id);

    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });

    const newMsg = {
      senderName: req.user ? req.user.name : 'Aman Sharma',
      senderRole: req.user ? req.user.role : 'STUDENT',
      text,
      timestamp: new Date(),
    };

    group.discussions.push(newMsg);
    await group.save();

    res.json({ success: true, message: newMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Campus Leaderboard
// @route   GET /api/social/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    let leaderboard = await Gamification.find({}).sort({ points: -1 });

    if (leaderboard.length === 0) {
      leaderboard = INITIAL_LEADERBOARD;
    }

    res.json({ success: true, count: leaderboard.length, leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
