// Function to dynamically load partials
function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch((err) => console.error(`Error loading ${file}: ${err}`));
}
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 50) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});

// Scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Perform search
function performSearch() {
  const query = document.getElementById("heroSearch").value.trim();
  if (query) {
    alert(
      `Searching for "${query}"... (Integrate with backend API for actual search results)`
    );
  } else {
    alert("Please enter a search term.");
  }
}
// Show feature details in a modal
function showFeatureDetails(title, content) {
  // Update modal title and content
  document.getElementById("featureDetailsModalLabel").innerText = title;
  document.getElementById("featureDetailsContent").innerText = content;

  // Show modal
  const modal = new bootstrap.Modal(
    document.getElementById("featureDetailsModal")
  );
  modal.show();
}

// Scroll to top button
const scrollToTopButton = document.getElementById("scrollToTop");
window.onscroll = function () {
  scrollToTopButton.style.display = window.scrollY > 200 ? "block" : "none";
};

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Function to animate numbers
// Animate statistics
// Animate statistics
function animateStatistic(id, target) {
  const element = document.getElementById(id);
  if (!element) return; // Exit if the element is not found

  let count = 0; // Initial value
  const duration = 2000; // Total animation duration in milliseconds
  const intervalTime = 20; // Interval between updates in milliseconds
  const steps = Math.ceil(duration / intervalTime); // Total number of steps
  const increment = target / steps; // Increment value per step

  const interval = setInterval(() => {
    count += increment; // Increment the count
    if (count >= target) {
      count = target; // Ensure the final value matches the target
      clearInterval(interval); // Stop the animation
    }
    element.innerText = Math.floor(count).toLocaleString(); // Update the displayed number
  }, intervalTime);
}

// Trigger animations when the statistics section comes into view
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateStatistic("schemesStat", 120); // Example: 120 schemes
      animateStatistic("statesStat", 28); // Example: 28 states
      animateStatistic("usersStat", 10000); // Example: 10,000 users
      observer.unobserve(entry.target); // Stop observing after animation starts
    }
  });
}

// Set up Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5, // Trigger when 50% of the section is visible
});

// Start observing the statistics section
const statsSection = document.getElementById("statistics");
if (statsSection) {
  observer.observe(statsSection);
}

document.body.style.backgroundImage = "url('assets/background.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundPosition = "center";

// // Animate statistics
// function animateStatistics(id, target) {
//   let count = 0;
//   const interval = setInterval(() => {
//     if (count >= target) {
//       clearInterval(interval);
//     } else {
//       count += Math.ceil(target / 100);
//       document.getElementById(id).innerText = count;
//     }
//   }, 30);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   animateStatistics("stat-schemes", 120);
//   animateStatistics("stat-states", 28);
//   animateStatistics("stat-users", 10000);
// });

function showLogin() {
  const modal = new bootstrap.Modal(document.getElementById("loginModal"));
  modal.show();
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Login successful") {
        alert("Welcome! Profile data: " + JSON.stringify(data.profile));
      } else {
        alert("Invalid login credentials!");
      }
    })
    .catch((err) => console.error(err));
}
async function fetchServices() {
  const response = await fetch("http://localhost:5000/api/services");
  const data = await response.json();
  console.log(data);
}

fetchServices();
