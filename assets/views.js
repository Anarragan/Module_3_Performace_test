// Import UI and logic modules
import { renderUserTable } from '../src/ui.js';
import { openModal, closeModal, fillForm, clearForm } from '../src/modal.js';
import { validateForm } from '../src/validate.js';
import { getUsers, addUser, updateUser, deleteUser } from '../src/api.js';
import { getCurrentUser } from '../src/login.js';

/**
 * Displays the Users View.
 * Only renders admin controls if the logged-in user has admin role.
 */
export function showUsersView() {
  hideAllViews();
  document.getElementById('usersView')?.classList.remove('hidden');

  renderUserTable().then(() => {
    const user = getCurrentUser();
    if (user.role === 'admin') {
      initAdminButtons();
    }
  });
}

/**
 * Displays the Home View.
 */
export function showHomeView() {
  hideAllViews();
  document.getElementById('homeView')?.classList.remove('hidden');
}

/**
 * Hides all views.
 */
function hideAllViews() {
  document.getElementById('usersView')?.classList.add('hidden');
  document.getElementById('homeView')?.classList.add('hidden');
}

/**
 * Initializes admin controls:
 * - Add button
 * - Modal form submission
 * - Edit/Delete user actions
 */
function initAdminButtons() {
  const addBtn = document.getElementById('addBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('userForm');
  const tbody = document.querySelector('tbody');

  // Ensure all elements are available
  if (!addBtn || !closeBtn || !form || !tbody) {
    console.warn('Admin buttons not ready yet');
    return;
  }

  // "Add New Student" button logic
  addBtn.onclick = () => {
    clearForm();
    document.getElementById('modalTitle').textContent = 'Create Event';
    openModal();
  };

  // Close modal button
  closeBtn.onclick = closeModal;

  // Handle clicks on edit/delete buttons inside the table
  tbody.onclick = async (e) => {
    const id = e.target.dataset.id;

    // Edit action  
    if (e.target.classList.contains('edit-btn')) {
      const users = await getUsers();
      const selected = users.find(u => u.id == id);
      if (selected) {
        fillForm(selected);
        document.getElementById('modalTitle').textContent = 'Edit Event';
        openModal();
      }
    }

    // Delete action
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Delete this student?')) {
        await deleteUser(id);
        await renderUserTable();
        initAdminButtons(); // Rebind events after update
      }
    }
  };

  // Form submission (Add or Edit user)
  form.onsubmit = async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        capacity: document.getElementById('capacity').value,
        dateOfAdmission: document.getElementById('dateOfAdmission').value
    };

    const id = document.getElementById('userId').value;

    // Validate input fields
    if (!validateForm(userData)) {
      alert('Please complete all fields correctly.');
      return;
    }

    // Update or Add user depending on form mode
    if (id) {
      await updateUser(id, userData);
    } else {
      await addUser(userData);
    }

    closeModal();
    await renderUserTable();
    initAdminButtons(); // Rebind events after saving
  };
}