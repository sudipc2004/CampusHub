import { retrieveKnowledgeContext } from '../services/doubtSolverService.js';

export const solveDoubt = async (req, res, next) => {
  try {
    const { messages, question } = req.body;
    const query = question || (messages && messages[messages.length - 1]?.content) || '';

    if (!query) {
      return res.status(400).json({
        status: 'fail',
        message: 'A question or message history is required.',
      });
    }

    const { sources, confidence } = retrieveKnowledgeContext(query);

    const answer = `Based on your course notes, here is the solution to your doubt:\n\n` +
      sources.map((s, i) => `[${i + 1}] ${s.snippet}`).join('\n\n') +
      `\n\nHope this helps! Let me know if you need further clarification.`;

    return res.status(200).json({
      status: 'success',
      data: {
        query,
        answer,
        sources,
        confidence,
      },
    });
  } catch (err) {
    next(err);
  }
};
