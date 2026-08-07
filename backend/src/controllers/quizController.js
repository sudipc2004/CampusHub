import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';
import { generateMcqQuestions, generateFlashcardsDeck } from '../services/quizService.js';

// @desc    Generate AI MCQ Quiz from notes
// @route   POST /api/quizzes/generate
// @access  Public
export const generateQuiz = async (req, res) => {
  try {
    const { subject, difficulty, questionCount } = req.body;

    const questions = generateMcqQuestions(subject || 'Data Structures', difficulty || 'Medium', questionCount || 5);

    const quiz = new Quiz({
      title: `AI ${difficulty || 'Medium'} Quiz on ${subject || 'Data Structures'}`,
      subject: subject || 'Data Structures',
      difficulty: difficulty || 'Medium',
      questions,
    });

    res.json({
      success: true,
      quiz: {
        id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        difficulty: quiz.difficulty,
        totalQuestions: questions.length,
        questions: questions.map(q => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit Quiz Attempt & Get AI Explanations
// @route   POST /api/quizzes/attempt
// @access  Public
export const submitQuizAttempt = async (req, res) => {
  try {
    const { subject, difficulty, userAnswers, questions } = req.body;

    let correctCount = 0;
    const evaluatedAnswers = (questions || []).map((q, idx) => {
      const userSel = userAnswers ? userAnswers[idx] : 0;
      const isCorrect = userSel === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionText: q.questionText,
        selectedOption: userSel,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || 'Verification of core computer science invariants.',
      };
    });

    const accuracy = Math.round((correctCount / (questions ? questions.length : 1)) * 100);

    const attempt = await QuizAttempt.create({
      studentName: req.user ? req.user.name : 'Aman Sharma',
      studentEmail: req.user ? req.user.email : 'aman.sharma@campushub.edu',
      subject: subject || 'Data Structures',
      difficulty: difficulty || 'Medium',
      score: correctCount,
      totalQuestions: questions ? questions.length : 5,
      accuracyPercentage: accuracy,
      answers: evaluatedAnswers,
    });

    res.status(201).json({
      success: true,
      message: 'Quiz attempt evaluated successfully',
      attempt: {
        id: attempt._id,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        accuracyPercentage: attempt.accuracyPercentage,
        answers: attempt.answers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Student Quiz History
// @route   GET /api/quizzes/history
// @access  Public
export const getQuizHistory = async (req, res) => {
  try {
    let history = await QuizAttempt.find({}).sort({ createdAt: -1 });

    if (history.length === 0) {
      history = [
        {
          _id: 'att_01',
          subject: 'Data Structures',
          difficulty: 'Medium',
          score: 4,
          totalQuestions: 5,
          accuracyPercentage: 80,
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'att_02',
          subject: 'Operating Systems',
          difficulty: 'Hard',
          score: 3,
          totalQuestions: 5,
          accuracyPercentage: 60,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        }
      ];
    }

    res.json({ success: true, count: history.length, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Flashcards Deck for Subject
// @route   GET /api/quizzes/flashcards
// @access  Public
export const getFlashcards = async (req, res) => {
  try {
    const { subject } = req.query;
    const flashcards = generateFlashcardsDeck(subject || 'Data Structures');
    res.json({ success: true, flashcards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
