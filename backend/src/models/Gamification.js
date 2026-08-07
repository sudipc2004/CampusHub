import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  badgeId: String,
  title: String,
  icon: String,
  description: String,
  unlockedAt: { type: Date, default: Date.now },
});

const gamificationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      default: 'Aman Sharma',
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    points: {
      type: Number,
      default: 1450,
    },
    streakDays: {
      type: Number,
      default: 12,
    },
    level: {
      type: Number,
      default: 6,
    },
    rank: {
      type: Number,
      default: 1,
    },
    badges: [badgeSchema],
  },
  {
    timestamps: true,
  }
);

const Gamification = mongoose.model('Gamification', gamificationSchema);
export default Gamification;
