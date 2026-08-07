import {
  runTeacherRecAgent,
  runWeakTopicAgent,
  runStudyRecAgent,
  runRevisionPlannerAgent,
  runExamPredictorAgent,
  runLearningInsightsAgent,
} from '../services/agentSuiteService.js';

export const getTeacherRec = async (req, res) => {
  try {
    const { subject, confidenceScore } = req.query;
    const result = runTeacherRecAgent(subject, Number(confidenceScore) || 52);
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWeakTopics = async (req, res) => {
  try {
    const result = runWeakTopicAgent(req.user ? req.user.email : 'aman@campushub.edu');
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudyRec = async (req, res) => {
  try {
    const { subject } = req.query;
    const result = runStudyRecAgent(subject || 'Data Structures');
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRevisionPlanner = async (req, res) => {
  try {
    const result = runRevisionPlannerAgent(14);
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExamPredictor = async (req, res) => {
  try {
    const result = runExamPredictorAgent('Computer Science', 6);
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLearningInsights = async (req, res) => {
  try {
    const result = runLearningInsightsAgent(req.user ? req.user.email : 'aman@campushub.edu');
    res.json({ success: true, agent: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
