// ========== QUOTES WITH CHARACTER MAPPING ==========
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    character: "tanjiro",
    mood: "determined",
  },
  {
    text: "In the depth of winter, I found within me an invincible summer.",
    character: "gojo",
    mood: "serene",
  },
  {
    text: "The wound is the place where the light enters you.",
    character: "itadori",
    mood: "hopeful",
  },
  { text: "What we think, we become.", character: "l", mood: "contemplative" },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    character: "gon",
    mood: "joyful",
  },
  {
    text: "No one saves us but ourselves. We must walk the path.",
    character: "thorfinn",
    mood: "resolute",
  },
  { text: "The obstacle is the path.", character: "levi", mood: "intense" },
  { text: "Be water, my friend.", character: "giyu", mood: "calm" },
  {
    text: "In the middle of difficulty lies opportunity.",
    character: "naruto",
    mood: "determined",
  },
  {
    text: "The only true wisdom is knowing you know nothing.",
    character: "askeladd",
    mood: "sagely",
  },
  {
    text: "That which does not kill us makes us stronger.",
    character: "eren",
    mood: "fierce",
  },
  { text: "Man is condemned to be free.", character: "light", mood: "dark" },
  {
    text: "Even if the world were to end tomorrow, I would plant an apple tree today.",
    character: "shanks",
    mood: "wise",
  },
  {
    text: "To live is the rarest thing. Most people exist, that is all.",
    character: "killua",
    mood: "reflective",
  },
  {
    text: "The soul becomes dyed with the color of its thoughts.",
    character: "itachi",
    mood: "mysterious",
  },
  {
    text: "What matters in life is not what happens to you but what you remember.",
    character: "luffy",
    mood: "nostalgic",
  },
  {
    text: "A man sees in the world what he carries in his heart.",
    character: "canute",
    mood: "gentle",
  },
  {
    text: "Those who look outside dream. Those who look inside awaken.",
    character: "l",
    mood: "analytical",
  },
  {
    text: "The privilege of a lifetime is to become who you truly are.",
    character: "gojo",
    mood: "confident",
  },
  {
    text: "Whatever you fight, you strengthen. What you resist, persists.",
    character: "sukuna",
    mood: "intense",
  },
  {
    text: "Life can only be understood backwards, but it must be lived forwards.",
    character: "itachi",
    mood: "melancholic",
  },
  {
    text: "The unexamined life is not worth living.",
    character: "light",
    mood: "contemplative",
  },
  {
    text: "One must imagine Sisyphus happy.",
    character: "thorfinn",
    mood: "philosophical",
  },
  { text: "Hell is other people.", character: "hisoka", mood: "dark" },
  {
    text: "Simplicity is the ultimate sophistication.",
    character: "levi",
    mood: "precise",
  },
  {
    text: "The quieter you become, the more you can hear.",
    character: "giyu",
    mood: "serene",
  },
  { text: "Fear is the mind-killer.", character: "eren", mood: "intense" },
  {
    text: "People who can't throw something away can never hope to change something.",
    character: "rengoku",
    mood: "passionate",
  },
  {
    text: "The world is not beautiful, therefore it is.",
    character: "zoro",
    mood: "stoic",
  },
  {
    text: "A lesson without pain is meaningless.",
    character: "naruto",
    mood: "wise",
  },
  {
    text: "Stand up and walk. Keep moving forward.",
    character: "itadori",
    mood: "determined",
  },
  {
    text: "Power comes in response to a need, not a desire.",
    character: "gon",
    mood: "intense",
  },
  {
    text: "The true measure of a shinobi is not how he lives but how he dies.",
    character: "itachi",
    mood: "solemn",
  },
  {
    text: "I'll take a potato chip... and eat it!",
    character: "light",
    mood: "dramatic",
  },
  {
    text: "Throughout Heaven and Earth, I alone am the honored one.",
    character: "gojo",
    mood: "supreme",
  },
  {
    text: "If you don't like your destiny, don't accept it.",
    character: "naruto",
    mood: "defiant",
  },
  {
    text: "The strong don't win. The winners are the strong.",
    character: "sukuna",
    mood: "ruthless",
  },
  { text: "Set your heart ablaze.", character: "rengoku", mood: "burning" },
  { text: "Nothing happened.", character: "zoro", mood: "resolute" },
  {
    text: "I don't want to conquer anything. I just want to be free.",
    character: "luffy",
    mood: "free",
  },
];

// ========== FOCUS MODE STATE ==========
let focusModeActive = false;
let focusModeSpeedMultiplier = 1;

// ========== CHARACTER SWITCHING ==========
let currentCharacter = null;

