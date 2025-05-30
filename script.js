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






  // Load and inject full HTML content into the document
 function loadPage(publicId, page = 1) {
  fetch('http://localhost:3000/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId, page }),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch course HTML");
      return res.text();
    })
    .then(html => {
      const win = window.open('', '_blank');
      if (win) {
        win.document.open();
        win.document.write(html);
        win.document.close();
      } else {
        alert("Please allow popups!");
      }
    })
    .catch(err => {
      console.error('Failed to load page:', err);
    });
}



  // Set up course card click handlers and handle first-load + history
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.course-card');

    // Handle course card clicks
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const publicId = card.getAttribute('data-link');
        if (!publicId) {
          console.warn('No publicId found on clicked card');
          return;
        }

        console.log("Clicked course link:", publicId);

        const page = 1;
        loadPage(publicId, page);
        history.pushState({ publicId, page }, '', `?page=${page}&id=${publicId}`);
      });
    });

    // Load course content if URL has params on initial load
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    const publicId = params.get('id');
    if (publicId) {
      loadPage(publicId, page);
    }
  });

  // Handle back/forward browser navigation
  window.onpopstate = function (event) {
    if (event.state) {
      const { publicId, page } = event.state;
      loadPage(publicId, page);
    }
  };

