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

  // Close menu on outside click
  window.addEventListener("click", (event) => {
    if (!menuToggle.contains(event.target) && !navMenu.contains(event.target) && !navMenu.classList.contains("hidden")) {
      navMenu.classList.add("hidden");
    }
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


// YouTube API Integration
const apiKey = 'API-KEY';//'AIzaSyC3YYpMeyTIp-RESlrPYpbqijfW6asRWME'; // Replace with your actual API key
const channelId = 'UCBbABuoqT0g8lwbg7gpMCpw'; // Replace with your actual channel ID
const maxResults = 6; // number of videos to show per page

let currentPage = 1;
let nextPageToken = null;
let prevPageToken = null;
let currentOrder = 'date';
let currentSpeaker = 'all';

function extractSpeaker(title) {
  const cleanTitle = title.replace(/\s+/g, ' ').trim();

  // 1. Look for " by NAME"
  const byMatch = cleanTitle.match(/\bby\s+([^\-|:]+)/i);
  if (byMatch) {
    const candidate = byMatch[1].trim();
    if (candidate.toLowerCase().includes('makoyawo') || candidate.toLowerCase().includes('mark')) {
      return 'Prophet Mark Makoyawo';
    }
    return candidate;
  }

  // 2. Look for ": NAME" or "| NAME"
  const colonMatch = cleanTitle.match(/[:|]\s*([^|:]+)/);
  if (colonMatch) {
    const candidate = colonMatch[1].trim();
    if (candidate.split(' ').length <= 5 && candidate.length > 2) {
      if (candidate.toLowerCase().includes('makoyawo') || candidate.toLowerCase().includes('mark')) {
        return 'Prophet Mark Makoyawo';
      }
      return candidate;
    }
  }

  // 3. Fallback: Unknown
  return "Unknown Speaker";
}

function videoMatchesSpeaker(video, speaker) {
  if (speaker === 'all') return true;
  if (speaker === 'pastor-name') return video.speaker === 'Prophet Mark Makoyawo';
  if (speaker === 'guest-speaker') return video.speaker !== 'Prophet Mark Makoyawo';
  return video.speaker === speaker;
}

function loadYouTubeVideos(order = 'date', pageToken = null, speaker = 'all') {
  const container = document.getElementById('youtube-videos');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pageInfo = document.getElementById('page-info');

  if (!container) return;

  // Show loading message
  container.innerHTML = '<p class="text-center text-gray-600 col-span-full">Loading videos...</p>';

  // Disable buttons during loading
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = true;

  let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=${order}&maxResults=${maxResults}`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  fetch(url)
    .then(res => {
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error('YouTube API key is invalid or expired. Please check your API key.');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      container.innerHTML = ''; // Clear loading message
      nextPageToken = data.nextPageToken || null;
      prevPageToken = data.prevPageToken || null;

      // Extract speakers
      data.items.forEach(item => {
        item.speaker = extractSpeaker(item.snippet.title);
      });

      // Collect unique speakers
      const uniqueSpeakers = new Set();
      data.items.forEach(item => {
        uniqueSpeakers.add(item.speaker);
      });

      // Update dropdown
      const speakerSelect = document.getElementById('youtube-speaker-select');
      if (speakerSelect) {
        speakerSelect.innerHTML = '<option value="all">All Speakers</option><option value="pastor-name">Prophet Mark Makoyawo</option><option value="guest-speaker">Guest Speaker</option>';
        Array.from(uniqueSpeakers).sort().forEach(s => {
          if (s !== 'Prophet Mark Makoyawo' && s !== 'Unknown Speaker') {
            speakerSelect.innerHTML += `<option value="${s}">${s}</option>`;
          }
        });
      }

      // Sort videos to prioritize Prophet Mark Makoyawo
      data.items.sort((a, b) => {
        const aIsPastor = a.speaker === 'Prophet Mark Makoyawo';
        const bIsPastor = b.speaker === 'Prophet Mark Makoyawo';
        if (aIsPastor && !bIsPastor) return -1;
        if (!aIsPastor && bIsPastor) return 1;
        return 0;
      });

      // Filter videos by speaker
      if (speaker !== 'all') {
        data.items = data.items.filter(item => videoMatchesSpeaker(item, speaker));
      }

      // Update page info
      if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage}`;
      }

      // Update button states
      if (prevBtn) prevBtn.disabled = !prevPageToken;
      if (nextBtn) nextBtn.disabled = !nextPageToken;

      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          if (item.id.kind === "youtube#video") {
            const videoId = item.id.videoId;
            const speaker = item.speaker;
            const publishedDate = new Date(item.snippet.publishedAt);
            const formattedDate = publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card bg-white p-4 rounded-2xl shadow-md';
            videoCard.innerHTML = `
              <div class="aspect-video mb-4">
                <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen class="w-full h-full rounded-xl"></iframe>
              </div>
              <h4 class="text-lg font-semibold mb-2">${item.snippet.title}</h4>
              <p class="text-gray-600 text-sm">Speaker: ${speaker}</p>
              <p class="text-gray-600 text-sm">Date: ${formattedDate}</p>
            `;
            container.appendChild(videoCard);
          }
        });
      } else {
        container.innerHTML = '<p class="text-center text-gray-600 col-span-full">No videos found.</p>';
      }
    })
    .catch(err => {
      console.error('Error fetching YouTube videos:', err);
      container.innerHTML = '<p class="text-center text-red-500 col-span-full">Failed to load videos. Please try again later.</p>';
      // Re-enable buttons on error
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    });
}

