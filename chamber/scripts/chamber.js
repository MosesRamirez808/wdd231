// =====================
// MOBILE MENU
// =====================
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}
const mainNav = document.querySelector('.nav-menu');
const hambutton = document.querySelector('#menu-toggle');

hambutton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    
    // Optional: Change the icon from ☰ to X when open
    if (mainNav.classList.contains('open')) {
        hambutton.textContent = 'X';
    } else {
        hambutton.textContent = '☰';
    }
});
// =====================
// FOOTER DATE
// =====================
document.getElementById('lastModified').textContent = document.lastModified;

// =====================
// WEATHER (OpenWeatherMap)
// =====================
const apiKey = '9d9c767a2d93f39568a3933676628c2a';
const city = 'Wailea,HI,US';

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);

    const data = await response.json();

    document.querySelector('.temp').textContent =
      `${Math.round(data.main.temp)}°F`;

    document.querySelector('.conditions').textContent =
      data.weather[0].description;

    document.querySelector('.hi-lo').textContent =
      `High: ${Math.round(data.main.temp_max)}° | Low: ${Math.round(data.main.temp_min)}°`;

    document.querySelector('.humidity').textContent =
      `Humidity: ${data.main.humidity}%`;

    document.querySelector('.sun').textContent =
      `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} | Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
  } catch (error) {
    console.error('Weather error:', error);
  }
}

getWeather();

// =====================
// 3-DAY FORECAST
// =====================
async function getForecast() {
  try {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(forecastURL);

    if (!response.ok) throw new Error(`Forecast fetch failed: ${response.status}`);

    const data = await response.json();

    const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    if (days.length >= 3) {
      document.querySelector('.day1').textContent =
        `Tomorrow: ${Math.round(days[0].main.temp)}°F`;

      document.querySelector('.day2').textContent =
        `Day 2: ${Math.round(days[1].main.temp)}°F`;

      document.querySelector('.day3').textContent =
        `Day 3: ${Math.round(days[2].main.temp)}°F`;
    }
  } catch (error) {
    console.error('Forecast error:', error);
  }
}

getForecast();

// =====================
// BUSINESS SPOTLIGHTS
// =====================
const businesses = [
  {
    name: "Sunrise Bakery",
    tag: "Fresh Daily Bread",
    email: "hello@sunrise.com",
    phone: "800-555-1111",
    url: "sunrisebakery.com"
  },
  {
    name: "Towneship Tech",
    tag: "Local IT Solutions",
    email: "support@tt.com",
    phone: "800-555-2222",
    url: "towneshiptech.com"
  },
  {
    name: "Green Valley Realty",
    tag: "Finding You A Home",
    email: "info@gvrealty.com",
    phone: "800-555-3333",
    url: "greenvalleyrealty.com"
  }
];

const spotlightContainer = document.querySelector('.spotlights');

businesses.forEach(biz => {
  const card = document.createElement('div');
  card.classList.add('business-card');

  card.innerHTML = `
    <h3>${biz.name}</h3>
    <p class="tag">${biz.tag}</p>
    <p><strong>Email:</strong> ${biz.email}</p>
    <p><strong>Phone:</strong> ${biz.phone}</p>
    <p><strong>URL:</strong> <a href="https://${biz.url}" target="_blank" rel="noopener">${biz.url}</a></p>
  `;

  spotlightContainer.appendChild(card);
});

// Function to populate submission info on thankyou.html
function populateThankYouInfo() {
  if (!window.location.pathname.endsWith('thankyou.html')) return;

  const params = new URLSearchParams(window.location.search);

  document.getElementById('fname').textContent = params.get('fname') || '';
  document.getElementById('lname').textContent = params.get('lname') || '';
  document.getElementById('email').textContent = params.get('email') || '';
  document.getElementById('phone').textContent = params.get('phone') || '';
  document.getElementById('business').textContent = params.get('business') || '';

  const timestamp = params.get('timestamp');
  if (timestamp) {
    document.getElementById('timestamp').textContent =
      new Date(timestamp).toLocaleString();
  }
}

// Run the function after DOM is loaded (since your script uses defer, DOM is ready)
populateThankYouInfo();

// Set current timestamp into hidden input before form submits
function setJoinFormTimestamp() {
  const form = document.querySelector('.join-form');
  if (!form) return;

  form.addEventListener('submit', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }
  });
}

setJoinFormTimestamp();

// =====================
// VISITOR MESSAGE
// =====================
document.addEventListener("DOMContentLoaded", function () {
  const visitorMessageEl = document.getElementById('visitor-message');
  if (!visitorMessageEl) return; // Exit if element not found

  const now = new Date();
  const hour = now.getHours();
  let greeting = "";

  // Time-based greeting
  if (hour < 12) {
    greeting = "Good morning! Welcome to Towneship.";
  } else if (hour < 18) {
    greeting = "Good afternoon! Explore what Towneship has to offer.";
  } else {
    greeting = "Good evening! Thanks for visiting Towneship.";
  }

  // Optional: include user name if defined
  // Make sure `name` is defined somewhere before this code
  if (typeof name !== "undefined" && name) {
    greeting += ` ${name}`;
  }

  visitorMessageEl.textContent = greeting;
});
