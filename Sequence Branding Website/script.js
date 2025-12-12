// 1. Initialize Lenis (Standard Smooth Scroll)
const lenis = new Lenis({
    lerp: 0.1, // Slightly higher number = Snappier/Less laggy
    wheelMultiplier: 1, 
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// 3. Logic - Fires as soon as HTML is read (Fast)
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Initialize Cursor (Only if screen is large enough)
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

    // B. Hero Animation (Instant Start)
    const tl = gsap.timeline();
    
    // Set initial state
    gsap.set(".hero-title", { y: 100, opacity: 0, skewY: 10 });
    gsap.set(".hero-subtitle", { opacity: 0 });

    // Animate
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
});

// 4. Parallax Effect for Services
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