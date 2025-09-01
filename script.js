/*=============== DARK/LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected theme (if user chose before)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "bx-sun" : "bx-moon";

// Apply previously saved theme
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "bx-sun" ? "add" : "remove"](iconTheme);
}
// Toggle theme
themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Toggle active style on the button itself
    themeButton.classList.toggle("active-theme");

    // Save user preference
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
    localStorage.setItem("button-active", themeButton.classList.contains("active-theme"));
});

// Restore button state on reload
if (localStorage.getItem("button-active") === "true") {
    themeButton.classList.add("active-theme");
}

// Toggle button to hide menu

const navToggle = document.getElementById("nav-toggle"),
      navMenu = document.getElementById("nav-menu"),
      nextSection = document.querySelector("section"); // grabs the first <section> after header

if (navToggle) {
  navToggle.addEventListener("click", () => {
    // Toggle nav menu visibility
    navMenu.classList.toggle("show-menu");

    // Toggle the next section visibility
    if (nextSection) {
      nextSection.classList.toggle("hide-section");
    }
  });
}


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
        }else{
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);


/*=============== CUSTOM FUNCTIONS & EXTRA DOM INTERACTIONS ===============*/

// 1. Show a welcome message once DOM is loaded
function showWelcomeMessage() {
    const message = document.createElement("div");
    message.textContent = "👋 Welcome to the site!";
    message.style.position = "fixed";
    message.style.bottom = "20px";
    message.style.right = "20px";
    message.style.padding = "10px 15px";
    message.style.background = "#007BFF";
    message.style.color = "#fff";
    message.style.borderRadius = "8px";
    message.style.zIndex = "1000";
    document.body.appendChild(message);

    // Remove message after 5 seconds
    setTimeout(() => message.remove(), 5000);
}
document.addEventListener("DOMContentLoaded", showWelcomeMessage); // (DOM interaction #1)


// 2. Scroll-to-top button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const scrollBtn = document.createElement("button");
scrollBtn.textContent = "⬆ Top";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.left = "20px";
scrollBtn.style.padding = "8px 12px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "6px";
scrollBtn.style.background = "#333";
scrollBtn.style.color = "#fff";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
document.body.appendChild(scrollBtn); // (DOM interaction #2)

// Show button when user scrolls down
window.addEventListener("scroll", () => {
    if(window.scrollY > 200){
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}); // (DOM interaction #3)

// Click event for button
scrollBtn.addEventListener("click", scrollToTop); // (DOM interaction #4)
