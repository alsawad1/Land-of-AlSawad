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

function titleWords(text) {
    return text.split(/[\s:،,.\-—()"'؟?!]+/).filter(Boolean).map(w => ({ raw: w, bare: w.replace(/^ال/, "") }));
}

// عند كتابة حرف أو حرفين: نطابق فقط بداية كلمات العنوان، حتى لا تظهر كل الصفحات
function matchesTitleStart(entry, q, lang) {
    const bareOnly = q.length === 1; // حرف واحد: نتجاهل "ال" وإلا طابقت كل الكلمات العربية
    const hit = words => words.some(w => (!bareOnly && w.raw.startsWith(q)) || w.bare.startsWith(q));
    const main = lang === 'en' ? entry.wordsEn : entry.wordsAr;
    const other = lang === 'en' ? entry.wordsAr : entry.wordsEn;
    if (hit(main)) return 0;
    if (hit(other)) return 1;
    return -1;
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
            // كلمات العنوان، للبحث بالحرف الأول من الكلمة
            wordsAr: titleWords(titleAr),
            wordsEn: titleWords(titleEn),
            // الصفحات الرئيسية (الطيور، الأشجار، المدونة، الخريطة...) تأتي بعد المحتوى
            isSection: item.url.indexOf('/') === -1,
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
    const shortQuery = q.length < 3;

    const matches = SEARCH_INDEX_DATA
        .map((entry, order) => {
            let score;
            if (shortQuery) {
                score = matchesTitleStart(entry, q, lang);
            } else {
                score = words.every(word => entry.all.includes(word)) ? scoreSearchEntry(entry, q, lang) : -1;
            }
            return { entry: entry, score: score, order: order };
        })
        .filter(m => m.score >= 0)
        .sort((a, b) => a.score - b.score ||
            (a.entry.isSection ? 1 : 0) - (b.entry.isSection ? 1 : 0) ||
            a.order - b.order)
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
