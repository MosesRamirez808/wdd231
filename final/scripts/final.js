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
    const response = await fetch('final.json');
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function openModalContent(item) {
  modalBody.innerHTML = `
    <h2>${item.place}</h2>
    <p><strong>Continent:</strong> ${item.continent}</p>
    <p><strong>Highlight:</strong> ${item.highlight}</p>
    <p><strong>Reason:</strong> ${item.reason}</p>
  `;
  modal.classList.remove('hidden');
}

closeModal?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

function displayCards(data, container) {
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${item.place}</h3>
      <p>${item.highlight}</p>
      <button>Details</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      openModalContent(item);
    });

    container.appendChild(card);
  });
}

async function init() {
  const data = await getData();

  if (cardContainer) displayCards(data, cardContainer);
  if (exploreContainer) displayCards(data, exploreContainer);

  filter?.addEventListener('change', () => {
    const value = filter.value;
    const filtered =
      value === 'all'
        ? data
        : data.filter(item => item.continent === value);

    displayCards(filtered, exploreContainer);
  });
}

init();

