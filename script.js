// Data for ministries and events
const ministries = {
  "Youth Ministry": "Our Youth Ministry, or 'kabataan' ministry, is a dynamic community for students from middle school through college. We gather every Saturday for Bible study, games, and fellowship. Our goal is to equip the next generation to be passionate followers of Jesus.",
  "Women's Ministry": "Our Women's Ministry is a supportive and nurturing 'kumunidad' for women of all ages. We hold regular Bible studies, prayer meetings, and special events to encourage one another in our walks with Christ.",
  "Men's Ministry": "The Men's Ministry provides a space for men to build genuine friendships and grow as spiritual leaders in their homes, workplaces, and communities. We meet for breakfast, sports, and focused discussions on how to live out a godly life.",
  "Music & Worship": "The Music and Worship Ministry is a team of volunteers with a heart to lead the congregation into the presence of God through music. We believe worship is more than just singing; it's a way of life that glorifies God.",
};

const events = {
  "2025-09-12": {
    title: "Youth Ministry Friday Fellowship",
    location: "Church Fellowship Hall",
    details: "A night of games, worship, and a challenging message for our youth. Invite your friends!",
  },
  "2025-09-15": {
    title: "Women's Ministry Bible Study",
    location: "Zoom (online)",
    details: "Join us as we continue our study on the Book of James. All women are welcome!",
  },
  "2025-09-21": {
    title: "Community Outreach Program",
    location: "Brgy. San Jose Community Center",
    details: "We will be distributing food packs and school supplies to our neighbors in need. All volunteers are welcome!",
  },
};

// DOM Elements
const navMenu = document.getElementById("nav-menu");
const menuToggle = document.getElementById("menu-toggle");
const ministryModal = document.getElementById("ministry-modal");
const eventModal = document.getElementById("event-modal");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Navigation Menu Toggle
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.add("hidden");
    });
  });
}

// Ministry Modal Logic
document.querySelectorAll(".learn-more-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const ministryName = button.getAttribute("data-ministry");
    if (ministryName && ministries[ministryName]) {
      document.getElementById("modal-title").textContent = ministryName;
      document.getElementById("modal-body").textContent = ministries[ministryName];
      if (ministryModal) ministryModal.style.display = "block";
    }
  });
});

document.querySelectorAll(".modal .close-btn, #modal-close-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (ministryModal) ministryModal.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === ministryModal) {
    ministryModal.style.display = "none";
  }
});

// Contact Form Validation and Submission
function validateForm(form) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return false;
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!subject) {
    alert("Please enter a subject.");
    return false;
  }
  if (!message) {
    alert("Please enter your message.");
    return false;
  }
  return true;
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm(contactForm)) {
      return;
    }

    formStatus.classList.remove("hidden");
    formStatus.classList.remove("text-red-500", "text-green-500");
    formStatus.textContent = "Sending message...";

    // Simulate form submission
    setTimeout(() => {
      formStatus.textContent = "Thank you for your message! We will get back to you shortly.";
      formStatus.classList.add("text-green-500");
      contactForm.reset();
    }, 2000);
  });
}

// Calendar Functionality
const currentMonthYear = document.getElementById("current-month-year");
const calendarGrid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let date = new Date();

function renderCalendar() {
  if (!currentMonthYear || !calendarGrid) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  currentMonthYear.textContent = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  calendarGrid.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty slots for days before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = d;
    dayCell.className = "p-2 bg-white rounded hover:bg-indigo-100 cursor-pointer";
    dayCell.addEventListener("click", () => showEventDetails(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`));
    calendarGrid.appendChild(dayCell);
  }
}

function showEventDetails(dateKey) {
  const event = events[dateKey];
  if (event && eventModal) {
    document.getElementById("event-modal-title").textContent = event.title;
    document.getElementById("event-modal-date").textContent = new Date(dateKey).toLocaleDateString("en-PH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("event-modal-location").textContent = `Location: ${event.location}`;
    document.getElementById("event-modal-details").textContent = event.details;
    eventModal.style.display = "block";
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

// Event Modal Close
document.querySelectorAll("#event-modal .close-btn, #event-modal-close-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (eventModal) eventModal.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === eventModal) {
    eventModal.style.display = "none";
  }
});

// Initial render
renderCalendar();