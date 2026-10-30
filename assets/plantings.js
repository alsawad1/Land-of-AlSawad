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
        // آخر تحديث من أداة التوثيق: 2026-10-30
        { lat: 33.293198, lng: 44.291542, species: "sidr" },
        { lat: 33.293208, lng: 44.291562, species: "sidr" },
        { lat: 33.293190, lng: 44.291527, species: "sidr" },
        { lat: 33.293217, lng: 44.291574, species: "sidr" },
        { lat: 33.293616, lng: 44.291290, species: "sidr" },
        { lat: 33.293637, lng: 44.291776, species: "sidr" },
        { lat: 33.299146, lng: 44.283417, species: "sidr" },
        { lat: 33.299109, lng: 44.283355, species: "sidr" },
        { lat: 33.299118, lng: 44.283169, species: "sidr" },
        { lat: 33.299067, lng: 44.283275, species: "sidr" },
        { lat: 33.298103, lng: 44.284538, species: "sidr" },
        { lat: 33.295704, lng: 44.281865, species: "sidr" },
        { lat: 33.295665, lng: 44.281801, species: "sidr" },
        { lat: 33.295699, lng: 44.281602, species: "sidr" },
        { lat: 33.295909, lng: 44.281601, species: "sidr" },
        { lat: 33.295819, lng: 44.281671, species: "sidr" },
        { lat: 33.295961, lng: 44.281665, species: "sidr" },
        { lat: 33.295795, lng: 44.281785, species: "sidr" },
        { lat: 33.299263, lng: 44.283381, species: "sidr" },
        { lat: 33.295659, lng: 44.281498, species: "sidr" },
        { lat: 33.295584, lng: 44.281559, species: "sidr" },
        { lat: 33.299346, lng: 44.283130, species: "sidr" },
        { lat: 33.299328, lng: 44.283096, species: "sidr" },
        { lat: 33.299314, lng: 44.283069, species: "sidr" },
        { lat: 33.299267, lng: 44.283029, species: "sidr" },
        { lat: 33.299244, lng: 44.283049, species: "sidr" },
        { lat: 33.299221, lng: 44.283073, species: "sidr" },
        { lat: 33.295904, lng: 44.281687, species: "sidr" },
        { lat: 33.295853, lng: 44.281929, species: "sidr" },
        { lat: 33.295819, lng: 44.281931, species: "sidr" },
        { lat: 33.295779, lng: 44.281921, species: "sidr" },
        { lat: 33.295694, lng: 44.281659, species: "sidr" },
        { lat: 33.295714, lng: 44.281703, species: "sidr" },
        { lat: 33.295674, lng: 44.281750, species: "sidr" },
        { lat: 33.295674, lng: 44.281617, species: "sidr" },
        { lat: 33.293269, lng: 44.291640, species: "sidr" },
        { lat: 33.293505, lng: 44.291429, species: "sidr" },
        { lat: 33.293560, lng: 44.291384, species: "sidr" },
        { lat: 33.293196, lng: 44.291601, species: "sidr" },
        { lat: 33.293185, lng: 44.291577, species: "sidr" },
        { lat: 33.293176, lng: 44.291551, species: "sidr" },
        { lat: 33.293167, lng: 44.291529, species: "sidr" },
        { lat: 33.293551, lng: 44.291835, species: "sidr" },
        { lat: 33.293540, lng: 44.291796, species: "sidr" },
        { lat: 33.294071, lng: 44.291205, species: "sidr" },
        { lat: 33.294041, lng: 44.291128, species: "sidr" },
        { lat: 33.294013, lng: 44.291067, species: "sidr" },
        { lat: 33.293992, lng: 44.291002, species: "sidr" },
        { lat: 33.293972, lng: 44.290957, species: "sidr" },
        { lat: 33.293948, lng: 44.290895, species: "sidr" },
        { lat: 33.299613, lng: 44.283309, species: "sidr" },
        { lat: 33.293235, lng: 44.291559, species: "albizia" },
        { lat: 33.293254, lng: 44.291546, species: "albizia" },
        { lat: 33.293591, lng: 44.291256, species: "albizia" },
        { lat: 33.299018, lng: 44.283041, species: "albizia" },
        { lat: 33.298972, lng: 44.283096, species: "albizia" },
        { lat: 33.298960, lng: 44.283107, species: "albizia" },
        { lat: 33.298036, lng: 44.284500, species: "albizia" },
        { lat: 33.298012, lng: 44.284517, species: "albizia" },
        { lat: 33.297986, lng: 44.284534, species: "albizia" },
        { lat: 33.297762, lng: 44.284692, species: "albizia" },
        { lat: 33.299641, lng: 44.283275, species: "albizia" },
        { lat: 33.299398, lng: 44.283269, species: "albizia" },
        { lat: 33.299347, lng: 44.283312, species: "albizia" },
        { lat: 33.299296, lng: 44.283355, species: "albizia" },
        { lat: 33.299165, lng: 44.283450, species: "albizia" },
        { lat: 33.299127, lng: 44.283385, species: "albizia" },
        { lat: 33.299083, lng: 44.283315, species: "albizia" },
        { lat: 33.299043, lng: 44.283235, species: "albizia" },
        { lat: 33.306266, lng: 44.286981, species: "albizia" },
        { lat: 33.306334, lng: 44.286991, species: "albizia" },
        { lat: 33.306328, lng: 44.286915, species: "albizia" },
        { lat: 33.306408, lng: 44.286774, species: "albizia" },
        { lat: 33.306396, lng: 44.286982, species: "albizia" },
        { lat: 33.306215, lng: 44.287331, species: "albizia" },
        { lat: 33.306280, lng: 44.287380, species: "albizia" },
        { lat: 33.306377, lng: 44.287465, species: "albizia" },
        { lat: 33.306377, lng: 44.287292, species: "albizia" },
        { lat: 33.306309, lng: 44.287299, species: "albizia" },
        { lat: 33.299212, lng: 44.282879, species: "albizia" },
        { lat: 33.299199, lng: 44.282892, species: "albizia" },
        { lat: 33.301317, lng: 44.284318, species: "albizia" },
        { lat: 33.295756, lng: 44.281717, species: "albizia" },
        { lat: 33.295859, lng: 44.281747, species: "albizia" },
        { lat: 33.295849, lng: 44.281474, species: "albizia" },
        { lat: 33.295753, lng: 44.281552, species: "albizia" },
        { lat: 33.295917, lng: 44.281855, species: "albizia" },
        { lat: 33.295864, lng: 44.281905, species: "albizia" },
        { lat: 33.295744, lng: 44.281938, species: "albizia" },
        { lat: 33.299227, lng: 44.283412, species: "albizia" },
        { lat: 33.295736, lng: 44.281431, species: "albizia" },
        { lat: 33.299365, lng: 44.283168, species: "albizia" },
        { lat: 33.299187, lng: 44.283098, species: "albizia" },
        { lat: 33.301433, lng: 44.284310, species: "albizia" },
        { lat: 33.301429, lng: 44.284484, species: "albizia" },
        { lat: 33.301099, lng: 44.283951, species: "albizia" },
        { lat: 33.295765, lng: 44.281600, species: "albizia" },
        { lat: 33.295789, lng: 44.281638, species: "albizia" },
        { lat: 33.295752, lng: 44.281805, species: "albizia" },
        { lat: 33.301735, lng: 44.281323, species: "albizia" },
        { lat: 33.301569, lng: 44.281017, species: "albizia" },
        { lat: 33.301368, lng: 44.280631, species: "albizia" },
        { lat: 33.301161, lng: 44.280229, species: "albizia" },
        { lat: 33.299673, lng: 44.283254, species: "albizia" }
    ],

    wells: [
        { lat: 33.293469, lng: 44.291852, name_ar: "بئر السقي في إعدادية العامرية للبنين", name_en: "Irrigation Well, Al-Amiriya Preparatory School for Boys" }
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