// Event listeners for sorting and pagination
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('youtube-sort-select');
  const speakerSelect = document.getElementById('youtube-speaker-select');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');

  // Load initial videos
  loadYouTubeVideos(currentOrder, null, currentSpeaker);

  // Sort change handler
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentOrder = sortSelect.value;
      currentPage = 1;
      nextPageToken = null;
      prevPageToken = null;
      loadYouTubeVideos(currentOrder, null, currentSpeaker);
    });
  }

  // Speaker change handler
  if (speakerSelect) {
    speakerSelect.addEventListener('change', () => {
      currentSpeaker = speakerSelect.value;
      currentPage = 1;
      nextPageToken = null;
      prevPageToken = null;
      loadYouTubeVideos(currentOrder, null, currentSpeaker);
    });
  }

  // Previous page handler
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (prevPageToken) {
        currentPage--;
        loadYouTubeVideos(currentOrder, prevPageToken, currentSpeaker);
      }
    });
  }

  // Next page handler
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (nextPageToken) {
        currentPage++;
        loadYouTubeVideos(currentOrder, nextPageToken, currentSpeaker);
      }
    });
  }
});

// Sermon Filtering for Static List
const speakerSelect = document.getElementById('speaker-select');
const sortSelect = document.getElementById('sort-select');
const sermonList = document.getElementById('sermon-list');

function filterSermons() {
  if (!sermonList) return;

  const selectedSpeaker = speakerSelect ? speakerSelect.value : 'all';
  const selectedSort = sortSelect ? sortSelect.value : 'date-desc';

  const sermons = sermonList.querySelectorAll('.bg-gray-100');
  const sermonsArray = Array.from(sermons);

  // Filter by speaker
  let filtered = sermonsArray.filter(sermon => {
    const speakerElement = sermon.querySelector('p:nth-child(2)');
    if (!speakerElement) return true;
    const speakerText = speakerElement.textContent;
    const speaker = speakerText.replace('Speaker: ', '').trim();

    if (selectedSpeaker === 'all') return true;
    if (selectedSpeaker === 'pastor-name') return speaker === 'Prophet Mark Makoyawo';
    if (selectedSpeaker === 'guest-speaker') return speaker === 'Guest Speaker';
    return true;
  });

  // Sort by date
  filtered.sort((a, b) => {
    const dateAElement = a.querySelector('p:nth-child(3)');
    const dateBElement = b.querySelector('p:nth-child(3)');
    if (!dateAElement || !dateBElement) return 0;

    const dateA = new Date(dateAElement.textContent.replace('Date: ', '').trim());
    const dateB = new Date(dateBElement.textContent.replace('Date: ', '').trim());

    if (selectedSort === 'date-desc') return dateB - dateA;
    if (selectedSort === 'date-asc') return dateA - dateB;
    return 0;
  });

  // Hide all sermons
  sermonsArray.forEach(sermon => {
    sermon.style.display = 'none';
  });

  // Show filtered sermons
  filtered.forEach(sermon => {
    sermon.style.display = 'block';
  });
}

// Add event listeners
if (speakerSelect) {
  speakerSelect.addEventListener('change', filterSermons);
}
if (sortSelect) {
  sortSelect.addEventListener('change', filterSermons);
}

// Initial filter
filterSermons();

// Initial render
renderCalendar();