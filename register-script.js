// ===== REGISTER PAGE FUNCTIONALITY =====

// DOM Elements
const registerForm = document.getElementById('registerForm');
const successModal = document.getElementById('success-modal');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordToggle = document.getElementById('password-toggle');
const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
const passwordStrength = document.getElementById('password-strength');
const strengthFill = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');

// Form validation rules
const validationRules = {
  fullname: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Full name must be at least 2 characters and contain only letters'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  username: {
    required: true,
    minLength: 3,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Username must be at least 3 characters and contain only letters, numbers, and underscores'
  },
  phone: {
    required: false,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
  },
  'confirm-password': {
    required: true,
    match: 'password',
    message: 'Passwords do not match'
  },
  role: {
    required: true,
    message: 'Please select a role'
  },
  terms: {
    required: true,
    message: 'You must agree to the terms and conditions'
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
  initializePasswordStrength();
  initializePasswordToggles();
  initializeSocialButtons();
  addFormAnimations();
});

// ===== FORM INITIALIZATION =====
function initializeForm() {
  if (registerForm) {
    registerForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = registerForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearError(input));
    });
  }
}

// ===== FORM SUBMISSION =====
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  
  // Validate all fields
  const isValid = validateAllFields();
  
  if (isValid) {
    submitForm(data);
  } else {
    showNotification('Please fix the errors before submitting', 'error');
  }
}

async function submitForm(data) {
  const submitBtn = registerForm.querySelector('.register-btn');
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Store auth token
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      // Show success modal
      showSuccessModal();
      
      // Reset form
      registerForm.reset();
      clearAllErrors();
    } else {
      showNotification(result.error || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showNotification('Registration failed. Please try again.', 'error');
  } finally {
    // Reset button
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

// ===== VALIDATION FUNCTIONS =====
function validateAllFields() {
  let isValid = true;
  const inputs = registerForm.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const fieldName = field.id;
  const value = field.value.trim();
  const rules = validationRules[fieldName];
  
  if (!rules) return true;
  
  // Required field check
  if (rules.required && !value) {
    showFieldError(field, rules.message);
    return false;
  }
  
  // Skip other validations if field is empty and not required
  if (!value && !rules.required) {
    clearError(field);
    return true;
  }
  
  // Minimum length check
  if (rules.minLength && value.length < rules.minLength) {
    showFieldError(field, rules.message);
    return false;
  }
  
  // Pattern check
  if (rules.pattern && !rules.pattern.test(value)) {
    showFieldError(field, rules.message);
    return false;
  }
  
  // Password match check
  if (rules.match) {
    const matchField = document.getElementById(rules.match);
    if (matchField && value !== matchField.value) {
      showFieldError(field, rules.message);
      return false;
    }
  }
  
  // Clear error if validation passes
  clearError(field);
  return true;
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
  
  // Add error styling to input
  field.style.borderColor = '#ff6b6b';
  field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
}

function clearError(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
  
  // Remove error styling
  field.style.borderColor = '';
  field.style.boxShadow = '';
}

function clearAllErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(error => {
    error.textContent = '';
    error.classList.remove('show');
  });
  
  const inputs = registerForm.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });
}

// ===== PASSWORD STRENGTH =====
function initializePasswordStrength() {
  if (passwordInput) {
    passwordInput.addEventListener('input', updatePasswordStrength);
  }
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  
  if (password.length === 0) {
    passwordStrength.classList.remove('show');
    return;
  }
  
  passwordStrength.classList.add('show');
  
  const strength = calculatePasswordStrength(password);
  updateStrengthDisplay(strength);
}

function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = '';
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  
  // Determine strength level
  if (score <= 2) {
    return { level: 'weak', percentage: 25, text: 'Weak' };
  } else if (score <= 4) {
    return { level: 'fair', percentage: 50, text: 'Fair' };
  } else if (score <= 5) {
    return { level: 'good', percentage: 75, text: 'Good' };
  } else {
    return { level: 'strong', percentage: 100, text: 'Strong' };
  }
}

