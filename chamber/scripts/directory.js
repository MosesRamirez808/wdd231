/* ======================================================
   GLOBAL FUNCTIONS (Runs on every page)
   ====================================================== */

// 1. Footer Date & Last Modified
const lastModElement = document.getElementById('lastModified');
if (lastModElement) {
    lastModElement.textContent = document.lastModified;
}

// 2. Mobile Hamburger Menu
const menuButton = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Toggle icon text
        menuButton.textContent = navMenu.classList.contains('open') ? 'X' : '☰';
    });
}

/* ======================================================
   DIRECTORY PAGE LOGIC (Grid/List Toggle & Data Fetch)
   ====================================================== */
const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const dataURL = 'data/members.json';

// Only run directory logic if the container exists
if (container && gridBtn && listBtn) {
    async function getBusinesses() {
        try {
            const response = await fetch(dataURL);
            if (!response.ok) throw new Error('Failed to fetch businesses');
            const businesses = await response.json();
            displayBusinesses(businesses);
        } catch (error) {
            console.error('Directory Fetch Error:', error);
        }
    }

    function displayBusinesses(businesses) {
  container.innerHTML = '';

  businesses.forEach(biz => {
    const card = document.createElement('section');
    card.classList.add('business-card');

    card.innerHTML = `
  <span class="membership-badge ${biz.membership.toLowerCase()}">
    ${biz.membership}
  </span>

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


    gridBtn.addEventListener('click', () => {
        container.className = 'grid-view';
    });

    listBtn.addEventListener('click', () => {
        container.className = 'list-view';
    });

    getBusinesses();
}

/* ======================================================
   HOME PAGE LOGIC (Weather & Spotlights)
   ====================================================== */
const apiKey = '9d9c767a2d93f39568a3933676628c2a';
const city = 'Wailea,HI,US';

// 1. Weather & Forecast
async function updateWeatherUI() {
    const tempDisplay = document.querySelector('.temp');
    if (!tempDisplay) return; // Exit if not on Home page

    try {
        // Current Weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        const wResponse = await fetch(weatherUrl);
        const wData = await wResponse.json();

        tempDisplay.textContent = `${Math.round(wData.main.temp)}°F`;
        document.querySelector('.conditions').textContent = wData.weather[0].description;
        document.querySelector('.hi-lo').textContent = `High: ${Math.round(wData.main.temp_max)}° | Low: ${Math.round(wData.main.temp_min)}°`;
        document.querySelector('.humidity').textContent = `Humidity: ${wData.main.humidity}%`;
        
        const sunrise = new Date(wData.sys.sunrise * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const sunset = new Date(wData.sys.sunset * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        document.querySelector('.sun').textContent = `Sunrise: ${sunrise} | Sunset: ${sunset}`;

        // 3-Day Forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
        const fResponse = await fetch(forecastUrl);
        const fData = await fResponse.json();
        const days = fData.list.filter(item => item.dt_txt.includes("12:00:00"));

        if (days.length >= 3) {
            document.querySelector('.day1').textContent = `Tomorrow: ${Math.round(days[0].main.temp)}°F`;
            document.querySelector('.day2').textContent = `Day 2: ${Math.round(days[1].main.temp)}°F`;
            document.querySelector('.day3').textContent = `Day 3: ${Math.round(days[2].main.temp)}°F`;
        }
    } catch (error) {
        console.error('Weather/Forecast Error:', error);
    }
}

updateWeatherUI();

/* ======================================================
   HOME PAGE – GOLD MEMBER SPOTLIGHTS
====================================================== */

const spotlightContainer = document.querySelector('.spotlights');

if (spotlightContainer) {
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {

            // 1. Filter GOLD members only
            const goldMembers = members.filter(
                member => member.membership.toLowerCase() === 'gold'
            );

            // 2. Randomize and limit to 3
            goldMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = goldMembers.slice(0, 3);

            // 3. Display them
            selectedMembers.forEach(biz => {
                const card = document.createElement('div');
                card.classList.add('business-card');

                card.innerHTML = `
                    <span class="membership-badge gold">Gold</span>
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

                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Spotlight Error:', error));
}
/* ======================================================
   HOME PAGE – GOLD MEMBER SPOTLIGHTS
====================================================== */

const goldspotlightContainer = document.querySelector('.spotlights');

if (goldspotlightContainer) {
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {

            // 1. Filter GOLD members only
            const goldMembers = members.filter(
                member => member.membership.toLowerCase() === 'gold'
            );

            // 2. Randomize and limit to 3
            goldMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = goldMembers.slice(0, 3);

            // 3. Display them
            selectedMembers.forEach(biz => {
                const card = document.createElement('div');
                card.classList.add('business-card');

                card.innerHTML = `
                    <span class="membership-badge gold">gold</span>
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

                goldspotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Spotlight Error:', error));
}
