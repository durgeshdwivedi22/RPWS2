// ===== DOM ELEMENTS =====
 const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
const ratingsModal = document.getElementById("ratings-modal");
const participantsModal = document.getElementById("participants-modal");
const graphModal = document.getElementById("graph-modal");
const contactModal = document.getElementById("contact-modal");
const closeRatings = document.getElementById("close-ratings");
const closeParticipants = document.getElementById("close-participants");
const closeGraph = document.getElementById("close-graph");
const closeContact = document.getElementById("close-contact");
const openRatings = document.getElementById("omodel-content");
const openParticipants = document.querySelector('a[href="#participants"]');
const openGraph = document.getElementById("open-graph");
const openContact = document.querySelector('a[href="contact.html"]');
const openWinner = document.querySelector('a[href="#winner"]');

// ===== PAGE TRANSITION VARIABLES =====
let currentPage = 'index';
let isTransitioning = false;

// Chart instance
let mainChart = null;

// ===== MODAL FUNCTIONALITY =====
function openModal(modal) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  // Add animation
  modal.querySelector('.modal-content').style.animation = "modalSlideIn 0.3s ease";
}

function closeModal(modal) {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// ===== PAGE TRANSITION FUNCTIONALITY =====
function slideToPage(pageName) {
  if (isTransitioning || currentPage === pageName) return;
  
  isTransitioning = true;
  const body = document.body;
  
  // Add slide-out animation
  body.classList.add('slide-out-left');
  
  setTimeout(() => {
    // Load new page content
    loadPageContent(pageName);
    
    // Add slide-in animation
    body.classList.remove('slide-out-left');
    body.classList.add('slide-in-right');
    
    setTimeout(() => {
      body.classList.remove('slide-in-right');
      isTransitioning = false;
    }, 500);
  }, 300);
}

async function loadPageContent(pageName) {
  try {
    let content = '';
    
    switch(pageName) {
      case 'register':
        // Navigate to register page
        window.location.href = 'ragister.html';
        return;
      case 'participants':
        // Navigate to participants page
        window.location.href = 'card.html';
        return;
      case 'contact':
        // Navigate to contact page
        window.location.href = 'contact.html';
        return;
      case 'winner':
        content = generateWinnerPage();
        break;
      default:
        // Stay on current page
        isTransitioning = false;
        return;
    }
    
    if (content) {
      // Update page content for winner page
      document.body.innerHTML = content;
      
      // Re-initialize scripts for the new page
      initializePageScripts(pageName);
      
      currentPage = pageName;
    }
  } catch (error) {
    console.error('Error loading page:', error);
    showNotification('Failed to load page', 'error');
    isTransitioning = false;
  }
}

function showWinnerModal() {
  // Create winner modal if it doesn't exist
  let winnerModal = document.getElementById('winner-modal');
  if (!winnerModal) {
    winnerModal = document.createElement('div');
    winnerModal.id = 'winner-modal';
    winnerModal.className = 'modal';
    winnerModal.innerHTML = `
      <div class="modal-content winner-modal-content">
        <span class="close-btn" id="close-winner">&times;</span>
        <div class="winner-page">
          <div class="particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
          </div>
          
          <div class="winner-container">
            <div class="winner-glow"></div>
            
            <div class="crown-section">
              <div class="crown">👑</div>
              <div class="crown-rays"></div>
            </div>
            
            <img src="WhatsApp Image 2025-05-25 at 11.27.19_18a41e73.jpg" alt="Durgesh" class="winner-image">
            
            <h1 class="winner-name">Durgesh</h1>
            <p class="winner-role">Organizer & Team Leader</p>
            
            <div class="winner-stats">
              <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-star"></i></div>
                <div class="stat-value">4.9</div>
                <div class="stat-label">Average Rating</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-trophy"></i></div>
                <div class="stat-value">5</div>
                <div class="stat-label">Achievements</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-users"></i></div>
                <div class="stat-value">127</div>
                <div class="stat-label">Total Votes</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-fire"></i></div>
                <div class="stat-value">Hot</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            
            <div class="achievements">
              <h3>🏆 Achievements</h3>
              <div class="achievement-grid">
                <div class="achievement-item">
                  <div class="achievement-icon"><i class="fas fa-medal"></i></div>
                  <div class="achievement-text">Top Performer</div>
                </div>
                <div class="achievement-item">
                  <div class="achievement-icon"><i class="fas fa-star"></i></div>
                  <div class="achievement-text">5-Star Rating</div>
                </div>
                <div class="achievement-item">
                  <div class="achievement-icon"><i class="fas fa-crown"></i></div>
                  <div class="achievement-text">Team Leader</div>
                </div>
                <div class="achievement-item">
                  <div class="achievement-icon"><i class="fas fa-fire"></i></div>
                  <div class="achievement-text">Hot Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(winnerModal);
    
    // Add event listener for close button
    const closeWinner = document.getElementById('close-winner');
    if (closeWinner) {
      closeWinner.addEventListener('click', () => {
        closeModal(winnerModal);
      });
    }
  }
  
  // Show the modal
  openModal(winnerModal);
}

function generateWinnerPage() {
  return `
    <div class="winner-page">
      <a href="#" class="back-btn" onclick="goBack()">
        <i class="fas fa-arrow-left"></i>
        Back to Dashboard
      </a>
      
      <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
      
      <div class="winner-container">
        <div class="winner-glow"></div>
        
        <div class="crown-section">
          <div class="crown">👑</div>
          <div class="crown-rays"></div>
        </div>
        
        <img src="WhatsApp Image 2025-05-25 at 11.27.19_18a41e73.jpg" alt="Durgesh" class="winner-image">
        
        <h1 class="winner-name">Durgesh</h1>
        <p class="winner-role">Organizer & Team Leader</p>
        
        <div class="winner-stats">
          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-star"></i></div>
            <div class="stat-value">4.9</div>
            <div class="stat-label">Average Rating</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-trophy"></i></div>
            <div class="stat-value">5</div>
            <div class="stat-label">Achievements</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-users"></i></div>
            <div class="stat-value">127</div>
            <div class="stat-label">Total Votes</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-fire"></i></div>
            <div class="stat-value">Hot</div>
            <div class="stat-label">Status</div>
          </div>
        </div>
        
        <div class="achievements">
          <h3>🏆 Achievements</h3>
          <div class="achievement-grid">
            <div class="achievement-item">
              <div class="achievement-icon"><i class="fas fa-medal"></i></div>
              <div class="achievement-text">Top Performer</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon"><i class="fas fa-star"></i></div>
              <div class="achievement-text">5-Star Rating</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon"><i class="fas fa-crown"></i></div>
              <div class="achievement-text">Team Leader</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon"><i class="fas fa-fire"></i></div>
              <div class="achievement-text">Hot Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initializePageScripts(pageName) {
  // Re-initialize scripts based on the current page
  switch(pageName) {
    case 'register':
      // Initialize register page scripts
      if (typeof initializeRegisterForm === 'function') {
        initializeRegisterForm();
      }
      break;
    case 'participants':
      // Initialize card page scripts
      if (typeof initializeCardScripts === 'function') {
        initializeCardScripts();
      }
      break;
    case 'contact':
      // Initialize contact page scripts
      if (typeof initializeContactPage === 'function') {
        initializeContactPage();
      }
      break;
    case 'winner':
      // Winner page is self-contained
      break;
    default:
      // Initialize main page scripts
      initializeMainPage();
  }
}

function initializeMainPage() {
  // Re-initialize main page functionality
  createRatingSystem();
  initializeActionButtons();
  addScrollAnimations();
  updateLeaderboard();
  initializeContactForm();
  addParticleEffect();
  loadData();
}

function goBack() {
  slideToPage('index');
}

// ===== EVENT LISTENERS =====
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
  });
}

