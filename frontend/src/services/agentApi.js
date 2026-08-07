const API_BASE = 'http://localhost:3000/api';

export const fetchExamPredictorApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/agents/exam-predictor`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.agent;
  } catch (err) {
    return null;
  }
};

export const fetchRevisionPlannerApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/agents/revision-planner`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.agent;
  } catch (err) {
    return null;
  }
};

export const fetchLearningInsightsApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/agents/learning-insights`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.agent;
  } catch (err) {
    return null;
  }
};

export const fetchWeakTopicsApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/agents/weak-topics`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.agent;
  } catch (err) {
    return null;
  }
};
