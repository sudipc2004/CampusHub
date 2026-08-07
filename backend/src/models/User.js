import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['STUDENT', 'TEACHER', 'ADMIN'],
      default: 'STUDENT',
      required: true,
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    avatar: {
      type: String,
      default: '',
    },
    // --- Student Profile Specifics ---
    semester: {
      type: Number,
      default: 6,
    },
    skills: {
      type: [String],
      default: ['Data Structures', 'Python', 'React'],
    },
    interests: {
      type: [String],
      default: ['Artificial Intelligence', 'Web Development'],
    },
    // --- Teacher Profile Specifics ---
    expertise: {
      type: [String],
      default: [],
    },
    qualification: {
      type: String,
      default: '',
    },
    officeHours: {
      type: String,
      default: 'Mon-Wed 2:00 PM - 4:00 PM',
    },
    subjectsTaught: {
      type: [String],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    // --- Admin Specifics ---
    adminPermissions: {
      type: [String],
      default: ['USER_MANAGEMENT', 'CONTENT_MODERATION', 'SYSTEM_AUDIT'],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password prior to saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
