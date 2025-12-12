// 1. Initialize Lenis (Standard Smooth Scroll)
const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1, 
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// 3. Logic - Fires as soon as HTML is read
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Initialize Cursor (Only if screen is large enough to avoid mobile issues)
    if (window.innerWidth > 768) {
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });

        Shery.makeMagnet(".magnet-target", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });
    }

    // B. Hero Animation
    const tl = gsap.timeline();
    
    gsap.set(".hero-title", { y: 100, opacity: 0, skewY: 10 });
    gsap.set(".hero-subtitle", { opacity: 0 });

    tl.to(".hero-title", {
        y: 0,
        skewY: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
    })
    .to(".hero-subtitle", {
        opacity: 1,
        duration: 0.8
    }, "-=0.5");

    // C. MOBILE MENU LOGIC (New)
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Function to open menu
    menuBtn.addEventListener('click', () => {
        gsap.to(mobileMenu, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Stagger links in
        gsap.fromTo(mobileLinks, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
        );
    });

    // Function to close menu
    const closeMenu = () => {
        gsap.to(mobileMenu, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.5,
            ease: "power2.in"
        });
    };

    closeBtn.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// 4. Scroll Animations for Featured Projects
gsap.utils.toArray('.project-row').forEach(row => {
    gsap.from(row, {
        scrollTrigger: {
            trigger: row,
            start: "top 85%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        y: 50, 
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 5. Scroll Animation for Gallery Grid
gsap.utils.toArray('.gallery-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%", 
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power3.out"
    });
});