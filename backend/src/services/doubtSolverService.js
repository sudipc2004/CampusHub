// Mock knowledge base retrieval service for doubt solver
export function retrieveKnowledgeContext(query) {
  // Mock knowledge sources based on query
  const mockSources = [
    {
      title: "Data Structures & Algorithms - Notes",
      subject: "Computer Science",
      page: 42,
      snippet: "Binary search trees maintain sorted keys for fast O(log n) search, insertion, and deletion operations."
    },
    {
      title: "Operating Systems Principles",
      subject: "Computer Science",
      page: 108,
      snippet: "Deadlocks occur when processes enter a mutual waiting state where each holds a resource requested by another."
    }
  ];

  return {
    sources: mockSources,
    confidence: 0.92
  };
}
