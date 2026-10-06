// أرض السواد — بيانات الزراعة الميدانية (مصدر واحد للخريطة وللصفحة الرئيسية)
//
// لإضافة شجرة جديدة: أضف سطراً داخل trees بنفس الشكل.
//   species: "sidr" للسدر أو "albizia" للألبيزيا
//   حقول اختيارية تظهر في نافذة الخريطة إن وُجدت:
//   date_ar / date_en ، location_ar / location_en ، watered_ar / watered_en
// عدد الأشجار في الصفحة الرئيسية يُحسب تلقائياً من هذه القائمة.

window.PLANTINGS = {
    species: {
        sidr: { ar: "شجرة السدر", en: "Sidr Tree", target: 5000 },
        albizia: { ar: "شجرة الألبيزيا", en: "Albizia Tree", target: 5000 }
    },

    trees: [
        { lat: 33.293196, lng: 44.291545, species: "sidr" },
        { lat: 33.293202, lng: 44.291552, species: "sidr" },
        { lat: 33.293208, lng: 44.291562, species: "sidr" },
        { lat: 33.293189, lng: 44.291573, species: "sidr" },
        { lat: 33.293217, lng: 44.291574, species: "sidr" },
        { lat: 33.293616, lng: 44.291290, species: "sidr" },
        { lat: 33.293637, lng: 44.291776, species: "sidr" },

        { lat: 33.293235, lng: 44.291559, species: "albizia" },
        { lat: 33.293254, lng: 44.291546, species: "albizia" },
        { lat: 33.293591, lng: 44.291256, species: "albizia" },
        { lat: 33.293164, lng: 44.291554, species: "albizia" }
    ],

    wells: [
        { lat: 33.293436, lng: 44.291846, name_ar: "بئر السقي", name_en: "Irrigation Well" }
    ]
};

// يملأ عدّادات "المزروع حتى الآن" في أي صفحة فيها عناصر data-planted-*
(function fillPlantedCounters() {
    function run() {
        var data = window.PLANTINGS;
        var counts = {};
        data.trees.forEach(function(t) { counts[t.species] = (counts[t.species] || 0) + 1; });

        document.querySelectorAll('[data-planted-count]').forEach(function(el) {
            el.textContent = (counts[el.getAttribute('data-planted-count')] || 0).toLocaleString('en-US');
        });

        document.querySelectorAll('[data-planted-ring]').forEach(function(circle) {
            var key = circle.getAttribute('data-planted-ring');
            var target = (data.species[key] || {}).target || 0;
            var share = target ? Math.min((counts[key] || 0) / target, 1) : 0;
            var length = parseFloat(circle.getAttribute('stroke-dasharray')) || 0;
            circle.setAttribute('stroke-dashoffset', (length * (1 - share)).toFixed(2));
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
})();