// Ratings modal
if (openRatings && ratingsModal) {
  openRatings.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(ratingsModal);
  });
}

if (closeRatings && ratingsModal) {
  closeRatings.addEventListener("click", () => {
    closeModal(ratingsModal);
  });
}

// Participants page navigation
if (openParticipants) {
  openParticipants.addEventListener("click", (e) => {
    e.preventDefault();
    // Add transition effect before navigation
    document.body.classList.add('slide-out-left');
    setTimeout(() => {
      window.location.href = 'card.html';
    }, 300);
  });
}

// Graph modal
if (openGraph && graphModal) {
  openGraph.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(graphModal);
    initializeChart();
  });
}

if (closeGraph && graphModal) {
  closeGraph.addEventListener("click", () => {
    closeModal(graphModal);
  });
}

// Contact page navigation
if (openContact) {
  openContact.addEventListener("click", (e) => {
    e.preventDefault();
    // Add transition effect before navigation
    document.body.classList.add('slide-out-left');
    setTimeout(() => {
      window.location.href = 'contact.html';
    }, 300);
  });
}

// Winner page navigation - show as modal instead
if (openWinner) {
  openWinner.addEventListener("click", (e) => {
    e.preventDefault();
    showWinnerModal();
  });
}

// Register page navigation
const openRegister = document.querySelector('a[href="ragister.html"]');
if (openRegister) {
  openRegister.addEventListener("click", (e) => {
    e.preventDefault();
    // Add transition effect before navigation
    document.body.classList.add('slide-out-left');
    setTimeout(() => {
      window.location.href = 'ragister.html';
    }, 300);
  });
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
});

