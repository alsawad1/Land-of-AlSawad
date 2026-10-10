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
        // الدفعة الثانية (١٠ تشرين الأول ٢٠٢٦)
        { lat: 33.298077, lng: 44.284552, species: "sidr" },
        // صف المنتزه: ١٣ شجرة بالتناوب على خط مستقيم (من 33.299026, 44.283203 إلى 33.299140, 44.283411)
        { lat: 33.299026, lng: 44.283203, species: "sidr" },
        { lat: 33.299045, lng: 44.283238, species: "sidr" },
        { lat: 33.299064, lng: 44.283272, species: "sidr" },
        { lat: 33.299083, lng: 44.283307, species: "sidr" },
        { lat: 33.299102, lng: 44.283342, species: "sidr" },
        { lat: 33.299121, lng: 44.283376, species: "sidr" },
        { lat: 33.299140, lng: 44.283411, species: "sidr" },

        { lat: 33.293235, lng: 44.291559, species: "albizia" },
        { lat: 33.293254, lng: 44.291546, species: "albizia" },
        { lat: 33.293591, lng: 44.291256, species: "albizia" },
        { lat: 33.293164, lng: 44.291554, species: "albizia" },
        // الدفعة الثانية (١٠ تشرين الأول ٢٠٢٦)
        { lat: 33.299009, lng: 44.282996, species: "albizia" },
        { lat: 33.298971, lng: 44.283052, species: "albizia" },
        { lat: 33.298957, lng: 44.283060, species: "albizia" },
        { lat: 33.299088, lng: 44.283156, species: "albizia" },
        // صف المنتزه
        { lat: 33.299035, lng: 44.283220, species: "albizia" },
        { lat: 33.299054, lng: 44.283255, species: "albizia" },
        { lat: 33.299073, lng: 44.283290, species: "albizia" },
        { lat: 33.299093, lng: 44.283324, species: "albizia" },
        { lat: 33.299112, lng: 44.283359, species: "albizia" },
        { lat: 33.299131, lng: 44.283394, species: "albizia" },
        { lat: 33.298036, lng: 44.284500, species: "albizia" },
        { lat: 33.298012, lng: 44.284517, species: "albizia" },
        { lat: 33.297986, lng: 44.284534, species: "albizia" },
        { lat: 33.297762, lng: 44.284692, species: "albizia" },
        { lat: 33.299661, lng: 44.283297, species: "albizia" }
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
