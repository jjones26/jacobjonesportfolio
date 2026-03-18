/* ═══════════════════════════════════════════
   JAKE JONES PORTFOLIO — script.js
═══════════════════════════════════════════ */

// ── Page load progress bar ──────────────────
const progressBar = document.getElementById('progress-bar');

// Simulate progress on load
let prog = 0;
const progInterval = setInterval(() => {
    prog += Math.random() * 18;
    if (prog >= 90) { prog = 90; clearInterval(progInterval); }
    progressBar.style.width = prog + '%';
}, 80);

window.addEventListener('load', () => {
    clearInterval(progInterval);
    progressBar.style.width = '100%';
    progressBar.style.transition = 'width 0.3s ease, opacity 0.4s ease 0.3s';
    setTimeout(() => { progressBar.style.opacity = '0'; }, 400);
    setTimeout(() => { progressBar.style.display = 'none'; }, 900);
});

// ── Theme toggle ────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const root = document.documentElement;

// Light is default. Only switch to dark if user previously chose it.
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    root.classList.remove('light');
    updateToggleIcon(false);
} else {
    root.classList.add('light');
    updateToggleIcon(true);
}

function updateToggleIcon(isLight) {
    // In light mode show moon (click to go dark), in dark mode show sun (click to go light)
    const icon = isLight ? '🌙' : '☀️';
    if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = icon;
    if (themeToggleMobile) themeToggleMobile.querySelector('.theme-icon-mobile').textContent = icon;
}

function toggleTheme() {
    const isNowLight = root.classList.toggle('light');
    localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
    updateToggleIcon(isNowLight);
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);


const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// ── Nav: mobile toggle ──────────────────────
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navMobile.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('open');
    });
});

// ── Terminal typewriter ──────────────────────
const terminalBody = document.getElementById('terminalBody');

const lines = [
    { type: 'prompt', text: 'whoami' },
    { type: 'output', text: 'jake_jones — dev, dad, Bills fan' },
    { type: 'prompt', text: 'ls ./skills' },
    { type: 'output', text: 'godot/  unity/  csharp/  html5/  js/  css/' },
    { type: 'prompt', text: 'cat ./status.txt' },
    { type: 'success', text: '✓ Open to freelance & full-time opportunities' },
    { type: 'prompt', text: 'ls ./games' },
    { type: 'output', text: 'space-arena  daily-crostic  rogue-ball' },
    { type: 'prompt', text: '_', blink: true },
];

let lineIndex = 0;
let charIndex = 0;
let isTyping = false;

function createLineEl(line) {
    const span = document.createElement('span');
    span.classList.add('t-line');

    if (line.type === 'prompt') {
        span.innerHTML = `<span class="t-prompt">jake@dev:~$ </span><span class="t-cmd"></span>`;
    } else if (line.type === 'output') {
        span.innerHTML = `<span class="t-out"></span>`;
    } else if (line.type === 'success') {
        span.innerHTML = `<span class="t-success"></span>`;
    }

    return span;
}

function typeNextLine() {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];

    if (line.blink) {
        // Final blinking cursor line
        const span = document.createElement('span');
        span.classList.add('t-line');
        span.innerHTML = `<span class="t-prompt">jake@dev:~$ </span><span class="cursor-blink">▋</span>`;
        terminalBody.appendChild(span);
        return;
    }

    const lineEl = createLineEl(line);
    terminalBody.appendChild(lineEl);

    // Get the text target element
    let target;
    if (line.type === 'prompt')  target = lineEl.querySelector('.t-cmd');
    if (line.type === 'output')  target = lineEl.querySelector('.t-out');
    if (line.type === 'success') target = lineEl.querySelector('.t-success');

    const text = line.text;
    let ci = 0;

    const speed = line.type === 'prompt' ? 55 : 18;

    function typeChar() {
        if (ci < text.length) {
            target.textContent += text[ci];
            ci++;
            setTimeout(typeChar, speed);
        } else {
            // Line done — pause then next line
            lineIndex++;
            const pause = line.type === 'prompt' ? 400 : 200;
            setTimeout(typeNextLine, pause);
        }
    }

    typeChar();
}

// Start terminal after hero animations
setTimeout(() => {
    typeNextLine();
}, 1200);

// ── Scroll reveal for projects ──────────────
const projectCards = document.querySelectorAll('.project-feature');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 120);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => revealObserver.observe(card));

// ── Scroll reveal for cert cards ─────────────
const certCards = document.querySelectorAll('.cert-card');

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 120);
            certObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

certCards.forEach(c => certObserver.observe(c));

// ── Smooth active nav highlighting ──────────
const sections = document.querySelectorAll('section[id], footer');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}`
                    ? 'var(--green)'
                    : '';
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
