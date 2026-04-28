// Safe element text/HTML setter — handles missing elements on other pages
function setInner(id, val, isHTML) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isHTML) el.innerHTML = val;
    else el.innerText = val;
}

function openGoogleForm(e) {
    e.preventDefault();
    window.open('https://forms.gle/mKosqSVN2EjaukXx8', '_blank');
}

function changeLanguage(lang) {
    const t = translations[lang] || translations['en'];

    // Nav — present on all pages
    setInner('nav-mission',    t.navMission);
    setInner('nav-impact',     t.navImpact);
    setInner('nav-pricing',    t.navPricing);
    setInner('nav-portfolio',  t.navPortfolio);
    setInner('nav-mission-m',  t.navMission);
    setInner('nav-impact-m',   t.navImpact);
    setInner('nav-pricing-m',  t.navPricing);
    setInner('nav-portfolio-m',t.navPortfolio);
    setInner('cta-btn',        t.cta);
    setInner('footer-copy',    t.footerCopy);
    setInner('current-lang-text', lang.toUpperCase());

    // Hero — index.html
    setInner('hero-tag',    t.heroTag);
    setInner('hero-title',  t.heroTitle, true);
    setInner('hero-desc',   t.heroDesc);
    setInner('hero-footer', t.heroFooter);

    // Mission — index.html
    setInner('mission-title',  t.missionTitle);
    setInner('mission-desc',   t.missionDesc);
    setInner('mission-feat-1', t.missionFeat1);
    setInner('mission-feat-2', t.missionFeat2);
    setInner('sim-tag',        t.simTag);
    setInner('aqi-status',     t.aqiStatus);
    setInner('ai-footer-msg',  t.aiFooterMsg);

    // Impact — index.html
    setInner('impact-title', t.impactTitle);
    setInner('card1-title',  t.card1Title); setInner('card1-desc', t.card1Desc);
    setInner('card2-title',  t.card2Title); setInner('card2-desc', t.card2Desc);
    setInner('card3-title',  t.card3Title); setInner('card3-desc', t.card3Desc);

    // Pricing — pricing.html
    setInner('pricing-page-title',   t.pricingPageTitle);
    setInner('pricing-page-subtitle',t.pricingSubtitle);
    setInner('pricing-title',        t.pricingTitle);
    setInner('pricing-subtitle',     t.pricingSubtitle);
    setInner('pricing-badge',        t.pricingBadge);
    setInner('pricing-note',         t.pricingNote);
    setInner('quote-title',          t.quoteTitle);
    setInner('quote-desc',           t.quoteDesc);
    setInner('quote-cta',            t.quoteCta);
    document.querySelectorAll('.pricing-once').forEach(el => el.innerText = t.pricingOnce);

    const pricingLists = document.querySelectorAll('.pricing-features');
    const starterIcons = ['✅', '✅', '❌', '❌'];
    if (pricingLists[0] && t.starterFeats) {
        pricingLists[0].querySelectorAll('li').forEach((li, i) => {
            if (t.starterFeats[i] !== undefined) li.innerText = starterIcons[i] + ' ' + t.starterFeats[i];
        });
    }
    if (pricingLists[1] && t.proFeats) {
        pricingLists[1].querySelectorAll('li').forEach((li, i) => {
            if (t.proFeats[i] !== undefined) li.innerText = '✅ ' + t.proFeats[i];
        });
    }
    if (pricingLists[2] && t.premiumFeats) {
        pricingLists[2].querySelectorAll('li').forEach((li, i) => {
            if (t.premiumFeats[i] !== undefined) li.innerText = '✅ ' + t.premiumFeats[i];
        });
    }

    // Portfolio — portfolio.html
    setInner('portfolio-title',    t.portfolioTitle);
    setInner('portfolio-subtitle', t.portfolioSubtitle);
    for (let i = 1; i <= 6; i++) {
        setInner('p' + i + '-title', t['p' + i + 'Title']);
        setInner('p' + i + '-desc',  t['p' + i + 'Desc']);
    }

    localStorage.setItem('preferredLang', lang);
    const dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.remove('show');
}

function closeMobileMenu() {
    const m = document.getElementById('mobile-menu');
    if (m) m.classList.remove('show');
}

// ── Initialization (runs after DOM is ready — scripts placed at end of body) ──

const html         = document.documentElement;
const themeToggle  = document.getElementById('theme-toggle');
const langBtn      = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const mobileMenuBtn= document.getElementById('mobile-menu-btn');
const mobileMenu   = document.getElementById('mobile-menu');

// Theme toggle
if (themeToggle) {
    const dot = themeToggle.querySelector('.toggle-dot');
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        if (dot) {
            const travel = themeToggle.offsetWidth - dot.offsetWidth - 8;
            dot.style.transform = isDark ? `translateX(${travel}px)` : 'translateX(0)';
        }
        const iconEl = document.getElementById('theme-icon-inner');
        if (iconEl) iconEl.innerText = isDark ? '☀️' : '🌙';
        localStorage.setItem('preferredTheme', isDark ? 'dark' : 'light');
    });
}

// Language dropdown
if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
}

// Mobile menu
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('show');
    });
}

// Close dropdowns on outside click
window.addEventListener('click', () => {
    if (langDropdown) langDropdown.classList.remove('show');
    if (mobileMenu)   mobileMenu.classList.remove('show');
});

// Active nav highlight
(function highlightNav() {
    const path = window.location.pathname;
    if (path.includes('pricing'))   document.getElementById('nav-pricing')?.classList.add('nav-active');
    if (path.includes('portfolio')) document.getElementById('nav-portfolio')?.classList.add('nav-active');
})();

// AQI live widget — only on index.html
const _aqiInterval = setInterval(() => {
    const aqiVal = document.getElementById('aqi-value');
    const o2Val  = document.getElementById('o2-value');
    const aqiBar = document.getElementById('aqi-bar');
    if (!aqiVal) { clearInterval(_aqiInterval); return; }
    const aqi = Math.floor(Math.random() * 8) + 8;
    aqiVal.innerText = aqi;
    if (o2Val)  o2Val.innerText = Math.floor(Math.random() * 5) + 20;
    if (aqiBar) aqiBar.style.width = aqi + '%';
}, 3000);

// Scroll save — index.html
window.addEventListener('scroll', () => localStorage.setItem('scrollPos', window.scrollY));

// Load saved preferences
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'th';
    changeLanguage(savedLang);

    if (localStorage.getItem('preferredTheme') === 'dark') {
        html.classList.add('dark');
        const iconEl = document.getElementById('theme-icon-inner');
        if (iconEl) iconEl.innerText = '☀️';
        if (themeToggle) {
            const dot = themeToggle.querySelector('.toggle-dot');
            if (dot) {
                requestAnimationFrame(() => {
                    dot.style.transition = 'none';
                    const travel = themeToggle.offsetWidth - dot.offsetWidth - 8;
                    dot.style.transform = `translateX(${travel}px)`;
                    setTimeout(() => { dot.style.transition = ''; }, 50);
                });
            }
        }
    }
});
