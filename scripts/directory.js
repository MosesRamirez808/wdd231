const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

const dataURL = 'members.json';

async function getBusinesses() {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) throw new Error('Failed to fetch businesses');

    const businesses = await response.json();
    displayBusinesses(businesses);
  } catch (error) {
    console.error(error);
  }
}

function displayBusinesses(businesses) {
  container.innerHTML = '';

  businesses.forEach(biz => {
    const card = document.createElement('section');
    card.classList.add('business-card');

    card.innerHTML = `
      <h3>${biz.name}</h3>
      <p class="tag">${biz.tag}</p>
      <p><strong>Email:</strong> ${biz.email}</p>
      <p><strong>Phone:</strong> ${biz.phone}</p>
      <p>
        <a href="https://${biz.url}" target="_blank" rel="noopener">
          ${biz.url}
        </a>
      </p>
    `;

    container.appendChild(card);
  });
}

/* Grid / List toggle */
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

getBusinesses();
