// ===== Course API Interface =====
// Base URL for the courses API
const API_URL = 'http://localhost:3000/courses';

/**
 * Fetches all courses from the API.
 * @returns {Promise<Array>} Array of course objects
 */
export async function getCourses() {
  const res = await fetch(API_URL);
  return res.json(); // Convert response to JSON
}

/**
 * Adds a new course to the database.
 * @param {Object} course - New course data
 * @returns {Promise<Object>} The created course object
 */
export async function addCourse(course) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  return res.json();
}

/**
 * Updates an existing course by ID.
 * @param {string|number} id - Course ID to update
 * @param {Object} course - Updated course data
 * @returns {Promise<Object>} The updated course object
 */
export async function updateCourse(id, course) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  return res.json();
}

/**
 * Deletes a course by ID.
 * @param {string|number} id - Course ID to delete
 * @returns {Promise<Response>} Fetch response
 */
export async function deleteCourse(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}