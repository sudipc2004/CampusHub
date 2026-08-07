const API_BASE = 'http://localhost:3000/api';

export const fetchStudyGroups = async () => {
  try {
    const res = await fetch(`${API_BASE}/social/groups`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.groups;
  } catch (err) {
    return null;
  }
};

export const createStudyGroupApi = async (groupPayload) => {
  try {
    const res = await fetch(`${API_BASE}/social/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupPayload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.group;
  } catch (err) {
    return null;
  }
};

export const postGroupMessageApi = async (groupId, text) => {
  try {
    const res = await fetch(`${API_BASE}/social/groups/${groupId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.message;
  } catch (err) {
    return null;
  }
};

export const fetchLeaderboardApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/social/leaderboard`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.leaderboard;
  } catch (err) {
    return null;
  }
};
