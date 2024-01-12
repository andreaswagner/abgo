import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

export class SectionItemsAnimate {
  constructor() {
    this.initAnimations();
  }

  private initAnimations(): void {
    document.querySelectorAll("[section-animation-fade='wrapper']").forEach((section) => {
      this.animateSection(section as HTMLElement);
    });
  }

  private animateSection(section: HTMLElement): void {
    const items = section.querySelectorAll("[section-animation-fade='item']");

    gsap.from(items, {
      opacity: 0,
      y: 50,
      stagger: 0.1, // Adjust as needed
      duration: 0.5, // Adjust as needed
      ease: 'power3.out',
      scrollTrigger: {
        markers: false,
        trigger: section,
        start: 'top center', // Adjust the start point as needed
        end: 'bottom top',
        toggleActions: 'play none none reverse',
        // Remove markers in production
        // markers: true
      },
    });
  }
}

export default SectionItemsAnimate;
