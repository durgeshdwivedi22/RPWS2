document.addEventListener('DOMContentLoaded', function() {
  // Navbar links
  const participantsLink = document.querySelector('a[href="#participants"]');
  const winnerLink = document.querySelector('a[href="#winner"]');
  const ratingsLink = document.querySelector('a[href="#ratings"]');
  const participantsModal = document.getElementById('participants-modal');
  const closeParticipants = document.getElementById('close-participants');
  const winnerSection = document.getElementById('winner-section');
  const ratingsSection = document.getElementById('ratings');

  // Participants Popup
  if (participantsLink && participantsModal) {
    participantsLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (winnerSection) winnerSection.style.display = 'none';
      participantsModal.style.display = 'block';
    });
  }
  if (closeParticipants && participantsModal) {
    closeParticipants.addEventListener('click', function() {
      participantsModal.style.display = 'none';
    });
  }
  window.addEventListener('click', function(e) {
    if (e.target === participantsModal) {
      participantsModal.style.display = 'none';
    }
  });

  // Show Winner Section
  if (winnerLink && winnerSection) {
    winnerLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (participantsModal) participantsModal.style.display = 'none';
      winnerSection.style.display = 'flex';
      winnerSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Show Ratings Popup (if using modal)
  const openBtn = document.getElementById('open-ratings');
  const modal = document.getElementById('ratings-modal');
  const closeBtn = document.getElementById('close-ratings');
  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
    });
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Rate Button Alert Example
  document.querySelectorAll('.rate-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const name = this.parentElement.querySelector('h3').innerText;
      alert('You clicked Rate for ' + name + '!');
    });
  });

  // Chart.js code (if you want to keep it)...
});







document.addEventListener('DOMContentLoaded', function() {
  // Graph Popup Logic
  const openGraphBtn = document.getElementById('open-graph');
  const graphModal = document.getElementById('graph-modal');
  const closeGraphBtn = document.getElementById('close-graph');

  if (openGraphBtn && graphModal && closeGraphBtn) {
    openGraphBtn.addEventListener('click', function(e) {
      e.preventDefault();
      graphModal.style.display = 'block';
      drawParticipantsGraph();
    });
    closeGraphBtn.addEventListener('click', function() {
      graphModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === graphModal) graphModal.style.display = 'none';
    });
  }

  function drawParticipantsGraph() {
    // Destroy previous chart if exists
    if (window.participantsChart) window.participantsChart.destroy();

    const ctx = document.getElementById('participantsGraph').getContext('2d');
    const participants = [
      { name: "Durgesh", img: "WhatsApp Image 2025-05-25 at 11.27.18.jpeg", rating: 4.9 },
      { name: "Anupam", img: "anupam.jpeg", rating: 4.8 },
      { name: "Ishan", img: "ishan.jpeg", rating: 4.7 },
      { name: "Amit", img: "amit.jpeg", rating: 4.6 },
      { name: "Aman", img: "aman.jpeg", rating: 4.5 },
      { name: "Alok", img: "alok.jpeg", rating: 4.4 },
      { name: "Pankaj", img: "pankaj.jpeg", rating: 4.3 },
      { name: "Aditya", img: "aditya.jpeg", rating: 4.2 }
    ];

    // Preload images
    const images = participants.map(p => {
      const img = new window.Image();
      img.src = p.img;
      return img;
    });

    // Chart.js bar chart with custom plugin for images
    window.participantsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: participants.map(p => p.name),
        datasets: [{
          label: 'Rating',
          data: participants.map(p => p.rating),
          backgroundColor: '#7c3aed',
          borderRadius: 12
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' ★';
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              display: false // Hide text labels
            }
          },
          y: {
            beginAtZero: true,
            max: 5,
            ticks: { stepSize: 0.5, color: '#555' },
            grid: { color: '#eee' }
          }
        },
        animation: { duration: 1200, easing: 'easeOutElastic' }
      },
      plugins: [{
        id: 'xImageLabels',
        afterDraw: chart => {
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          xAxis.ticks.forEach((tick, i) => {
            const x = xAxis.getPixelForTick(i);
            const y = yAxis.bottom + 30;
            const img = images[i];
            if (img.complete) {
              chart.ctx.save();
              chart.ctx.beginPath();
              chart.ctx.arc(x, y, 18, 0, 2 * Math.PI);
              chart.ctx.closePath();
              chart.ctx.clip();
              chart.ctx.drawImage(img, x - 18, y - 18, 36, 36);
              chart.ctx.restore();
            } else {
              img.onload = () => chart.draw();
            }
          });
        }
      }]
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // ...other code...

  // Contact Popup Logic
  const openContactBtn = document.getElementById('open-contact');
  const contactModal = document.getElementById('contact-modal');
  const closeContactBtn = document.getElementById('close-contact');

  if (openContactBtn && contactModal && closeContactBtn) {
    openContactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactModal.style.display = 'block';
    });
    closeContactBtn.addEventListener('click', function() {
      contactModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === contactModal) contactModal.style.display = 'none';
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Ratings Modal Logic
  const openRatingsBtn = document.getElementById('open-ratings');
  const ratingsModal = document.getElementById('ratings-modal');
  const closeRatingsBtn = document.getElementById('close-ratings');

  if (openRatingsBtn && ratingsModal && closeRatingsBtn) {
    openRatingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      ratingsModal.style.display = 'block';
    });
    closeRatingsBtn.addEventListener('click', function() {
      ratingsModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
      if (e.target === ratingsModal) ratingsModal.style.display = 'none';
    });
  }
});
// ---- RWPS Step 1: Rating Logic ----

// Select all cards
const cards = document.querySelectorAll(".card");

// Load saved scores from localStorage (or start fresh)
let scores = JSON.parse(localStorage.getItem("rwps-scores")) || {};

// Initialize scores for each participant
cards.forEach((card, index) => {
  const name = card.querySelector("h2").innerText;
  const scoreElement = card.querySelector(".score");
  const button = card.querySelector("button");

  // If not in localStorage, set 0
  if (!(name in scores)) {
    scores[name] = 0;
  }

  // Show current score
  scoreElement.innerText = scores[name];

  // Add event listener to ⭐ button
  button.addEventListener("click", () => {
    scores[name] += 1; // Increase score
    scoreElement.innerText = scores[name]; // Update on screen

    // Save to localStorage
    localStorage.setItem("rwps-scores", JSON.stringify(scores));
  });
});
// RWPS Step 1: Rating logic using your existing HTML IDs

// Load scores from localStorage or start fresh
 scores = JSON.parse(localStorage.getItem("rwps-scores")) || {};

// Map each participant by their <h2> name and score span id
const participants = document.querySelectorAll(".card");

participants.forEach((card, index) => {
  const name = card.querySelector("h2").innerText;
  const scoreElement = card.querySelector("span");
  const button = card.querySelector("button");

  // If no score yet, initialize to 0
  if (!(name in scores)) {
    scores[name] = 0;
  }

  // Show score
  scoreElement.innerText = scores[name];

  // On button click
  button.addEventListener("click", () => {
    scores[name] += 1; // increase score
    scoreElement.innerText = scores[name]; // update UI
    localStorage.setItem("rwps-scores", JSON.stringify(scores)); // save
  });
});



