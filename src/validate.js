
export function validateForm(user) {
  const { name, email, phone, enrollNumber, dateOfAdmission } = user;
  return name && email && phone && enrollNumber && dateOfAdmission;
}
