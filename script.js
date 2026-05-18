// script.js

/* =========================================
   LOADING SCREEN
========================================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
});

/* =========================================
   MOBILE MENU TOGGLE
========================================= */
// const hamburger = document.getElementById("hamburger");
// const navMenu = document.getElementById("navMenu");

// hamburger.addEventListener("click", () => {
//     navMenu.classList.toggle("active");
// });

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}
/* =========================================
   SMOOTH SCROLLING
========================================= */
document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});

/* =========================================
   DARK / LIGHT THEME
========================================= */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-theme")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

});

/* =========================================
   TYPING ANIMATION
========================================= */
const typingText = document.getElementById("typingText");

const roles = [
    "Software Engineer",
    // "Web Developer",
    // "UI/UX Designer",
    // "Freelancer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();

/* =========================================
   SCROLL ANIMATIONS
========================================= */
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".section").forEach(section => {

    section.classList.add("hidden");
    observer.observe(section);

});

/* =========================================
   SKILL BAR ANIMATION
========================================= */
const skillBars = document.querySelectorAll(".progress");

function animateSkills() {

    skillBars.forEach(bar => {

        const width = bar.getAttribute("data-width");

        bar.style.width = width + "%";

    });

}

window.addEventListener("scroll", animateSkills);

/* =========================================
   PROJECT FILTER
========================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

/* =========================================
   BACK TO TOP BUTTON
========================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================================
   SCROLL PROGRESS BAR
========================================= */
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    scrollBar.style.width = progress + "%";

});

/* =========================================
   CONTACT FORM VALIDATION
========================================= */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const result = await response.json();

        if (result.success) {
            alert("Message sent successfully!");
            contactForm.reset();
        } else {
            alert(result.message || "Failed to send message.");
        }
    } catch (error) {
        console.error("Send message error:", error);
        alert("Something went wrong. Please try again.");
    }
});

/* =========================================
   COUNTER ANIMATION
========================================= */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = target / 100;

                if (count < target) {

                    count += increment;

                    counter.innerText =
                        Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
