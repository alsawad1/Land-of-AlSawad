// أرض السواد — محرك بحث الموقع (client-side)

const SEARCH_SITE_BASE = "/Land-of-AlSawad/";
let SEARCH_INDEX_DATA = [];

(function loadSearchIndex() {
    const scriptTag = document.currentScript || document.querySelector('script[src*="search.js"]');
    const prefix = scriptTag ? (scriptTag.getAttribute('data-prefix') || "") : "";
    fetch(prefix + "assets/search-index.json")
        .then(res => res.json())
        .then(data => { SEARCH_INDEX_DATA = data; })
        .catch(err => console.error("Search index failed to load", err));
})();

function runSiteSearch(query) {
    const resultsBox = document.getElementById('search-results');
    if (!resultsBox) return;
    const q = query.trim().toLowerCase();

    if (!q) {
        resultsBox.innerHTML = '';
        resultsBox.classList.remove('active');
        return;
    }

    const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';

    const matches = SEARCH_INDEX_DATA.filter(item => {
        const title = (lang === 'en' ? item.title_en : item.title_ar).toLowerCase();
        const excerpt = (lang === 'en' ? item.excerpt_en : item.excerpt_ar).toLowerCase();
        const cat = (lang === 'en' ? item.category_en : item.category_ar).toLowerCase();
        return title.includes(q) || excerpt.includes(q) || cat.includes(q);
    }).slice(0, 8);

    if (matches.length === 0) {
        resultsBox.innerHTML = '<div class="search-no-results">' +
            (lang === 'en' ? 'No results found' : 'ما فيه نتائج مطابقة') +
            '</div>';
    } else {
        resultsBox.innerHTML = matches.map(item => {
            const title = lang === 'en' ? item.title_en : item.title_ar;
            const cat = lang === 'en' ? item.category_en : item.category_ar;
            return '<a href="' + SEARCH_SITE_BASE + item.url + '" class="search-result-item">' +
                '<span class="search-result-cat">' + cat + '</span>' +
                '<span class="search-result-title">' + title + '</span>' +
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

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-wrapper')) {
            if (resultsBox) resultsBox.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSiteSearch);
