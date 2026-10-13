document.addEventListener('DOMContentLoaded', () => {
    const hasBooted = sessionStorage.getItem('siteBooted');
    const bootScreen = document.getElementById('boot-screen');

    if (!hasBooted) {
        setTimeout(() => {
            document.body.classList.add('loaded');

            setTimeout(() => {
                if (bootScreen) {
                    bootScreen.remove();
                }
            }, 900);

        }, 1800);

        sessionStorage.setItem('siteBooted', 'true');
    } else {
        if (bootScreen) {
            bootScreen.style.display = 'none';
            bootScreen.remove();
        }
        document.body.classList.add('loaded');
    }

    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge('2010-06-17');
    }
});

const projects = [
    { title: 'Hoshibi', emoji: '🌸', progress: 'Eine Sammlung von Web-Apps und Projekten, die ich nach Bedarf selbst erstellt habe.', url: 'https://hoshibi.de' },
    { title: 'GitHub', emoji: '💻', progress: 'Meine Code-Projekte: Hoshibi-Dienste, Tools und Spiele.', url: 'https://github.com/nico-vhm' }
];

let socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100090499627426', emoji: 'f', icon: 'fab fa-facebook' },
    { name: 'X', url: 'https://x.com/Xgamerthefirst', emoji: '𝕏', icon: 'fab fa-twitter' },
    { name: 'Instagram', url: 'https://www.instagram.com/nico_vhm/', emoji: '📷', icon: 'fab fa-instagram' },
    { name: 'Discord', url: 'https://discord.com/users/993164241299308674', emoji: '💜', icon: 'fab fa-discord' },
    { name: 'Twitch', url: 'https://www.twitch.tv/xgamerthefirst', emoji: '🎮', icon: 'fab fa-twitch' }
];

function el(id) { return document.getElementById(id); }
let sectionsContainer = el('sections');
let themeToggleEl = el('themeToggle');
const rootEl = document.documentElement;

let isDark = localStorage.getItem('darkMode') !== 'false';
document.body.classList.toggle('dark', isDark);
rootEl.classList.toggle('dark', isDark);

if (themeToggleEl) {
    themeToggleEl.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark', isDark);
        rootEl.classList.toggle('dark', isDark);
        localStorage.setItem('darkMode', isDark);
    });
}

function updateCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(n => n.textContent = year);
}

function renderGoals() {
    if (!sectionsContainer) sectionsContainer = el('sections');
    if (!sectionsContainer) return;

    sectionsContainer.innerHTML = '';
    projects.forEach(p => {
        const li = document.createElement('li');
        li.className = 'goal-card';
        li.style.cursor = 'pointer';
        li.innerHTML = `
            <div class="goal-image">${p.emoji}</div>
            <div class="goal-content">
                <h3 class="goal-title">${escapeHtml(p.title)}</h3>
                <p class="goal-status">🟢 Live</p>
                <p class="goal-progress">${escapeHtml(p.progress)}</p>
            </div>
        `;
        li.addEventListener('click', () => window.open(p.url, '_blank', 'noopener'));
        sectionsContainer.appendChild(li);
    });
}

function renderSocialLinks() {
    const socialLinksDiv = el('socialLinks');
    const headerSocialLinksDiv = el('headerSocialLinks');
    if (socialLinksDiv) socialLinksDiv.innerHTML = '';
    if (headerSocialLinksDiv) headerSocialLinksDiv.innerHTML = '';

    socialLinks.forEach(link => {
        if (socialLinksDiv) {
            const a = document.createElement('a');
            a.href = escapeHtml(link.url);
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'social-link';
            a.title = link.name;
            if (link.icon) {
                const icon = document.createElement('i');
                icon.className = link.icon;
                a.appendChild(icon);
            } else {
                a.textContent = link.emoji;
            }
            socialLinksDiv.appendChild(a);
        }

        if (headerSocialLinksDiv) {
            const aSmall = document.createElement('a');
            aSmall.href = escapeHtml(link.url);
            aSmall.target = '_blank';
            aSmall.rel = 'noopener';
            aSmall.className = 'social-link-small';
            aSmall.title = link.name;
            if (link.icon) {
                const iconSmall = document.createElement('i');
                iconSmall.className = link.icon;
                aSmall.appendChild(iconSmall);
            } else {
                aSmall.textContent = link.emoji;
            }
            headerSocialLinksDiv.appendChild(aSmall);
        }
    });
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

renderGoals();
renderSocialLinks();
updateCopyrightYear();

const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (href === '/' && page === 'index.html')) a.setAttribute('aria-current', 'page');
});

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}
