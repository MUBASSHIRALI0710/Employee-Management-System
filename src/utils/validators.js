/**
 * Form validator utility for employee creation and updates
 */
export const validateEmployee = (formData) => {
  const errors = {};

  // Name validation: required, at least 3 chars
  if (!formData.name || !formData.name.trim()) {
    errors.name = "Full name is required";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  // Role validation: required, at least 2 chars
  if (!formData.role || !formData.role.trim()) {
    errors.role = "Role / Designation is required";
  } else if (formData.role.trim().length < 2) {
    errors.role = "Role must be at least 2 characters long";
  }

  // Email validation: required, valid email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address (e.g., name@company.com)";
  }

  // Phone validation: required, min 7 digits
  const phoneDigits = (formData.phone || "").replace(/\D/g, "");
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Phone number must contain between 7 and 15 digits";
  }

  // Department validation
  if (!formData.department || !formData.department.trim()) {
    errors.department = "Department is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
