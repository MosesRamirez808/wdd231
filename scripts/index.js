// -------------------------
// Course Data
// -------------------------
const courses = [
  { code: "WDD 130", credits: 2, completed: true},
  { code: "CSE 111", credits: 2, completed: true},
  { code: "WDD 131", credits: 2, completed: true},
  { code: "WDD 231", credits: 0, completed: false},
  { code: "CSE 110", credits: 2, completed: true},
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
    div.textContent = course.code;
    if (course.completed) {
      div.classList.add("completed");
    } else {
      div.classList.add("not-completed");
    }
    courseList.appendChild(div);
  });

  const completedCredits = filtered
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.credits, 0);

  totalCreditsText.textContent = `Total Completed Credits: ${completedCredits}`;
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
