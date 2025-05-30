// Search filter for course cards
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const courseCards = document.querySelectorAll('.course-card');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchValue = this.value.toLowerCase();
      courseCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchValue) ? 'block' : 'none';
      });
    });
  }

  // Attach click events to course cards to load course page
  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      const publicId = card.getAttribute('data-link');
      const page = 1;
      if (publicId) {
        loadPage(publicId, page);
        history.pushState({ publicId, page }, '', `?page=${page}&id=${publicId}`);
      }
    });
  });

  // Contact Modal
  const contactModal = document.getElementById('contactModal');
  const openContact = document.getElementById('openContact');
  const closeButton = document.querySelector('.close-button');

  if (openContact && contactModal) {
    openContact.addEventListener('click', () => {
      contactModal.style.display = 'flex';
    });

    closeButton?.addEventListener('click', () => {
      contactModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = 'none';
      }
    });
  }

  // Login / Signup Modals
  ['loginModal', 'signupModal'].forEach(modalId => {
    const openBtn = document.getElementById(`open${modalId.replace('Modal', '')}`);
    const modal = document.getElementById(modalId);

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.style.display = 'flex');

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  });

  // Load page from URL if query parameters exist
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page')) || 1;
  const publicId = params.get('id');
  if (publicId) {
    loadPage(publicId, page);
  }
});

// Load and inject course content
function loadPage(publicId, page) {
  fetch('https://d9e9300c53203aeb0e5cbec2b80c6e59.serveo.net/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId, page }),
  })
  .then(response => {
    if (!response.ok) throw new Error(`Failed to load content: ${response.statusText}`);
    return response.text();
  })
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  })
  .catch(error => {
    console.error('Error loading page:', error);
  });
}

// Handle browser back/forward navigation
window.onpopstate = function (event) {
  if (event.state) {
    const { publicId, page } = event.state;
    loadPage(publicId, page);
  }
};
