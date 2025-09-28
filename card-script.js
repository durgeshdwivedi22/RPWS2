// ===== CARD PAGE FUNCTIONALITY =====

// DOM Elements
const cards = document.querySelectorAll('.card');
const rateButtons = document.querySelectorAll('.rate-btn');
const detailsButtons = document.querySelectorAll('.details-btn');
const ratingModal = document.getElementById('rating-modal');
const closeRatingBtn = document.getElementById('close-rating');
const starRating = document.querySelectorAll('.star-rating .star');
const submitRatingBtn = document.querySelector('.submit-rating');
const ratingComment = document.getElementById('rating-comment');

// Chart instances
const charts = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeCards();
  initializeCharts();
  initializeEventListeners();
  addCardAnimations();
});

// ===== CARD INITIALIZATION =====
function initializeCards() {
  cards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.querySelector('.avatar').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.querySelector('.avatar').style.transform = 'scale(1)';
    });
  });
}

// ===== CHART INITIALIZATION =====
function initializeCharts() {
  const participants = [
    { name: 'durgesh', data: [4.2, 4.5, 4.7, 4.8, 4.9] },
    { name: 'amit', data: [4.0, 4.2, 4.4, 4.5, 4.6] },
    { name: 'anupam', data: [4.3, 4.5, 4.6, 4.7, 4.8] },
    { name: 'aman', data: [3.8, 4.0, 4.2, 4.3, 4.5] },
    { name: 'alok', data: [3.9, 4.1, 4.2, 4.3, 4.4] },
    { name: 'ishan', data: [4.1, 4.3, 4.5, 4.6, 4.7] },
    { name: 'pankaj', data: [3.7, 3.9, 4.1, 4.2, 4.3] },
    { name: 'aditya', data: [3.8, 4.0, 4.1, 4.2, 4.2] }
  ];
  
  participants.forEach(participant => {
    const canvas = document.getElementById(`ratingChart-${participant.name}`);
    if (canvas) {
      createChart(canvas, participant.data, participant.name);
    }
  });
}

function createChart(canvas, data, name) {
  const ctx = canvas.getContext('2d');
  
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
      label: 'Rating Progress',
      data: data,
      borderColor: '#4a4be7',
      backgroundColor: 'rgba(74, 75, 231, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4a4be7',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };
  
  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            color: '#666',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#666',
            font: {
              size: 12
            }
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  };
  
  charts[name] = new Chart(ctx, config);
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
  // Rate button clicks
  rateButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const participant = this.dataset.participant;
      openRatingModal(participant);
    });
  });
  
  // Details button clicks
  detailsButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const participant = this.dataset.participant;
      showParticipantDetails(participant);
    });
  });
  
  // Close rating modal
  if (closeRatingBtn) {
    closeRatingBtn.addEventListener('click', closeRatingModal);
  }
  
  // Star rating interaction
  starRating.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.dataset.rating);
      setStarRating(rating);
    });
    
    star.addEventListener('mouseenter', function() {
      const rating = parseInt(this.dataset.rating);
      highlightStars(rating);
    });
  });
  
  // Submit rating
  if (submitRatingBtn) {
    submitRatingBtn.addEventListener('click', submitRating);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === ratingModal) {
      closeRatingModal();
    }
  });
}

// ===== RATING MODAL =====
function openRatingModal(participant) {
  const card = document.querySelector(`[data-name="${participant}"]`);
  const avatar = card.querySelector('.avatar').src;
  const name = card.querySelector('h3').textContent;
  
  document.getElementById('modal-avatar').src = avatar;
  document.getElementById('modal-name').textContent = name;
  
  ratingModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Reset rating
  setStarRating(0);
  ratingComment.value = '';
}

function closeRatingModal() {
  ratingModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function setStarRating(rating) {
  starRating.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function highlightStars(rating) {
  starRating.forEach((star, index) => {
    if (index < rating) {
      star.style.color = '#ffd700';
    } else {
      star.style.color = '#ddd';
    }
  });
}

function submitRating() {
  const activeStars = document.querySelectorAll('.star-rating .star.active');
  const rating = activeStars.length;
  const comment = ratingComment.value;
  
  if (rating === 0) {
    showNotification('Please select a rating!', 'error');
    return;
  }
  
  // Show loading state
  submitRatingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitRatingBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    showNotification(`Rating submitted successfully! (${rating}/5 stars)`, 'success');
    closeRatingModal();
    
    // Reset button
    submitRatingBtn.innerHTML = 'Submit Rating';
    submitRatingBtn.disabled = false;
  }, 1500);
}

// ===== PARTICIPANT DETAILS =====
function showParticipantDetails(participant) {
  const card = document.querySelector(`[data-name="${participant}"]`);
  const name = card.querySelector('h3').textContent;
  const rating = card.querySelector('.rating-score').textContent;
  
  showNotification(`Details for ${name} (Rating: ${rating})`, 'info');
  
  // Add a pulse effect to the card
  card.classList.add('pulse');
  setTimeout(() => {
    card.classList.remove('pulse');
  }, 1000);
}

// ===== ANIMATIONS =====
function addCardAnimations() {
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${getNotificationIcon(type)}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
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

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    closeRatingModal();
  }
  
  // R key opens rating modal for first participant
  if (e.key === 'r' || e.key === 'R') {
    const firstRateBtn = document.querySelector('.rate-btn');
    if (firstRateBtn) {
      firstRateBtn.click();
    }
  }
});

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
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .pulse {
    animation: pulse 0.6s ease;
  }
`;
document.head.appendChild(additionalStyles);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
