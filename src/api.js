// ===== Base API URL =====
const API_URL = 'http://localhost:3000/users';

/**
 * Fetches all users from the API.
 * @returns {Promise<Array>} Array of user objects
 */
export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json(); // Parse JSON response
}

/**
 * Adds a new user to the database.
 * @param {Object} user - New user data
 * @returns {Promise<Object>} Created user object
 */
export async function addUser(user) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return res.json(); // Return the created user
}

/**
 * Updates an existing user by ID.
 * @param {string|number} id - ID of the user to update
 * @param {Object} user - Updated user data
 * @returns {Promise<Response>} Fetch response object
 */
export async function updateUser(id, user) {
  console.log('Updating user ID =', id, user); // Debug message
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
}

/**
 * Deletes a user by ID.
 * @param {string|number} id - ID of the user to delete
 * @returns {Promise<Response>} Fetch response object
 */
export async function deleteUser(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}