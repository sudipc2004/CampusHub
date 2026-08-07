/**
 * CampusHub AI Quiz & Flashcard Generator Engine
 * Generates dynamic, randomized MCQs and Flashcards per generation call.
 */

// Helper to shuffle array
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const generateMcqQuestions = (subject = 'Data Structures', difficulty = 'Medium', count = 5) => {
  const QUESTION_TEMPLATES = [
    {
      template: (sub, diff) => `What is the optimal time complexity for operations in ${sub} under ${diff} load conditions?`,
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctAnswer: 1,
      explanation: `Under ${diff} difficulty in ${sub}, divide-and-conquer tree/index partitioning maintains O(log N) average execution complexity.`
    },
    {
      template: (sub) => `Which foundational principle ensures consistency during concurrent executions in ${sub}?`,
      options: ['Linear Probing', 'Structural Invariant Maintenance', 'Garbage Collection', 'Polling Loop'],
      correctAnswer: 1,
      explanation: `Structural invariant maintenance guarantees boundary safety and state validity across operations in ${sub}.`
    },
    {
      template: (sub) => `What is the primary disk access optimization technique applied in ${sub}?`,
      options: ['Multi-way B-Tree Node Storage', 'LIFO Stack Push', 'Bubble Sort Swaps', 'FIFO Queueing'],
      correctAnswer: 0,
      explanation: `Multi-way nodes align with physical block sizes to minimize expensive disk read operations in ${sub}.`
    },
    {
      template: (sub) => `Which collision or conflict resolution mechanism is standard in ${sub}?`,
      options: ['Linear Probing', 'Separate Chaining with Linked Lists', 'Double Hashing', 'Quadratic Probing'],
      correctAnswer: 1,
      explanation: `Separate Chaining appends linked nodes to bucket indices, resolving collisions safely in ${sub}.`
    },
    {
      template: (sub, diff) => `Under ${diff} scenario analysis, what represents the worst-case degradation for ${sub}?`,
      options: ['O(1)', 'O(N log N)', 'O(N²)', 'O(2^N)'],
      correctAnswer: 2,
      explanation: `Unbalanced inputs or bad pivot choices degrade processing to O(N²) worst-case complexity.`
    },
    {
      template: (sub) => `Which property enforces Last-In, First-Out (LIFO) execution order in ${sub}?`,
      options: ['Queue Enqueue', 'Stack Push & Pop', 'Heap Extract-Min', 'Graph BFS'],
      correctAnswer: 1,
      explanation: `Stack operations restrict push and pop actions to the top element, maintaining strict LIFO ordering in ${sub}.`
    },
    {
      template: (sub) => `How does RAG vector context retrieval enhance AI accuracy in ${sub}?`,
      options: ['By ignoring textbook notes', 'By indexing clean note chunks and linking exact page citations', 'By disabling search', 'By guessing randomly'],
      correctAnswer: 1,
      explanation: `RAG retrieves verified chunks directly from uploaded department notes to construct grounded explanations.`
    }
  ];

  // Pick random subset and shuffle options for every generation
  const picked = shuffle(QUESTION_TEMPLATES).slice(0, count);

  return picked.map(q => {
    const originalCorrectText = q.options[q.correctAnswer];
    const shuffledOpts = shuffle(q.options);
    const newCorrectIdx = shuffledOpts.indexOf(originalCorrectText);

    return {
      questionText: q.template(subject, difficulty),
      options: shuffledOpts,
      correctAnswer: newCorrectIdx,
      explanation: q.explanation,
    };
  });
};

export const generateFlashcardsDeck = (subject = 'Data Structures') => {
  const CARD_POOL = [
    { id: `fc_${Date.now()}_1`, term: `${subject} - Invariant Rule`, definition: 'A property that remains true throughout the execution of an algorithm or data structure.' },
    { id: `fc_${Date.now()}_2`, term: `${subject} - Time Complexity`, definition: 'Mathematical representation of algorithm execution time relative to input size N.' },
    { id: `fc_${Date.now()}_3`, term: `${subject} - Spatial Locality`, definition: 'Concept where data items stored near recently accessed memory addresses are likely to be accessed soon.' },
    { id: `fc_${Date.now()}_4`, term: `${subject} - Cache Alignment`, definition: 'Structuring data fields to fit exact CPU cache lines for fast memory reads.' }
  ];

  return shuffle(CARD_POOL);
};
