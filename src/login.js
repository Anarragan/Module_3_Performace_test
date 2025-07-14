// ===== Login API & Auth Logic =====
const API_URL = 'http://localhost:3001/users';

/**
 * Attempts to log in a user with the given credentials.
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object|null>} Authenticated user or null if failed
 */
export async function login(email, password) {
  
  const res = await fetch(`${API_URL}?email=${email}`);
  const users = await res.json();

  // Find user with matching password (no hashing for simplicity)
  const user = users.find(u => u.password === password);

  if (user) {
    // Store session data
    localStorage.setItem('Auth', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  return null; // Login failed
}

/**
 * Registers a new user if the email is not already taken.
 * @param {Object} newUser - New user data
 * @returns {Promise<Object|null>} Created user or null if email already exists
 */
export async function register(newUser) {
  const existingRes = await fetch(`${API_URL}?email=${newUser.email}`);
  const existing = await existingRes.json();

  // Prevent duplicate email registration
  if (existing.length > 0) return null;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });

  const created = await res.json();

  // Automatically log in the user after registration
  localStorage.setItem('Auth', 'true');
  localStorage.setItem('user', JSON.stringify(created));

  return created;
}

/**
 * Logs out the current user and reloads the page.
 */
export function logout() {
  localStorage.removeItem('Auth');
  localStorage.removeItem('user');
  window.location.reload(); // Reload to reset app state
}

/**
 * Gets the currently logged-in user from localStorage.
 * @returns {Object|null} User object or null if not authenticated
 */
export function getCurrentUser() {
  const auth = localStorage.getItem('Auth');
  if (auth !== 'true') return null;

  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}