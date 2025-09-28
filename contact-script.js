// ===== CONTACT PAGE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  initializeContactPage();
  addPageAnimations();
  addParticleEffect();
});

function initializeContactPage() {
  // Initialize form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Initialize floating labels
  initializeFloatingLabels();
  
  // Initialize social links
  initializeSocialLinks();
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const submitBtn = e.target.querySelector('.contact-btn');
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    // Reset form
    e.target.reset();
    
    // Show success message
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    
    // Reset button
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }, 2000);
}

function initializeFloatingLabels() {
  const inputs = document.querySelectorAll('.input-container input, .input-container textarea');
  
  inputs.forEach(input => {
    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
    
    // Add focus event
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    // Add blur event
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Add input event for real-time validation
    input.addEventListener('input', function() {
      validateField(this);
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  if (!errorElement) return;
  
  let isValid = true;
  let errorMessage = '';
  
  switch(fieldName) {
    case 'name':
      if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
    case 'subject':
      if (value.length < 5) {
        isValid = false;
        errorMessage = 'Subject must be at least 5 characters';
      }
      break;
    case 'message':
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
      }
      break;
  }
  
  if (isValid) {
    errorElement.textContent = '';
    field.classList.remove('error');
  } else {
    errorElement.textContent = errorMessage;
    field.classList.add('error');
  }
}

function initializeSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Show notification
      const platform = this.classList[1];
      showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
    });
  });
}

function addPageAnimations() {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements
  const elementsToAnimate = document.querySelectorAll('.contact-item, .form-container, .info-container');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
}

function addParticleEffect() {
  const bgAnimation = document.querySelector('.bg-animation');
  if (!bgAnimation) return;
  
  // Add more particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    bgAnimation.appendChild(particle);
  }
}

function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  if (!container) return;
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  container.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
  });
}

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('toggle');
  });
});