function updateStrengthDisplay(strength) {
  strengthFill.className = `strength-fill ${strength.level}`;
  strengthText.textContent = `Password Strength: ${strength.text}`;
}

// ===== PASSWORD TOGGLES =====
function initializePasswordToggles() {
  if (passwordToggle) {
    passwordToggle.addEventListener('click', () => togglePasswordVisibility('password'));
  }
  
  if (confirmPasswordToggle) {
    confirmPasswordToggle.addEventListener('click', () => togglePasswordVisibility('confirm-password'));
  }
}

function togglePasswordVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  const toggle = document.getElementById(`${fieldId}-toggle`);
  const icon = toggle.querySelector('i');
  
  if (field.type === 'password') {
    field.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    field.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ===== SOCIAL BUTTONS =====
function initializeSocialButtons() {
  const googleBtn = document.querySelector('.google-btn');
  const facebookBtn = document.querySelector('.facebook-btn');
  
  if (googleBtn) {
    googleBtn.addEventListener('click', () => handleSocialLogin('google'));
  }
  
  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => handleSocialLogin('facebook'));
  }
}

function handleSocialLogin(provider) {
  showNotification(`Redirecting to ${provider} login...`, 'info');
  
  // Simulate social login
  setTimeout(() => {
    showNotification(`${provider} login would be implemented here`, 'info');
  }, 1000);
}

// ===== SUCCESS MODAL =====
function showSuccessModal() {
  if (successModal) {
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add celebration animation
    createCelebrationEffect();
  }
}

function closeSuccessModal() {
  if (successModal) {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ===== ANIMATIONS =====
function addFormAnimations() {
  // Add staggered animation to form elements
  const formElements = registerForm.querySelectorAll('.input-group, .checkbox-group, .btn');
  formElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
  });
}

function createCelebrationEffect() {
  // Create confetti effect
  for (let i = 0; i < 50; i++) {
    createConfetti();
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${getRandomColor()};
    top: -10px;
    left: ${Math.random() * 100}%;
    z-index: 10000;
    animation: confettiFall 3s linear forwards;
    pointer-events: none;
  `;
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    if (confetti.parentNode) {
      confetti.parentNode.removeChild(confetti);
    }
  }, 3000);
}

function getRandomColor() {
  const colors = ['#ff6b6b', '#4a4be7', '#764ba2', '#ffd700', '#4caf50', '#ff9800'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${getNotificationIcon(type)}"></i>
    <span>${message}</span>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideInRight 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    info: 'info-circle',
    warning: 'exclamation-triangle'
  };
  return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
  const colors = {
    success: 'linear-gradient(135deg, #4CAF50, #45a049)',
    error: 'linear-gradient(135deg, #f44336, #d32f2f)',
    info: 'linear-gradient(135deg, #4a4be7, #764ba2)',
    warning: 'linear-gradient(135deg, #ff9800, #f57c00)'
  };
  return colors[type] || 'linear-gradient(135deg, #4a4be7, #764ba2)';
}

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes confettiFall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(additionalStyles);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    closeSuccessModal();
  }
  
  // Enter key submits form when focused on submit button
  if (e.key === 'Enter' && e.target.classList.contains('register-btn')) {
    registerForm.dispatchEvent(new Event('submit'));
  }
});

// ===== FORM AUTO-SAVE =====
function initializeAutoSave() {
  const inputs = registerForm.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);
      localStorage.setItem('registerFormData', JSON.stringify(data));
    });
  });
  
  // Load saved data on page load
  const savedData = localStorage.getItem('registerFormData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach(key => {
        const field = document.getElementById(key);
        if (field && data[key]) {
          field.value = data[key];
        }
      });
    } catch (e) {
      console.log('No saved form data found');
    }
  }
}

// Initialize auto-save
initializeAutoSave();
