// Mobile Menu Toggle
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');


menuButton.addEventListener('click', () => {
navMenu.classList.toggle('open');
});


// Footer Last Modified
document.getElementById('lastModified').textContent = document.lastModified;


// Weather Fetch (OpenWeatherMap)
const apiKey = 'YOUR_API_KEY_HERE';
const city = 'Phoenix';


async function getWeather() {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const response = await fetch(url);
const data = await response.json();


document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°F`;
document.querySelector('.conditions').textContent = data.weather[0].description;
document.querySelector('.hi-lo').textContent = `High: ${Math.round(data.main.temp_max)}° | Low: ${Math.round(data.main.temp_min)}°`;
document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
document.querySelector('.sun').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()} | Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}
getWeather();


// Business Spotlights (JSON)
const businesses = [
{
"name": "Sunrise Bakery",
"tag": "Fresh Daily Bread",
"email": "hello@sunrise.com",
"phone": "800-555-1111",
"url": "sunrisebakery.com"
},
{
"name": "Towneship Tech",
"tag": "Local IT Solutions",
"email": "support@tt.com",
"phone": "800-555-2222",
"url": "towneshiptech.com"
},
{
"name": "Green Valley Realty",
"tag": "Finding You Home",
"email": "info@gvrealty.com",
"phone": "800-555-3333",
"url": "greenvalleyrealty.com"
}
];


const spotlightContainer = document.querySelector('.spotlights');


businesses.forEach(biz => {
const card = document.createElement('div');
card.classList.add('business-card');


card.innerHTML = `
<div class="biz-img"></div>
<div class="biz-info">
<h3>${biz.name}</h3>
<p class="tag">${biz.tag}</p>
<p><strong>Email:</strong> ${biz.email}</p>
<p><strong>Phone:</strong> ${biz.phone}</p>
<p><strong>URL:</strong> ${biz.url}</p>
</div>
`;


spotlightContainer.appendChild(card);
});