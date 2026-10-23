// أرض السواد — Land of Al-Sawad — Shared Behavior

const NAV_LABELS = {
    ar: {
        brandTop: "أرْض", brandBottom: "السَّــــــــــــــــــــــــوَاد",
        navHome: "الرئيسية", navBirds: "طيورنا الوطنية", navGuide: "ديوان الأشجار", navBlog: "المدونة",
        subSidr: "شجرة السدر", subAlbizia: "شجرة الألبيزيا",
        langBtn: "English",
        telegramBtn: "الانضمام إلى القناة الرسمية في تليغرام ←",
        footer: "جميع الحقوق محفوظة © أرض السَّواد ٢٠٢٦",
        searchPlaceholder: "بحث بالموقع...",
        backBtn: "رجوع"
    },
    en: {
        brandTop: "Land of", brandBottom: "Al-Sawad",
        navHome: "Home", navBirds: "National Birds", navGuide: "Tree Almanac", navBlog: "Blog",
        subSidr: "Sidr Tree", subAlbizia: "Albizia Tree",
        langBtn: "العربية",
        telegramBtn: "Join the Official Telegram Channel ←",
        footer: "All Rights Reserved © Land of Al-Sawad 2026",
        searchPlaceholder: "Search the site...",
        backBtn: "Back"
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

    const back = document.querySelector('.back-btn');
    if (back) back.setAttribute('aria-label', NAV_LABELS[lang].backBtn);

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

// ===== زر الرجوع للصفحة السابقة (يظهر بكل الصفحات ما عدا الرئيسية) =====
function backFallbackUrl() {
    const path = location.pathname;
    const inSub = /\/(birds|trees|blog)\/[^/]+$/.test(path);
    if (/\/birds\/[^/]+$/.test(path)) return '../birds.html';
    if (/\/trees\/[^/]+$/.test(path)) return '../guide.html';
    if (/\/blog\/[^/]+$/.test(path)) return '../blog.html';
    return inSub ? '../index.html' : 'index.html';
}

function injectBackButton() {
    const inner = document.querySelector('.site-header-inner');
    const brand = inner && inner.querySelector('.brand-name');
    if (!brand || document.querySelector('.back-btn')) return;
    const file = location.pathname.split('/').pop();
    if (file === '' || file === 'index.html') return;

    const wrap = document.createElement('div');
    wrap.className = 'brand-wrap';
    brand.parentNode.insertBefore(wrap, brand);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg><span data-i18n="backBtn">رجوع</span>';
    btn.addEventListener('click', () => {
        let sameSite = false;
        try { sameSite = document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) { /* ignore */ }
        if (sameSite && history.length > 1) history.back();
        else location.href = backFallbackUrl();
    });

    wrap.appendChild(btn);
    wrap.appendChild(brand);
}

document.addEventListener('DOMContentLoaded', () => {
    injectBackButton();
    let saved = 'ar';
    try { saved = localStorage.getItem('siteLang') || 'ar'; } catch (e) { /* ignore */ }
    setLanguage(saved);
});

// ===== صندوق التواصل الاجتماعي بالفوتر =====
const SOCIAL_LINKS = [
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61594179330456', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><text x="12" y="19.5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700">f</text></svg>' },
    { name: 'Instagram', url: 'https://www.instagram.com/alsawad.1qr/', icon: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@alsawadiqr', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.6 5.82c-1-1.05-1.55-2.42-1.55-3.82h-3.1v13.5c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1 0-5.4c.3 0 .58.05.85.13v-3.16a5.8 5.8 0 0 0-.85-.06 5.8 5.8 0 1 0 5.8 5.8V9.5a7.13 7.13 0 0 0 4.17 1.34V7.75c-.98 0-1.9-.3-2.62-.83z"/></svg>' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/%D8%A7%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AF-7a0099302/', icon: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>' }
];

function injectSocialIcons() {
    const footerEl = document.querySelector('.site-footer');
    if (!footerEl || document.querySelector('.social-follow-box')) return;

    const box = document.createElement('div');
    box.className = 'social-follow-box';
    box.innerHTML =
        '<div class="social-icons">' +
        SOCIAL_LINKS.map(s =>
            `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" class="social-icon-link">${s.icon}</a>`
        ).join('') +
        '</div>';

    footerEl.parentNode.insertBefore(box, footerEl);
}

document.addEventListener('DOMContentLoaded', injectSocialIcons);
// ===== إضافة رابط الخريطة للقائمة تلقائياً (بدون تعديل كل صفحة يدوياً) =====
NAV_LABELS.ar.navMap = "الخريطة";
NAV_LABELS.en.navMap = "Map";

function injectMapNavLink() {
    var lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
    var isMapPage = location.pathname.indexOf('map.html') !== -1;

    document.querySelectorAll('.nav-menu, .mobile-drawer').forEach(function(container) {
        if (container.querySelector('.map-nav-link')) return;

        var homeLink = container.querySelector('a[data-i18n="navHome"]');
        if (!homeLink) return;
        var prefix = homeLink.getAttribute('href').replace('index.html', '');

        var blogLink = container.querySelector('a[data-i18n="navBlog"]');

        var mapLink = document.createElement('a');
        mapLink.href = prefix + 'map.html';
        mapLink.className = 'nav-link map-nav-link' + (isMapPage ? ' active' : '');
        mapLink.setAttribute('data-i18n', 'navMap');
        mapLink.textContent = NAV_LABELS[lang].navMap;

        if (blogLink) {
            blogLink.insertAdjacentElement('afterend', mapLink);
        } else {
            container.appendChild(mapLink);
        }
    });
}

document.addEventListener('DOMContentLoaded', injectMapNavLink);

// ===== إضافة رابط "تطوّع معنا" للقائمة تلقائياً بكل الصفحات =====
NAV_LABELS.ar.navVolunteer = "تطوّع معنا";
NAV_LABELS.en.navVolunteer = "Volunteer";

function injectVolunteerNavLink() {
    var lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
    var isVolunteerPage = location.pathname.indexOf('volunteer.html') !== -1;

    document.querySelectorAll('.nav-menu, .mobile-drawer').forEach(function(container) {
        if (container.querySelector('.volunteer-nav-link')) return;

        var homeLink = container.querySelector('a[data-i18n="navHome"]');
        if (!homeLink) return;
        var prefix = homeLink.getAttribute('href').replace('index.html', '');

        var link = document.createElement('a');
        link.href = prefix + 'volunteer.html';
        link.className = 'nav-link volunteer-nav-link' + (isVolunteerPage ? ' active' : '');
        link.setAttribute('data-i18n', 'navVolunteer');
        link.textContent = NAV_LABELS[lang].navVolunteer;

        var after = container.querySelector('.map-nav-link') || container.querySelector('a[data-i18n="navBlog"]');
        if (after) {
            after.insertAdjacentElement('afterend', link);
        } else {
            container.appendChild(link);
        }
    });
}

document.addEventListener('DOMContentLoaded', injectVolunteerNavLink);
