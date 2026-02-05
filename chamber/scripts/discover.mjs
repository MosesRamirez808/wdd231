
export const members = [
  {
    name: "Sunrise Bakery",
    tag: "Fresh Daily Bread",
    email: "hello@sunrise.com",
    phone: "800-555-1111",
    url: "sunrisebakery.com",
    membership: "gold"
  },
  {
    name: "Fitness First Gym",
    tag: "Your Health, Our Priority",
    email: "fitness@fitnessfirstgym.com",
    phone: "800-555-2222",
    url: "fitnessfirstgym.com",
    membership: "silver"
  },
  {
    name: "Green Valley Realty",
    tag: "Finding You A Home",
    email: "info@gvrealty.com",
    phone: "800-555-3333",
    url: "greenvalleyrealty.com",
    membership: "gold"
  },
  {
    name: "Helping Hands Nonprofit",
    tag: "Serving the Community",
    email: "contact@helpinghands.org",
    phone: "800-555-4444",
    url: "helpinghands.org",
    membership: "np"
  },
  {
    name: "Café Delight",
    tag: "Gourmet Coffee & Pastries",
    email: "contact@cafedelight.com",
    phone: "800-555-5555",
    url: "cafedelight.com",
    membership: "silver"
  },
  {
    name: "Towneship Tech",
    tag: "Local IT Solutions",
    email: "support@tt.com",
    phone: "800-555-6666 800-555-2222",
    url: "towneshiptech.com",
    membership: "gold"
  },
  { 
    name: "Artisan Crafts",
    tag: "Handmade Treasures",
    email: "contact@artisancrafts.com",
    phone: "800-555-7777",
    url: "artisancrafts.com",
    membership: "silver"
  },
  {
    name: "Healthy Living Clinic",
    tag: "Your Wellness Partner",
    email: "contact@healthylivingclinic.com",
    phone: "800-555-8888",
    url: "healthylivingclinic.com",
    membership: "gold"
  }
];
const grid = document.getElementById('discover-grid');

if (grid) {
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <h2>${member.name}</h2>
      <p><em>${member.tag}</em></p>
      <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
      <p>Phone: ${member.phone}</p>
      <p>
        Website:
        <a href="https://${member.url}" target="_blank" rel="noopener">
          ${member.url}
        </a>
      </p>
      <p>Membership: ${member.membership}</p>
    `;

    grid.appendChild(card);
  });
}