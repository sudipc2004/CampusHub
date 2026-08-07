import mongoose from 'mongoose';

const discussionMessageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderRole: { type: String, default: 'STUDENT' },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const studyGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    subject: {
      type: String,
      required: true,
      default: 'Data Structures',
    },
    description: {
      type: String,
      default: 'Collaborative study room for exam revision, doubt sharing, and group discussion.',
    },
    memberCount: {
      type: Number,
      default: 18,
    },
    discussions: [discussionMessageSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
export default StudyGroup;
