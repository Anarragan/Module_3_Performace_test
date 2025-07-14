/**
 * Displays the modal by adding the "show" class.
 */
export function openModal() {
  const modal = document.getElementById('userModal');
  if (modal) {
    modal.classList.add('show');  // <-- esta clase activa el modal visualmente
  }
}

/**
 * Hides the modal by removing the "show" class.
 */
export function closeModal() {
  const modal = document.getElementById('userModal');
  modal.classList.remove('show'); // Hide the modal
}

/**
 * Populates the form fields with a user's data (used for editing).
 * @param {Object} user - The user object with data to fill the form
 */
export function fillForm(user) {
  console.log("Filling form with:", user);
  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('phone').value = user.phone;
  document.getElementById('enrollNumber').value = user.enrollNumber;
  document.getElementById('dateOfAdmission').value = user.dateOfAdmission;
}

/**
 * Clears the form fields (used for creating a new user).
 */
export function clearForm() {
  document.getElementById('userId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('enrollNumber').value = '';
  document.getElementById('dateOfAdmission').value = '';
}