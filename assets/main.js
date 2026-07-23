// أرض السواد — Land of Al-Sawad — Shared Behavior

const NAV_LABELS = {
    ar: {
        brandTop: "أرْض", brandBottom: "السَّــــــــــــــــــــــــوَاد",
        navHome: "الرئيسية", navBirds: "طيورنا الوطنية", navGuide: "ديوان الأشجار", navBlog: "المدونة",
        subSidr: "شجرة السدر", subAlbizia: "شجرة الألبيزيا",
        langBtn: "English",
        telegramBtn: "الانضمام إلى القناة الرسمية في تليغرام ←",
        footer: "جميع الحقوق محفوظة © أرض السَّواد ٢٠٢٦",
        searchPlaceholder: "بحث بالموقع..."
    },
    en: {
        brandTop: "Land of", brandBottom: "Al-Sawad",
        navHome: "Home", navBirds: "National Birds", navGuide: "Tree Almanac", navBlog: "Blog",
        subSidr: "Sidr Tree", subAlbizia: "Albizia Tree",
        langBtn: "العربية",
        telegramBtn: "Join the Official Telegram Channel ←",
        footer: "All Rights Reserved © Land of Al-Sawad 2026",
        searchPlaceholder: "Search the site..."
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (NAV_LABELS[lang][key] !== undefined) el.textContent = NAV_LABELS[lang][key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (NAV_LABELS[lang][key] !== undefined) el.placeholder = NAV_LABELS[lang][key];
    });

    if (typeof runSiteSearch === 'function') {
        const input = document.getElementById('site-search-input');
        if (input && input.value.trim()) runSiteSearch(input.value);
    }

    try { localStorage.setItem('siteLang', lang); } catch (e) { /* ignore */ }
}

function toggleLanguage() {
    const current = document.documentElement.lang === 'en' ? 'ar' : 'en';
    setLanguage(current);
}

function toggleMobileMenu() {
    document.getElementById('mobile-drawer').classList.toggle('active');
    document.getElementById('mobile-drawer-overlay').classList.toggle('active');
}
function closeMobileMenu() {
    document.getElementById('mobile-drawer').classList.remove('active');
    document.getElementById('mobile-drawer-overlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    let saved = 'ar';
    try { saved = localStorage.getItem('siteLang') || 'ar'; } catch (e) { /* ignore */ }
    setLanguage(saved);
});
// ===== صندوق التواصل الاجتماعي بالفوتر =====
const SOCIAL_LINKS = [
    { name: 'Telegram', url: 'https://t.me/alsawad1qr', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.9 4.3 2.9 11.6c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.5.8 1 .8.5 0 .7-.2 1-.5l2.4-2.3 5 3.6c.9.5 1.5.2 1.8-.8l3.2-15.3c.3-1.3-.4-1.9-1.9-1.5zM8.6 14.6l9.2-8.3c.4-.4-.1-.6-.6-.2L6.8 13.3l-4.4-1.4z"/></svg>' },
    { name: 'Instagram', url: 'https://www.instagram.com/alsawad.1qr/', icon: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@alsawadiqr', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.6 5.82c-1-1.05-1.55-2.42-1.55-3.82h-3.1v13.5c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1 0-5.4c.3 0 .58.05.85.13v-3.16a5.8 5.8 0 0 0-.85-.06 5.8 5.8 0 1 0 5.8 5.8V9.5a7.13 7.13 0 0 0 4.17 1.34V7.75c-.98 0-1.9-.3-2.62-.83z"/></svg>' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/%D8%A7%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AF-7a0099302/', icon: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>' }
];

function injectSocialIcons() {
    const footerEl = document.querySelector('.site-footer');
    if (!footerEl || document.querySelector('.social-follow-box')) return;

    const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
    const title = lang === 'en' ? 'Follow Us' : 'تابعونا على';

    const box = document.createElement('div');
    box.className = 'social-follow-box';
    box.innerHTML =
        '<div class="social-follow-title">' + title + '</div>' +
        '<div class="social-icons">' +
        SOCIAL_LINKS.map(s =>
            `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" class="social-icon-link">${s.icon}</a>`
        ).join('') +
        '</div>';

    footerEl.parentNode.insertBefore(box, footerEl);
}

document.addEventListener('DOMContentLoaded', injectSocialIcons);
