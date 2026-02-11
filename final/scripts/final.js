const cardContainer = document.querySelector('#cardContainer');
const exploreContainer = document.querySelector('#exploreContainer');
const filter = document.querySelector('#filter');
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modalBody');
const closeModal = document.querySelector('#closeModal');
const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

menuButton?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

async function getData() {
  try {
    const response = await fetch('data/final.json');
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function openModalContent(item) {
  modalBody.innerHTML = `
    <h2>${item.place}</h2>
    <p><strong>Continent:</strong> ${item.continent}</p>
    <p><strong>Why Go:</strong> ${item.reason}</p>
    <p><strong>Description:</strong><br>${item.description ?? 'More details coming soon.'}</p>
    <p><strong>Best Time to Visit:</strong> ${item.bestTime ?? 'Anytime'}</p>
    <p><strong>Must-See:</strong> ${item.mustSee ?? 'Top local attractions'}</p>
  `;

  modal.style.display = 'flex';
}

closeModal?.addEventListener('click', () => {
  modal.style.display = 'none';
});

function displayCards(data, container) {
  container.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${item.place}</h3>
      <p><strong>Continent:</strong> ${item.continent}</p>
      <p><strong>Highlight:</strong> ${item.highlight}</p>
      <p><strong>Reason:</strong> ${item.reason}</p>
      <button>Details</button>
    `;

    if (item.featured) {
      card.innerHTML =
        `<span class="badge">A Must Visit</span>` + card.innerHTML;
    }

    card.querySelector('button').addEventListener('click', () => {
      openModalContent(item);
    });

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', init);

async function init() {
  const data = await getData();
  if (!data) return;

  // Restore saved filter
  const savedFilter = localStorage.getItem('selectedContinent');
  if (savedFilter && filter) {
    filter.value = savedFilter;
  }

  // Home page
  if (cardContainer) {
    const featured = data.filter(item => item.featured);
    displayCards(featured, cardContainer);
  }

  // Explore page
  if (exploreContainer) {
    const value = filter?.value || 'all';
    const filtered =
      value === 'all'
        ? data
        : data.filter(item => item.continent === value);

    displayCards(filtered, exploreContainer);
  }

  // Filter dropdown
  filter?.addEventListener('change', () => {
    const value = filter.value;

    localStorage.setItem('selectedContinent', value);

    const filtered =
      value === 'all'
        ? data
        : data.filter(item => item.continent === value);

    displayCards(filtered, exploreContainer);
  });
}
