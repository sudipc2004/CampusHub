import mongoose from 'mongoose';

const sessionBookingSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      default: 'Aman Sharma',
    },
    studentEmail: {
      type: String,
      required: true,
      default: 'aman.sharma@campushub.edu',
    },
    teacherName: {
      type: String,
      required: true,
      default: 'Dr. Rajesh Verma',
    },
    subject: {
      type: String,
      required: true,
      default: 'Data Structures',
    },
    topic: {
      type: String,
      required: true,
      default: 'Binary Search Tree Balancing & Memory Allocation',
    },
    date: {
      type: String,
      required: true,
      default: 'Tomorrow, 3:00 PM',
    },
    timeSlot: {
      type: String,
      default: '3:00 PM - 3:45 PM',
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'],
      default: 'PENDING',
    },
    meetLink: {
      type: String,
      default: 'https://meet.google.com/abc-defg-hij',
    },
    notes: {
      type: String,
      default: 'Seeking clarification on AVL tree balance factors before mid-term exams.',
    },
  },
  {
    timestamps: true,
  }
);

const SessionBooking = mongoose.model('SessionBooking', sessionBookingSchema);
export default SessionBooking;
