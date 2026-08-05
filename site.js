/* Riddz.AI — progressive enhancement only. Every page is fully readable with
   JavaScript disabled; this adds the sticky-nav border and scroll reveal. */

(function () {
    "use strict";

    // Nav gains a border once you've scrolled off the top.
    var nav = document.querySelector(".nav");
    if (nav) {
        var onScroll = function () {
            nav.classList.toggle("stuck", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Reveal on scroll. Respect reduced-motion by simply showing everything.
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("in"); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            // Stagger siblings slightly so a grid doesn't pop in as one block.
            var delay = Number(entry.target.dataset.delay || 0);
            setTimeout(function () { entry.target.classList.add("in"); }, delay);
            io.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
})();
