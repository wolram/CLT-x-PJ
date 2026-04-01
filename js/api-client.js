// API client for cltxpj.app.br
const API_BASE = window.API_BASE_URL || '/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Public API functions
export async function submitWaitlist(data) {
  return apiRequest('/submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function trackEvent(eventType, eventData = {}) {
  return apiRequest('/telemetry', {
    method: 'POST',
    body: JSON.stringify({ event_type: eventType, event_data: eventData }),
  });
}

// Admin API functions
export async function adminLogin(username, password) {
  const credentials = btoa(`${username}:${password}`);
  return { authHeader: `Basic ${credentials}` };
}

export async function adminGetSubmissions(authHeader, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/admin/submissions${queryString ? '?' + queryString : ''}`, {
    headers: { Authorization: authHeader },
  });
}

export async function adminUpdateSubmissionStatus(authHeader, id, status) {
  return apiRequest(`/admin/submissions/${id}/status`, {
    method: 'PATCH',
    headers: { Authorization: authHeader },
    body: JSON.stringify({ activation_status: status }),
  });
}

export async function adminDeleteSubmission(authHeader, id) {
  return apiRequest(`/admin/submissions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: authHeader },
  });
}

export async function adminGetTelemetrySummary(authHeader) {
  return apiRequest('/admin/telemetry/summary', {
    headers: { Authorization: authHeader },
  });
}

export async function checkHealth() {
  return apiRequest('/health');
}
