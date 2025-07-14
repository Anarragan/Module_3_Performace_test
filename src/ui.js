// ===== Imports =====
import { getUsers } from './api.js';
import { getCurrentUser } from './login.js';

/**
 * Renders the user table dynamically based on the current user's role.
 * - Admins can see and use edit/delete buttons.
 * - Regular users only see the basic data.
 */
export async function renderUserTable() {
  const users = await getUsers(); // Fetch all users from API
  const tbody = document.querySelector('tbody'); // Table body element
  tbody.innerHTML = ''; // Clear any previous rows

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  // Create a table row for each user
  users.forEach(user => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><img src="../assets/imgs/events.jpg" class="avatar"></td>
      <td>${user.name}</td>
      <td>${user.description}</td>
      <td>${user.capacity}</td>
      <td>${user.dateOfAdmission}</td>
      <td>
        ${isAdmin ? `
          <button class="edit-btn" data-id="${user.id}">✏️</button>
          <button class="delete-btn" data-id="${user.id}">🗑️</button>
        ` : ''}
      </td>
    `;

    tbody.appendChild(row);
  });
}