import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Fade up animations for sections
  const fadeUpElements = document.querySelectorAll(".animate-fade-up");
  fadeUpElements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  });

  // Stagger children animations
  const staggerContainers = document.querySelectorAll(".animate-stagger");
  staggerContainers.forEach((container) => {
    const children = container.children;
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}
