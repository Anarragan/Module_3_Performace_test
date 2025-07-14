export function validateForm(user) {
  const { name, description, capacity, dateOfAdmission } = user;
  return name && description && capacity && dateOfAdmission;
}