function setCharacter(characterId) {
  if (currentCharacter === characterId) return;
  currentCharacter = characterId;

  const presence = document.getElementById("anime-presence");
  if (!presence) return;

  const layers = presence.querySelectorAll(".character-layer");

  // Fade out all layers
  layers.forEach((layer) => {
    layer.classList.remove("visible");
  });

  // Fade in the matching character
  const targetLayer = presence.querySelector(
    `[data-character="${characterId}"]`,
  );
  if (targetLayer) {
    setTimeout(() => {
      targetLayer.classList.add("visible");
      presence.classList.add("active");
    }, 300);
  }
}

function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );
  return quotes[dayOfYear % quotes.length];
}

// ========== FOCUS MODE ==========
function initFocusMode() {
  // Load saved state from chrome.storage
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(["focusMode"], (result) => {
      if (result.focusMode) {
        enableFocusMode(false); // Don't save again, just apply
      }
    });
  }
}

function toggleFocusMode() {
  if (focusModeActive) {
    disableFocusMode();
  } else {
    enableFocusMode(true);
  }
}

function enableFocusMode(save = true) {
  focusModeActive = true;
  focusModeSpeedMultiplier = 0.4; // Slow down particle movement
  document.body.classList.add("focus-mode");

  // Show focus indicator briefly
  const indicator = document.getElementById("focus-indicator");
  if (indicator) {
    indicator.classList.add("visible");
    setTimeout(() => indicator.classList.remove("visible"), 2000);
  }

  // Show focus time
  const focusTime = document.getElementById("focus-time");
  if (focusTime) {
    focusTime.classList.add("visible");
    updateFocusTime();
  }

  // Save to chrome.storage
  if (
    save &&
    typeof chrome !== "undefined" &&
    chrome.storage &&
    chrome.storage.sync
  ) {
    chrome.storage.sync.set({ focusMode: true });
  }
}

function disableFocusMode() {
  focusModeActive = false;
  focusModeSpeedMultiplier = 1;
  document.body.classList.remove("focus-mode");

  // Hide focus time
  const focusTime = document.getElementById("focus-time");
  if (focusTime) {
    focusTime.classList.remove("visible");
  }

  // Save to chrome.storage
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set({ focusMode: false });
  }

  // Refocus search when exiting focus mode
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 100);
  }
}

function updateFocusTime() {
  const focusTime = document.getElementById("focus-time");
  if (!focusTime || !focusModeActive) return;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  focusTime.textContent = `${hours}:${minutes}`;
}

// Update focus time every minute
setInterval(updateFocusTime, 60000);

// Default timeline events
const defaultTimelineEvents = [
  { time: "06:00", label: "Morning ritual", type: "routine" },
  { time: "09:00", label: "Deep work", type: "focus" },
  { time: "12:00", label: "Midday", type: "routine" },
  { time: "14:00", label: "Build session", type: "focus" },
  { time: "17:00", label: "Review", type: "routine" },
  { time: "20:00", label: "Evening", type: "rest" },
];

// Get events to display
function getTimelineEvents() {
  return defaultTimelineEvents;
}

// ========== TIMELINE CALENDAR ==========

function updateTimeline() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinutes;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Update today header
  const dayEl = document.getElementById("timeline-day");
  const dateEl = document.getElementById("timeline-date");
  if (dayEl) dayEl.textContent = days[now.getDay()];
  if (dateEl) dateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}`;

  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  // Clear existing items (keep line and today header)
  const existingItems = timeline.querySelectorAll(".timeline-item");
  existingItems.forEach((item) => item.remove());

  // Create timeline items
  const timelineEvents = getTimelineEvents();
  const currentTimeStr =
    currentHour.toString().padStart(2, "0") +
    ":" +
    currentMinutes.toString().padStart(2, "0");
  timelineEvents.forEach((event, index) => {
    const [hours, mins] = event.time.split(":").map(Number);
    const eventTime = hours * 60 + mins;

    let status = "future";
    if (
      event.type === "now" ||
      (eventTime <= currentTime && eventTime + 120 > currentTime)
    ) {
      status = "now";
    } else if (eventTime < currentTime) {
      status = "past";
    }

    const item = document.createElement("div");
    item.className = `timeline-item ${status}`;
    item.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-time">${status === "now" ? currentTimeStr : event.time}</div>
        <div class="timeline-label">${status === "now" ? "Now" : event.label}</div>
      </div>
      <div class="timeline-dot"></div>
    `;
    timeline.appendChild(item);
  });
}

// ========== SEARCH ==========
function initSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;

      // Check if it's a URL
      const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i;

      if (urlPattern.test(query)) {
        const url = query.startsWith("http") ? query : `https://${query}`;
        window.location.href = url;
      } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    }
  });
}

