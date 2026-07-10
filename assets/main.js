// أرض السواد — Land of Al-Sawad — Shared Behavior

const NAV_LABELS = {
    ar: {
        brandTop: "أرْض", brandBottom: "السَّــــــــــــــــــــــــوَاد",
        navHome: "الرئيسية", navBirds: "طيورنا الوطنية", navGuide: "الدليل العلمي", navBlog: "المدونة",
        subThermal: "أنواع التخديد: الحراري", subMechanical: "أنواع التخديد: الميكانيكي",
        langBtn: "English",
        telegramBtn: "الانضمام إلى القناة الرسمية في تليغرام ←",
        footer: "جميع الحقوق محفوظة © أرض السَّواد ٢٠٢٦"
    },
    en: {
        brandTop: "Land of", brandBottom: "Al-Sawad",
        navHome: "Home", navBirds: "National Birds", navGuide: "Scientific Guide", navBlog: "Blog",
        subThermal: "Types of Scarification: Thermal", subMechanical: "Types of Scarification: Mechanical",
        langBtn: "العربية",
        telegramBtn: "Join the Official Telegram Channel ←",
        footer: "All Rights Reserved © Land of Al-Sawad 2026"
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
