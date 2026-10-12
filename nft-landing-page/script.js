document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe ALL animated elements (fade-up is the main class now)
    document.querySelectorAll('.fade-up, .fade-in, .fade-scale').forEach(el => {
        observer.observe(el);
    });

    // 2. Count Up Animation for Stats
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 50;
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when stats-bar is in view
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObs.disconnect();
            }
        });
        statsObs.observe(statsBar);
    }

    // 3. Parallax glow orbs on mouse move
    const glows = document.querySelectorAll('.bg-glow');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        glows.forEach((glow, i) => {
            const speed = (i + 1) * 0.5;
            glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});
