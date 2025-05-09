document.getElementById('searchInput').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const cards = document.querySelectorAll('.course-card');

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(searchValue) ? 'block' : 'none';
  });
});

// Open course link in the same tab
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link; // open in same tab
    }
  });
});


// account section
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Attach event listeners
document.getElementById('openLogin').addEventListener('click', () => openModal('loginModal'));
document.getElementById('openSignup').addEventListener('click', () => openModal('signupModal'));

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  ['loginModal', 'signupModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) modal.style.display = "none";
  });
});


// Contact section
document.getElementById('openContact').addEventListener('click', () => {
  document.getElementById('contactModal').style.display = 'flex';
});

document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('contactModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'contactModal') {
    document.getElementById('contactModal').style.display = 'none';
  }
});
