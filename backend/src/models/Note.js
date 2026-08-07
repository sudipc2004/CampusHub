import mongoose from 'mongoose';

const chunkSchema = new mongoose.Schema({
  chunkId: { type: String, required: true },
  text: { type: String, required: true },
  pageNumber: { type: Number, default: 1 },
  charCount: { type: Number, default: 0 },
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    semester: {
      type: Number,
      default: 6,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      enum: ['PDF', 'PPT', 'DOCX', 'TXT'],
      default: 'PDF',
    },
    fileSize: {
      type: String,
      default: '2.4 MB',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    uploaderName: {
      type: String,
      default: 'Faculty / Student Upload',
    },
    uploaderRole: {
      type: String,
      default: 'TEACHER',
    },
    chunks: [chunkSchema],
    tags: {
      type: [String],
      default: ['Study Material', 'Exam Prep'],
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    upvoteCount: {
      type: Number,
      default: 42,
    },
    readingProgress: {
      type: Number,
      default: 85,
    },
    qualityScore: {
      type: Number,
      default: 94,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
