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
/* ===== أيقونات التواصل الاجتماعي بالفوتر ===== */
.social-icons { display: flex; justify-content: center; gap: 18px; margin: 30px 0 15px; }
.social-icon-link { color: #888; transition: color 0.3s ease, transform 0.3s ease; display: inline-flex; }
.social-icon-link:hover { color: #2ecc71; transform: translateY(-3px); }
