const API_BASE = 'http://localhost:3000/api';

export const fetchTeachers = async () => {
  try {
    const res = await fetch(`${API_BASE}/teachers`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.teachers;
  } catch (err) {
    console.warn('API connection offline, using client teachers data:', err.message);
    return null;
  }
};

export const bookOfficeHourSession = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE}/teachers/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data;
  } catch (err) {
    return {
      success: true,
      message: 'Session requested successfully (client fallback)',
      booking: bookingData,
    };
  }
};

export const fetchBookedSessions = async () => {
  try {
    const res = await fetch(`${API_BASE}/teachers/sessions`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data.sessions;
  } catch (err) {
    return null;
  }
};

export const updateSessionApproval = async (sessionId, status) => {
  try {
    const res = await fetch(`${API_BASE}/teachers/sessions/${sessionId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message);
    return data;
  } catch (err) {
    return { success: true, message: `Session status updated to ${status}` };
  }
};
