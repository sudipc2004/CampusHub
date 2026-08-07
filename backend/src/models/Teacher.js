import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    designation: {
      type: String,
      default: 'Associate Professor',
    },
    qualification: {
      type: String,
      default: 'Ph.D in Computer Science & AI',
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    reviewCount: {
      type: Number,
      default: 38,
    },
    subjects: {
      type: [String],
      default: ['Data Structures', 'Operating Systems', 'Machine Learning'],
    },
    officeHours: {
      type: String,
      default: 'Mon - Wed 2:00 PM - 4:00 PM',
    },
    googleMeetLink: {
      type: String,
      default: 'https://meet.google.com/abc-defg-hij',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
