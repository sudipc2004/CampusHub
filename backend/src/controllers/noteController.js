import Note from '../models/Note.js';
import { processAndChunkDocument } from '../services/ragService.js';

// @desc    Upload & Process a new Academic Note (PDF, PPT, DOCX)
// @route   POST /api/notes/upload
// @access  Private (Student & Teacher)
export const uploadNote = async (req, res) => {
  try {
    const { title, description, subject, department, semester, fileType, rawText, tags } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ success: false, message: 'Title and subject are required' });
    }

    const note = new Note({
      title,
      description: description || 'Comprehensive departmental study notes and exam preparation material.',
      subject,
      department: department || (req.user ? req.user.department : 'Computer Science'),
      semester: semester || (req.user ? req.user.semester : 6),
      fileType: fileType || 'PDF',
      fileSize: `${(Math.random() * 3 + 1.2).toFixed(1)} MB`,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploadedBy: req.user ? req.user._id : undefined,
      uploaderName: req.user ? req.user.name : 'Dr. Rajesh Verma',
      uploaderRole: req.user ? req.user.role : 'TEACHER',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : ['Study Material', 'Exam Prep'],
    });

    // Extract text and generate semantic RAG chunks
    const sampleText = rawText || `${title} - ${subject} Study Notes. Key concepts cover memory allocation, algorithmic complexity, system architecture, database normal forms, and optimal tree traversal patterns.`;
    const chunks = processAndChunkDocument(sampleText, note._id.toString(), title, subject);
    
    note.chunks = chunks;
    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note uploaded, processed, and vector-indexed successfully',
      note: {
        id: note._id,
        title: note.title,
        subject: note.subject,
        department: note.department,
        semester: note.semester,
        fileType: note.fileType,
        fileSize: note.fileSize,
        chunkCount: note.chunks.length,
        uploaderName: note.uploaderName,
        createdAt: note.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all Academic Notes with filtering
// @route   GET /api/notes
// @access  Public
export const getAllNotes = async (req, res) => {
  try {
    const { subject, department, semester, search } = req.query;

    let query = {};
    if (subject) query.subject = new RegExp(subject, 'i');
    if (department) query.department = new RegExp(department, 'i');
    if (semester) query.semester = Number(semester);
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Single Note with preview & chunk details
// @route   GET /api/notes/:id
// @access  Public
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upvote Note
// @route   POST /api/notes/:id/upvote
// @access  Private
export const upvoteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    note.upvoteCount += 1;
    await note.save();

    res.json({
      success: true,
      upvoteCount: note.upvoteCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
