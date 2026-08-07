import mongoose from 'mongoose';

const answerAttemptSchema = new mongoose.Schema({
  questionText: String,
  selectedOption: Number,
  correctAnswer: Number,
  isCorrect: Boolean,
  explanation: String,
});

const quizAttemptSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      default: 'Aman Sharma',
    },
    studentEmail: {
      type: String,
      default: 'aman.sharma@campushub.edu',
    },
    subject: {
      type: String,
      default: 'Data Structures',
    },
    difficulty: {
      type: String,
      default: 'Medium',
    },
    score: {
      type: Number,
      default: 4,
    },
    totalQuestions: {
      type: Number,
      default: 5,
    },
    accuracyPercentage: {
      type: Number,
      default: 80,
    },
    answers: [answerAttemptSchema],
  },
  {
    timestamps: true,
  }
);

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
export default QuizAttempt;
