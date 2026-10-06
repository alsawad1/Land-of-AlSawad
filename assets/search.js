// أرض السواد — محرك بحث الموقع (client-side)

let SEARCH_INDEX_DATA = [];
let SEARCH_PREFIX = "";
const SEARCH_MAX_RESULTS = 8;

// توحيد النص حتى يطابق البحث مهما اختلفت الهمزات والتشكيل وحالة الأحرف
function normalizeSearchText(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[ً-ٰٟۖ-ۭـ]/g, "") // التشكيل والتطويل
        .replace(/[أإآٱ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/گ/g, "ك")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeSearchHtml(text) {
    return String(text || "").replace(/[&<>"']/g, ch => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
    ));
}

function prepareSearchIndex(data) {
    return data.map(item => {
        const titleAr = normalizeSearchText(item.title_ar);
        const titleEn = normalizeSearchText(item.title_en);
        return {
            item: item,
            titleAr: titleAr,
            titleEn: titleEn,
            // بدون "ال" التعريف حتى تطابق "هدهد" بداية "الهدهد"
            titleArBare: titleAr.replace(/^ال/, ""),
            all: [
                titleAr, titleEn,
                normalizeSearchText(item.excerpt_ar), normalizeSearchText(item.excerpt_en),
                normalizeSearchText(item.category_ar), normalizeSearchText(item.category_en),
                normalizeSearchText(item.keywords)
            ].join(" | ")
        };
    });
}

(function loadSearchIndex() {
    const scriptTag = document.currentScript || document.querySelector('script[src*="search.js"]');
    SEARCH_PREFIX = scriptTag ? (scriptTag.getAttribute('data-prefix') || "") : "";
    fetch(SEARCH_PREFIX + "assets/search-index.json")
        .then(res => res.json())
        .then(data => {
            SEARCH_INDEX_DATA = prepareSearchIndex(data);
            // لو المستخدم كتب قبل اكتمال تحميل الفهرس
            const input = document.getElementById('site-search-input');
            if (input && input.value.trim() && document.activeElement === input) runSiteSearch(input.value);
        })
        .catch(err => console.error("Search index failed to load", err));
})();

function scoreSearchEntry(entry, q, lang) {
    const main = lang === 'en' ? entry.titleEn : entry.titleAr;
    const other = lang === 'en' ? entry.titleAr : entry.titleEn;
    if (main.startsWith(q) || entry.titleArBare.startsWith(q)) return 0;
    if (main.includes(q)) return 1;
    if (other.startsWith(q)) return 2;
    if (other.includes(q)) return 3;
    return 4;
}

function runSiteSearch(query) {
    const resultsBox = document.getElementById('search-results');
    if (!resultsBox) return;
    const q = normalizeSearchText(query);

    if (!q) {
        resultsBox.innerHTML = '';
        resultsBox.classList.remove('active');
        return;
    }

    const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
    const words = q.split(" ");

    const matches = SEARCH_INDEX_DATA
        .filter(entry => words.every(word => entry.all.includes(word)))
        .map((entry, order) => ({ entry: entry, score: scoreSearchEntry(entry, q, lang), order: order }))
        .sort((a, b) => a.score - b.score || a.order - b.order)
        .slice(0, SEARCH_MAX_RESULTS);

    if (matches.length === 0) {
        resultsBox.innerHTML = '<div class="search-no-results">' +
            (lang === 'en' ? 'No results found' : 'ما فيه نتائج مطابقة') +
            '</div>';
    } else {
        resultsBox.innerHTML = matches.map(match => {
            const item = match.entry.item;
            const title = lang === 'en' ? item.title_en : item.title_ar;
            const cat = lang === 'en' ? item.category_en : item.category_ar;
            return '<a href="' + escapeSearchHtml(SEARCH_PREFIX + item.url) + '" class="search-result-item">' +
                '<span class="search-result-cat">' + escapeSearchHtml(cat) + '</span>' +
                '<span class="search-result-title">' + escapeSearchHtml(title) + '</span>' +
                '</a>';
        }).join('');
    }

    resultsBox.classList.add('active');
}

function initSiteSearch() {
    const input = document.getElementById('site-search-input');
    const resultsBox = document.getElementById('search-results');
    if (!input) return;

    input.addEventListener('input', function(e) { runSiteSearch(e.target.value); });
    input.addEventListener('focus', function() { if (input.value.trim()) runSiteSearch(input.value); });
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { if (resultsBox) resultsBox.classList.remove('active'); return; }
        if (e.key === 'Enter' && resultsBox) {
            const first = resultsBox.querySelector('.search-result-item');
            if (first) { e.preventDefault(); window.location.href = first.href; }
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-wrapper')) {
            if (resultsBox) resultsBox.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSiteSearch);