// ===== ANIMATION EFFECTS =====
// Add hover effects to participant cards
document.addEventListener('DOMContentLoaded', function() {
  const participantCards = document.querySelectorAll('.participant-card');
  participantCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// ===== STATISTICS ANIMATION =====
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-content h3');
  statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    const isDecimal = finalValue.includes('.');
    const targetValue = parseFloat(finalValue);
    let currentValue = 0;
    const increment = targetValue / 50;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      stat.textContent = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);
    }, 30);
  });
}

// ===== PROGRESS BAR ANIMATION =====
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// ===== RATING SYSTEM =====
function createRatingSystem() {
  const participantCards = document.querySelectorAll('.participant-card');
  
  participantCards.forEach(card => {
    const ratingContainer = card.querySelector('.rating');
    if (ratingContainer) {
      // Add click functionality to stars
      const stars = ratingContainer.querySelector('.stars');
      if (stars) {
        stars.style.cursor = 'pointer';
        stars.addEventListener('click', function() {
          // Add a simple rating animation
          this.style.transform = 'scale(1.2)';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 200);
        });
      }
    }
  });
}

// ===== ACTION BUTTONS =====
function initializeActionButtons() {
  const rateButton = document.getElementById('rate-participant');
  const graphButton = document.getElementById('view-graph');
  const exportButton = document.getElementById('export-data');
  
  if (rateButton) {
    rateButton.addEventListener('click', function() {
      // Show a simple alert for now - can be expanded
      alert('Rating system would open here!');
      this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
      setTimeout(() => {
        this.style.background = 'linear-gradient(135deg, #4a4be7, #764ba2)';
      }, 2000);
    });
  }
  
  if (graphButton) {
    graphButton.addEventListener('click', function() {
      alert('Graph view would open here!');
    });
  }
  
  if (exportButton) {
    exportButton.addEventListener('click', function() {
      alert('Data export would start here!');
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all columns
  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    column.style.opacity = '0';
    column.style.transform = 'translateY(30px)';
    column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(column);
  });
}

// ===== LEADERBOARD UPDATES =====
function updateLeaderboard() {
  const leaderboardItems = document.querySelectorAll('.leaderboard-item');
  
  leaderboardItems.forEach((item, index) => {
    // Add a subtle animation delay
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'slideInFromLeft 0.5s ease forwards';
  });
}

// Add CSS animation for leaderboard
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

// ===== CHART FUNCTIONALITY =====
function initializeChart() {
  const ctx = document.getElementById('mainChart');
  if (!ctx) return;
  
  // Destroy existing chart
  if (mainChart) {
    mainChart.destroy();
  }
  
  const chartData = {
    labels: ['Durgesh', 'Anupam', 'Ishan', 'Amit', 'Aman', 'Alok', 'Pankaj', 'Aditya'],
    datasets: [{
      label: 'Ratings',
      data: [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2],
      backgroundColor: [
        'rgba(74, 75, 231, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(255, 107, 107, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(40, 167, 69, 0.8)',
        'rgba(23, 162, 184, 0.8)',
        'rgba(220, 53, 69, 0.8)',
        'rgba(108, 117, 125, 0.8)'
      ],
      borderColor: [
        'rgba(74, 75, 231, 1)',
        'rgba(118, 75, 162, 1)',
        'rgba(255, 107, 107, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(40, 167, 69, 1)',
        'rgba(23, 162, 184, 1)',
        'rgba(220, 53, 69, 1)',
        'rgba(108, 117, 125, 1)'
      ],
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }]
  };
  
  const config = {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Participant Ratings Overview',
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#4a4be7'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 0.5,
            color: '#666'
          },
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          ticks: {
            color: '#666'
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  };
  
  mainChart = new Chart(ctx, config);
  
  // Add chart control functionality
  initializeChartControls();
}

function initializeChartControls() {
  const graphBtns = document.querySelectorAll('.graph-btn');
  
  graphBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      graphBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const chartType = this.dataset.chart;
      updateChart(chartType);
    });
  });
}

