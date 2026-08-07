import { generateRagAnswer, searchSemanticVectors, getVectorStoreStats } from '../services/ragService.js';

// @desc    RAG Doubt Solving Endpoint
// @route   POST /api/rag/ask
// @access  Public
export const askAiTutor = async (req, res) => {
  try {
    const { query, subject } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Question query is required' });
    }

    const ragResult = await generateRagAnswer(query, subject);

    res.json({
      success: true,
      data: ragResult,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Semantic Search across indexed vector notes
// @route   POST /api/rag/search
// @access  Public
export const searchSemantic = async (req, res) => {
  try {
    const { query, subject } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const matches = searchSemanticVectors(query, subject, 5);

    res.json({
      success: true,
      query,
      matchCount: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Vector DB Collection Statistics & Metadata
// @route   GET /api/rag/stats
// @access  Public
export const getVectorStats = async (req, res) => {
  try {
    const stats = getVectorStoreStats();
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
