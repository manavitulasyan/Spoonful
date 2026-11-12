const API_BASE_URL = 'http://127.0.0.1:8000';

// Make requests to the FastAPI backend.
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('spoonful_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || 'Something went wrong. Please try again.'
    );
  }

  return data;
}

// Register a new user.
export function registerUser(userData) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// Log in an existing user.
export async function loginUser(credentials) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  localStorage.setItem('spoonful_token', data.access_token);

  return data;
}

// Get the currently logged-in user.
export function getCurrentUser() {
  return apiRequest('/auth/me');
}

// Log out.
export function logoutUser() {
  localStorage.removeItem('spoonful_token');
}

// Get the current user's saved foods.
export function getSavedFoods() {
  return apiRequest('/saved-foods/');
}

// Add a food to the current user's saved foods.
export function addSavedFood(foodData) {
  return apiRequest('/saved-foods/', {
    method: 'POST',
    body: JSON.stringify(foodData),
  });
}
// Delete a food from the current user's saved foods.
export function deleteSavedFood(foodId) {
  return apiRequest(`/saved-foods/${foodId}`, {
    method: 'DELETE',
  });
}
// Get the current user's journal entries.
export function getJournalEntries() {
  return apiRequest('/journal/');
}

// Create a journal entry.
export function createJournalEntry(entryData) {
  return apiRequest('/journal/', {
    method: 'POST',
    body: JSON.stringify(entryData),
  });
}

// Update a journal entry.
export function updateJournalEntry(entryId, entryData) {
  return apiRequest(`/journal/${entryId}`, {
    method: 'PATCH',
    body: JSON.stringify(entryData),
  });
}

// Delete a journal entry.
export function deleteJournalEntry(entryId) {
  return apiRequest(`/journal/${entryId}`, {
    method: 'DELETE',
  });
}
// Get the current user's sensory preferences.
export function getPreferences() {
  return apiRequest('/preferences/');
}

// Create the current user's sensory preferences.
export function createPreferences(preferenceData) {
  return apiRequest('/preferences/', {
    method: 'POST',
    body: JSON.stringify(preferenceData),
  });
}

// Update the current user's sensory preferences.
export function updatePreferences(preferenceData) {
  return apiRequest('/preferences/', {
    method: 'PATCH',
    body: JSON.stringify(preferenceData),
  });
}
// Get the user's profile.
export function getProfile() {
  return apiRequest('/users/me');
}

// Update the user's profile.
export function updateProfile(profileData) {
  return apiRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
}