function updateChart(type) {
  if (!mainChart) return;
  
  const ctx = mainChart.ctx;
  const data = mainChart.data;
  
  switch(type) {
    case 'ratings':
      data.datasets[0].data = [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2];
      data.datasets[0].label = 'Ratings';
      mainChart.options.plugins.title.text = 'Participant Ratings Overview';
      mainChart.config.type = 'bar';
      break;
    case 'progress':
      data.datasets[0].data = [95, 88, 85, 82, 78, 75, 72, 68];
      data.datasets[0].label = 'Progress %';
      mainChart.options.plugins.title.text = 'Progress Tracking';
      mainChart.config.type = 'line';
      break;
    case 'comparison':
      data.datasets[0].data = [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2];
      data.datasets[0].label = 'Current vs Previous';
      mainChart.options.plugins.title.text = 'Performance Comparison';
      mainChart.config.type = 'doughnut';
      break;
  }
  
  mainChart.update('active');
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.contact-btn');
    const formData = new FormData(this);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message')
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Reset form
        this.reset();
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Close modal
        closeModal(contactModal);
      } else {
        showNotification(result.error || 'Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #4a4be7, #764ba2)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ===== ENHANCED ANIMATIONS =====
function addParticleEffect() {
  const particles = document.createElement('div');
  particles.className = 'particles';
  particles.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  
  document.body.appendChild(particles);
  
  // Create floating particles
  for (let i = 0; i < 50; i++) {
    createParticle(particles);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(74, 75, 231, 0.3);
    border-radius: 50%;
    animation: float ${Math.random() * 10 + 10}s infinite linear;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
  `;
  
  container.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
      createParticle(container); // Create new particle
    }
  }, (Math.random() * 10 + 10) * 1000);
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes float {
    0% { transform: translateY(100vh) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
  }
  
  .notification {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
  }
`;
document.head.appendChild(animationStyles);

// ===== BACKEND INTEGRATION =====
let participantsData = [];
let statisticsData = {};

// Load data from backend
async function loadData() {
  try {
    // Load participants
    const participantsResponse = await fetch('/api/participants');
    if (participantsResponse.ok) {
      participantsData = await participantsResponse.json();
      updateParticipantsDisplay();
    }

    // Load statistics
    const statsResponse = await fetch('/api/statistics');
    if (statsResponse.ok) {
      statisticsData = await statsResponse.json();
      updateStatisticsDisplay();
    }

    // Load leaderboard
    const leaderboardResponse = await fetch('/api/leaderboard');
    if (leaderboardResponse.ok) {
      const leaderboardData = await leaderboardResponse.json();
      updateLeaderboardDisplay(leaderboardData);
    }
  } catch (error) {
    console.error('Error loading data:', error);
    showNotification('Failed to load data. Using offline mode.', 'warning');
  }
}

// Update participants display with real data
function updateParticipantsDisplay() {
  const participantsGrid = document.querySelector('.participants-grid');
  if (!participantsGrid || !participantsData.length) return;

  // Update participant cards with real data
  participantsData.forEach((participant, index) => {
    const card = participantsGrid.children[index];
    if (card) {
      // Update name
      const nameElement = card.querySelector('h3');
      if (nameElement) nameElement.textContent = participant.name;

      // Update rating
      const scoreElement = card.querySelector('.rating-details .score');
      if (scoreElement) scoreElement.textContent = participant.rating;

      // Update votes
      const votesElement = card.querySelector('.rating-details .votes');
      if (votesElement) votesElement.textContent = `(${participant.votes} votes)`;

      // Update status
      const statusElement = card.querySelector('.status-indicator');
      if (statusElement) {
        statusElement.className = `status-indicator ${participant.status}`;
      }

      // Update stars
      const stars = card.querySelectorAll('.rating-section .star');
      const rating = Math.floor(participant.rating);
      stars.forEach((star, i) => {
        if (i < rating) {
          star.classList.add('filled');
        } else {
          star.classList.remove('filled');
        }
      });
    }
  });
}

// Update statistics display
function updateStatisticsDisplay() {
  if (!statisticsData) return;

  // Update stat cards
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length >= 3) {
    statCards[0].querySelector('h3').textContent = statisticsData.totalParticipants || 8;
    statCards[1].querySelector('h3').textContent = statisticsData.averageRating || 4.6;
    statCards[2].querySelector('h3').textContent = statisticsData.totalVotes || 0;
  }
}

// Update leaderboard display
function updateLeaderboardDisplay(leaderboardData) {
  const leaderboard = document.querySelector('.leaderboard');
  if (!leaderboard || !leaderboardData.length) return;

  leaderboard.innerHTML = '';
  
  leaderboardData.slice(0, 5).forEach((participant, index) => {
    const leaderboardItem = document.createElement('div');
    leaderboardItem.className = `leaderboard-item ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`;
    
    leaderboardItem.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="participant-info">
        <img src="${getParticipantImage(participant.name)}" alt="${participant.name}">
        <div class="details">
          <h4>${participant.name}</h4>
          <p>${participant.role}</p>
        </div>
      </div>
      <div class="score">${participant.rating} <i class="fas fa-star"></i></div>
    `;
    
    leaderboard.appendChild(leaderboardItem);
  });
}

// Get participant image based on name
function getParticipantImage(name) {
  const imageMap = {
    'Durgesh': 'WhatsApp Image 2025-05-25 at 11.27.19_18a41e73.jpg',
    'Anupam': 'anupam.jpg',
    'Ishan': 'ishan.jpg',
    'Amit': 'amit.jpg',
    'Aman': 'aman.jpg',
    'Alok': 'alok.jpg',
    'Pankaj': 'pankaj.jpg',
    'Aditya': 'aditya.jpg'
  };
  return imageMap[name] || 'default-avatar.jpg';
}

// Submit rating to backend
async function submitRating(participantId, rating, comment = '') {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({
        participantId,
        rating,
        comment
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      showNotification('Rating submitted successfully!', 'success');
      // Reload data to update displays
      loadData();
      return result;
    } else {
      showNotification(result.error || 'Failed to submit rating', 'error');
      return null;
    }
  } catch (error) {
    console.error('Error submitting rating:', error);
    showNotification('Failed to submit rating. Please try again.', 'error');
    return null;
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  createRatingSystem();
  initializeActionButtons();
  addScrollAnimations();
  updateLeaderboard();
  initializeContactForm();
  addParticleEffect();
  
  // Load data from backend
  loadData();
  
  // Animate stats after a short delay
  setTimeout(() => {
    animateStats();
    animateProgressBars();
  }, 1000);
  
  // Add some random activity updates
  setInterval(() => {
    const activityItems = document.querySelectorAll('.activity-item');
    if (activityItems.length > 0) {
      const randomItem = activityItems[Math.floor(Math.random() * activityItems.length)];
      randomItem.style.background = 'linear-gradient(135deg, #e8f0ff, #f0f4ff)';
      setTimeout(() => {
        randomItem.style.background = '#f8f9ff';
      }, 2000);
    }
  }, 10000);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal[style*="block"]');
    openModals.forEach(modal => {
      closeModal(modal);
    });
  }
  
  // R key opens ratings
  if (e.key === 'r' || e.key === 'R') {
    if (ratingsModal) {
      openModal(ratingsModal);
    }
  }
  
  // P key opens participants
  if (e.key === 'p' || e.key === 'P') {
    if (participantsModal) {
      openModal(participantsModal);
    }
  }
});

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