// ========== TIME-BASED ACCENT COLOR ==========
function updateAccentColor() {
  const hour = new Date().getHours();
  let hue;

  if (hour >= 5 && hour < 9) {
    hue = 20; // Early morning: warm orange-pink
  } else if (hour >= 9 && hour < 12) {
    hue = 220; // Morning: soft blue
  } else if (hour >= 12 && hour < 17) {
    hue = 270; // Afternoon: purple
  } else if (hour >= 17 && hour < 20) {
    hue = 320; // Evening: warm purple-red
  } else {
    hue = 250; // Night: deep purple-blue
  }

  const accentColor = `hsl(${hue}, 35%, 55%)`;
  const accentGlow = `hsla(${hue}, 35%, 55%, 0.3)`;

  document.documentElement.style.setProperty("--accent", accentColor);
  document.documentElement.style.setProperty("--accent-glow", accentGlow);
}

// ========== CURSOR GLOW ==========
let mouseX = 0,
  mouseY = 0;
let glowX = 0,
  glowY = 0;
let presenceX = 0,
  presenceY = 0;

function initCursorEffects() {
  const cursorGlow = document.getElementById("cursor-glow");
  const animePresence = document.getElementById("anime-presence");

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Subtle parallax for anime presence (inverted for right-side placement)
    const moveX = (e.clientX / window.innerWidth - 0.5) * -12;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 8;
    presenceX += (moveX - presenceX) * 0.02;
    presenceY += (moveY - presenceY) * 0.02;
  });

  // Animate presence parallax
  function animatePresence() {
    if (animePresence) {
      animePresence.style.transform = `translate(${presenceX}px, ${presenceY}px)`;
    }
    requestAnimationFrame(animatePresence);
  }
  animatePresence();

  // Animate cursor glow
  function animateCursorGlow() {
    if (cursorGlow) {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();
}

// ========== CALM PARTICLE BACKGROUND ==========
let canvas, ctx;
let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.baseSpeedX = (Math.random() - 0.5) * 0.15;
    this.baseSpeedY = (Math.random() - 0.5) * 0.08 - 0.02; // Slight upward drift
    this.opacity = Math.random() * 0.15 + 0.03;
    this.life = 0;
    this.maxLife = Math.random() * 1200 + 600;
    // Noise offset for organic movement
    this.noiseOffsetX = Math.random() * 1000;
    this.noiseOffsetY = Math.random() * 1000;
  }

  update() {
    this.life++;

    // Apply focus mode speed reduction
    const speed = focusModeSpeedMultiplier;

    // Organic noise-based movement
    const noiseX = Math.sin(this.life * 0.002 + this.noiseOffsetX) * 0.1;
    const noiseY = Math.cos(this.life * 0.0015 + this.noiseOffsetY) * 0.08;

    this.x += (this.baseSpeedX + noiseX) * speed;
    this.y += (this.baseSpeedY + noiseY) * speed;

    // Very subtle cursor attraction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200 && dist > 0) {
      this.x += (dx / dist) * 0.03 * speed;
      this.y += (dy / dist) * 0.03 * speed;
    }

    // Wrap around screen edges
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;

    // Reset if life exceeded
    if (this.life > this.maxLife) {
      this.reset();
    }
  }

  draw() {
    const fadeIn = Math.min(this.life / 100, 1);
    const fadeOut = Math.max((this.maxLife - this.life) / 100, 0);
    const alpha = this.opacity * fadeIn * Math.min(fadeOut, 1);

    // Further reduce opacity in focus mode
    const finalAlpha = focusModeActive ? alpha * 0.6 : alpha;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124, 111, 156, ${finalAlpha})`;
    ctx.fill();
  }
}

function initBackground() {
  canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create particles - subtle and sparse
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ========== KEYBOARD SHORTCUTS ==========
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    const searchInput = document.getElementById("search-input");

    // F key toggles focus mode (when not typing in search)
    if (e.key === "f" || e.key === "F") {
      if (document.activeElement !== searchInput) {
        e.preventDefault();
        toggleFocusMode();
        return;
      }
    }

    // Escape exits focus mode
    if (e.key === "Escape" && focusModeActive) {
      disableFocusMode();
      return;
    }

    // Any printable key focuses search (when not in focus mode)
    if (
      !focusModeActive &&
      document.activeElement !== searchInput &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey &&
      e.key.length === 1 &&
      e.key !== "f" &&
      e.key !== "F"
    ) {
      searchInput.focus();
    }
  });
}

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  // Initialize quote and character
  const quoteEl = document.getElementById("daily-quote");
  if (quoteEl) {
    const dailyQuote = getDailyQuote();
    quoteEl.textContent = `"${dailyQuote.text}"`;
    setCharacter(dailyQuote.character);
  }

  // Initialize all systems
  updateTimeline();
  setInterval(updateTimeline, 60000);

  initSearch();

  updateAccentColor();
  setInterval(updateAccentColor, 60000);

  initCursorEffects();
  initBackground();
  initKeyboardShortcuts();

  // Initialize focus mode (loads saved state)
  initFocusMode();
  updateFocusTime();

  // Auto-focus search on load (if not in focus mode)
  const searchInput = document.getElementById("search-input");
  if (searchInput && !focusModeActive) {
    setTimeout(() => searchInput.focus(), 100);
  }
});
