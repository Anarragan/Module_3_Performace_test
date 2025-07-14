
// ===== Import Dependencies =====
import { getCurrentUser, login, register, logout } from './login.js';
import { renderUserTable } from './ui.js';
import { getUsers, addUser, updateUser, deleteUser } from './api.js';
import { openModal, closeModal, fillForm, clearForm } from './modal.js';
import { validateForm } from './validate.js';
import { showUsersView, showHomeView } from '../assets/views.js';

// ===== App Initialization =====
document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection');
  const main = document.querySelector('main');
  const sidebar = document.querySelector('aside');
  const modal = document.getElementById('userModal');

  const user = getCurrentUser();

  // ==== Show App After Login ====
  const showApp = () => {
    const currentUser = getCurrentUser();

    loginSection.classList.add('hidden');
    main.classList.remove('hidden');
    sidebar.classList.remove('hidden');

    renderUserTable().then(() => {
      setupAdminButtons(); // Activate admin UI after rendering
    });

    // Admin view
    if (currentUser.role === 'admin') {
      document.getElementById('addBtn').style.display = 'inline-block';
      showUsersView();
      activateMenu('users');
    } else {
      // Regular user view
      document.getElementById('addBtn').style.display = 'none';
      showHomeView();
      activateMenu('home');
    }
  };

  // ==== Initial UI Check ====
  if (!user) {
    loginSection.classList.remove('hidden');
    main.classList.add('hidden');
    sidebar.classList.add('hidden');
    modal.classList.add('hidden');
  } else {
    showApp();
  }

  // ==== Login Form Submission ====
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginResult = await login(email, password);

    if (loginResult) {
      showApp();
    } else {
      document.getElementById('loginError').textContent = 'Incorrect credentials';
    }
  });
  // ==== Register Form Submission ====
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUser = {
      name: document.getElementById('registerName').value.trim(),
      email: document.getElementById('registerEmail').value.trim(),
      password: document.getElementById('registerPassword').value.trim(),
      role: document.getElementById('registerRole').value,
      dateOfAdmission: new Date().toISOString().slice(0, 10)
    };

    const registered = await register(newUser);
    if (registered) {
      console.log('User registered:', registered);
      location.reload(); // Refresh app
    } else {
      console.log(registered)
      document.getElementById('loginError').textContent = 'User already exists';
    }
  });

  // ==== Logout Button ====
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logout());
  }

  // ==== Switch Between Login and Register Forms ====
  document.getElementById('showRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthForms('register');
  });

  document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthForms('login');
  });

  // ==== Sidebar Navigation ====
  document.querySelectorAll('.menu-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      activateMenu(view);

      if (view === 'home') showHomeView();
      else if (view === 'users') showUsersView();
    });
  });

  console.log('Current user:', user);
});

// ===== Toggle Active Sidebar Menu =====
function activateMenu(viewName) {
  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  const selected = document.querySelector(`.menu-item[data-view="${viewName}"]`);
  selected?.classList.add('active');
}

// ===== Toggle Auth Forms =====
function toggleAuthForms(form) {
  document.getElementById('loginForm').classList.toggle('hidden', form === 'register');
  document.getElementById('registerForm').classList.toggle('hidden', form === 'login');
  document.getElementById('loginError').textContent = '';
}

// ===== Admin-Only Button Setup =====
function setupAdminButtons() {
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      clearForm();
      document.getElementById('modalTitle').textContent = 'Add New Student';
      openModal();
    };
  }

  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }

  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.onsubmit = async (e) => {
      e.preventDefault();

      const userData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        capacity: document.getElementById('capacity').value,
        dateOfAdmission: document.getElementById('dateOfAdmission').value
      };

      const id = document.getElementById('userId').value;

      if (!validateForm(userData)) {
        alert('Please complete all fields correctly.');
        return;
      }

      if (id) {
        await updateUser(id, userData);
      } else {
        await addUser(userData);
      }

      closeModal();
      await renderUserTable();
      setupAdminButtons(); // Rebind events after rendering
    };
  }

  const tbody = document.getElementById('userTableBody');
  if (tbody) {
    tbody.onclick = async (e) => {
      const id = e.target.dataset.id;
      if (!id) return;

      // Edit button handler
      if (e.target.classList.contains('edit-btn')) {
        const users = await getUsers();
        const selected = users.find(u => u.id == id);
        if (selected) {
          fillForm(selected);
          document.getElementById('modalTitle').textContent = 'Edit Student';
          openModal();
        }
      }

      // Delete button handler
      if (e.target.classList.contains('delete-btn')) {
        if (confirm('Delete this student?')) {
          await deleteUser(id);
          await renderUserTable();
          setupAdminButtons(); // Rebind again
        }
      }
    };
  }
}