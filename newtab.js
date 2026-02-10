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

// ========== MINIMAL TIME DISPLAY ==========

function updateTimeline() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

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

  // Update day and date
  const dayEl = document.getElementById("timeline-day");
  const dateEl = document.getElementById("timeline-date");
  if (dayEl) dayEl.textContent = days[now.getDay()];
  if (dateEl) dateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}`;

  // Update current time
  const hours12 = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";
  const timeStr = `${hours12}:${minutes.toString().padStart(2, "0")}`;

  const timeMain = document.getElementById("time-main");
  const timePeriod = document.getElementById("time-period");
  const timeSeconds = document.getElementById("time-seconds");

  if (timeMain) timeMain.textContent = timeStr;
  if (timePeriod) timePeriod.textContent = period;
  if (timeSeconds)
    timeSeconds.textContent = `:${seconds.toString().padStart(2, "0")}`;
}

// Update time every second for smooth seconds display
setInterval(updateTimeline, 1000);

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
  const leftPupil = document.getElementById("left-pupil");
  const rightPupil = document.getElementById("right-pupil");

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Subtle parallax for anime presence (inverted for right-side placement)
    const moveX = (e.clientX / window.innerWidth - 0.5) * -12;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 8;
    presenceX += (moveX - presenceX) * 0.02;
    presenceY += (moveY - presenceY) * 0.02;

    // Update Shiva eye pupils
    updateShivaPupils(e.clientX, e.clientY, leftPupil, rightPupil);
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

// ========== SHIVA EYES - PUPIL TRACKING ==========
function updateShivaPupils(cursorX, cursorY, leftPupil, rightPupil) {
  if (!leftPupil || !rightPupil) return;

  animatePupil(leftPupil, cursorX, cursorY);
  animatePupil(rightPupil, cursorX, cursorY);
}

function animatePupil(pupil, cursorX, cursorY) {
  const iris = pupil.closest(".eye-iris");
  if (!iris) return;

  const irisRect = iris.getBoundingClientRect();
  const irisCenterX = irisRect.left + irisRect.width / 2;
  const irisCenterY = irisRect.top + irisRect.height / 2;

  // Calculate direction to cursor
  const deltaX = cursorX - irisCenterX;
  const deltaY = cursorY - irisCenterY;
  const angle = Math.atan2(deltaY, deltaX);

  // Calculate distance (capped)
  const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 300);
  const maxOffset = 3; // Max pixels pupil can move
  const offset = (distance / 300) * maxOffset;

  // Apply movement
  const pupilX = Math.cos(angle) * offset;
  const pupilY = Math.sin(angle) * offset;

  pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
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
    // Regenerate hidden stars on resize
    generateHiddenStars();
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create particles - subtle and sparse
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  // Generate hidden constellation stars
  generateHiddenStars();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hidden stars that reveal on hover
    drawHiddenStars();

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ========== HIDDEN CONSTELLATION STARS ==========
let hiddenStars = [];

function generateHiddenStars() {
  hiddenStars = [];
  const numStars = Math.floor((canvas.width * canvas.height) / 25000); // Density based on screen size

  for (let i = 0; i < numStars; i++) {
    hiddenStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: 0,
      targetOpacity: 0,
      type: Math.random() > 0.7 ? "star" : "dot", // Some are 4-point stars
      pulseOffset: Math.random() * Math.PI * 2,
    });
  }
}

function drawHiddenStars() {
  const revealRadius = 150;
  const now = Date.now() * 0.002;

  hiddenStars.forEach((star) => {
    // Calculate distance from cursor
    const dx = mouseX - star.x;
    const dy = mouseY - star.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Set target opacity based on cursor distance
    if (dist < revealRadius) {
      star.targetOpacity = (1 - dist / revealRadius) * 0.8;
    } else {
      star.targetOpacity = 0;
    }

    // Smooth fade in/out
    star.opacity += (star.targetOpacity - star.opacity) * 0.1;

    if (star.opacity > 0.01) {
      // Add subtle pulse
      const pulse = 1 + Math.sin(now + star.pulseOffset) * 0.2;
      const size = star.size * pulse;

      ctx.save();
      ctx.globalAlpha = star.opacity;

      if (star.type === "star") {
        // Draw 4-point star
        ctx.beginPath();
        ctx.moveTo(star.x, star.y - size * 2);
        ctx.lineTo(star.x + size * 0.5, star.y);
        ctx.lineTo(star.x, star.y + size * 2);
        ctx.lineTo(star.x - size * 0.5, star.y);
        ctx.closePath();
        ctx.fillStyle = `rgba(180, 160, 255, 1)`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(star.x - size * 2, star.y);
        ctx.lineTo(star.x, star.y + size * 0.5);
        ctx.lineTo(star.x + size * 2, star.y);
        ctx.lineTo(star.x, star.y - size * 0.5);
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw glowing circle
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          size * 3,
        );
        gradient.addColorStop(0, "rgba(180, 160, 255, 1)");
        gradient.addColorStop(0.5, "rgba(150, 130, 220, 0.5)");
        gradient.addColorStop(1, "rgba(120, 100, 180, 0)");

        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.restore();
    }
  });
}

// ========== KEYBOARD SHORTCUTS ==========
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    const searchInput = document.getElementById("search-input");
    const modal = document.getElementById("add-app-modal");
    const isModalOpen = modal && modal.classList.contains("active");

    // Don't interfere when modal is open
    if (isModalOpen) {
      // Only handle Escape to close modal
      if (e.key === "Escape") {
        modal.classList.remove("active");
      }
      return;
    }

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
  setInterval(updateTimeline, 1000); // Update every second for live time

  initSearch();

  updateAccentColor();
  setInterval(updateAccentColor, 60000);

  initCursorEffects();
  initBackground();
  initKeyboardShortcuts();

  // Initialize focus mode (loads saved state)
  initFocusMode();
  updateFocusTime();

  // Initialize custom apps
  initCustomApps();

  // Auto-focus search on load (if not in focus mode)
  const searchInput = document.getElementById("search-input");
  if (searchInput && !focusModeActive) {
    setTimeout(() => searchInput.focus(), 100);
  }
});

// ========== CUSTOM APPS ==========
function initCustomApps() {
  const container = document.getElementById("my-apps-container");
  const addBtn = document.getElementById("add-app-btn");
  const modal = document.getElementById("add-app-modal");
  const nameInput = document.getElementById("app-name-input");
  const urlInput = document.getElementById("app-url-input");
  const cancelBtn = document.getElementById("cancel-add-app");
  const confirmBtn = document.getElementById("confirm-add-app");

  if (!container || !addBtn || !modal) return;

  // Load saved apps
  loadCustomApps();

  // Open modal
  addBtn.addEventListener("click", () => {
    modal.classList.add("active");
    nameInput.value = "";
    urlInput.value = "";
    nameInput.focus();
  });

  // Close modal
  cancelBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Add app
  confirmBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
      let finalUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        finalUrl = "https://" + url;
      }

      getCustomApps((apps) => {
        apps.push({ name, url: finalUrl });
        saveCustomApps(apps, () => {
          loadCustomApps();
          modal.classList.remove("active");
        });
      });
    }
  });

  // Enter key to submit
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      confirmBtn.click();
    }
  });
  
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      urlInput.focus();
    }
  });
}

function getCustomApps(callback) {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get(["customApps"], (result) => {
      callback(result.customApps || []);
    });
  } else {
    // Fallback for testing outside extension
    const saved = localStorage.getItem("customApps");
    callback(saved ? JSON.parse(saved) : []);
  }
}

function saveCustomApps(apps, callback) {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.set({ customApps: apps }, () => {
      if (callback) callback();
    });
  } else {
    // Fallback for testing outside extension
    localStorage.setItem("customApps", JSON.stringify(apps));
    if (callback) callback();
  }
}

function loadCustomApps() {
  const container = document.getElementById("my-apps-container");
  const addBtn = document.getElementById("add-app-btn");
  if (!container || !addBtn) return;

  getCustomApps((apps) => {
    // Remove existing custom apps
    const existing = container.querySelectorAll(".custom-app-icon");
    existing.forEach((el) => el.remove());

    // Add saved apps
    apps.forEach((app, index) => {
      const link = document.createElement("a");
      link.href = app.url;
      link.className = "app-icon custom-app-icon";
      link.title = app.name;

      // Get favicon from the URL
      try {
        const domain = new URL(app.url).origin;
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

        link.innerHTML = `
          <img src="${faviconUrl}" alt="${app.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22white%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'" />
          <button class="remove-app" data-index="${index}">&times;</button>
        `;

        container.insertBefore(link, addBtn);
      } catch (e) {
        console.error("Invalid URL:", app.url);
      }
    });

    // Add remove handlers
    container.querySelectorAll(".remove-app").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const index = parseInt(btn.dataset.index);
        getCustomApps((apps) => {
          apps.splice(index, 1);
          saveCustomApps(apps, () => {
            loadCustomApps();
          });
        });
      });
    });
  });
}
