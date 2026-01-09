// -------------------------
// Course Data
// -------------------------
const courses = [
  { code: "WDD 130", credits: 2 },
  { code: "CSE 111", credits: 2 },
  { code: "WDD 131", credits: 2 },
  { code: "WDD 231", credits: 2 },
  { code: "CSE 110", credits: 2 },
];

// -------------------------
// DOM Loaded Event
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.getElementById("allBtn");
  const cseBtn = document.getElementById("cseBtn");
  const wddBtn = document.getElementById("wddBtn");
  const courseList = document.getElementById("courseList");
  const totalCreditsText = document.getElementById("totalCreditsText");
  const currentYear = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
   const isOpen = navMenu.classList.toggle("open");
   menuToggle.setAttribute("aria-expanded", isOpen);
});

  function renderCourses(filter = "ALL") {
    courseList.innerHTML = "";
    let filtered = [];

    if (filter === "ALL") filtered = courses;
    else filtered = courses.filter(c => c.code.startsWith(filter));

    filtered.forEach(course => {
      const div = document.createElement("div");
      div.classList.add("course-item");
      div.textContent = course.code;
      courseList.appendChild(div);
    });

    const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsText.textContent = `The total credits for courses listed above is ${totalCredits}`;
  }

  // Button Events
  allBtn.addEventListener("click", () => renderCourses("ALL"));
  cseBtn.addEventListener("click", () => renderCourses("CSE"));
  wddBtn.addEventListener("click", () => renderCourses("WDD"));

  // Footer Info
  if (currentYear) currentYear.textContent = new Date().getFullYear();
  if (lastModified) lastModified.textContent = document.lastModified;

  // Initial Render
  renderCourses("ALL");
});
