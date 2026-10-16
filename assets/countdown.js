// أرض السواد — عدّاد تنازلي لانطلاق الذروة الميدانية
// الموعد: 17 آذار 2027، منتصف الليل بتوقيت بغداد (UTC+3)
(function () {
    var TARGET = Date.parse('2027-03-17T00:00:00+03:00');
    var box = document.getElementById('peak-countdown');
    if (!box) return;

    var els = {
        d: box.querySelector('[data-cd="d"]'),
        h: box.querySelector('[data-cd="h"]'),
        m: box.querySelector('[data-cd="m"]'),
        s: box.querySelector('[data-cd="s"]')
    };
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    function tick() {
        var left = TARGET - Date.now();
        if (left <= 0) {
            box.classList.add('is-live');
            return false;
        }
        var sec = Math.floor(left / 1000);
        els.d.textContent = Math.floor(sec / 86400);
        els.h.textContent = pad(Math.floor(sec % 86400 / 3600));
        els.m.textContent = pad(Math.floor(sec % 3600 / 60));
        els.s.textContent = pad(sec % 60);
        return true;
    }

    if (tick()) {
        var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);
    }
})();
