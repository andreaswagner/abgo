//import 'swiper/css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//import { TextReveal } from 'src/animations/TextReveal';
//import Swiper from 'swiper';
gsap.registerPlugin(ScrollTrigger);
//import { HideOnScroll } from '$utils/HideOnScroll';

export class AgboSlider {
  // private textAnimation: TextReveal;
  //  private swipeableDiv: SwipeableDiv;

  constructor() {
    ScrollTrigger.normalizeScroll(true);

    // this.textAnimation = new TextReveal(
    //   '[text-reveal]',
    //   false,
    //   {
    //     duration: 1.5,
    //     yPercent: 300,
    //     stagger: 0.08,
    //     delay: 0,
    //     rotate: -20,
    //     ease: 'expo.out',
    //   },
    //   'lines'
    // );
    // this.textAnimation.init();

    // Get all the slides

    // Create a ScrollTrigger instance for each slide
    const slides = gsap.utils.toArray<HTMLElement>('.zwiper-slide');
    const zwiperWrapper = document.querySelector('.zwiper-wrapper');
    if (zwiperWrapper instanceof HTMLElement) {
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'Power1.easeInOut',
        scrollTrigger: {
          trigger: '.zwiper-wrapper',
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => '+=' + zwiperWrapper.offsetWidth,
        },
      });
    }

    // slides.forEach((slide, index) => {
    //   gsap.fromTo(
    //     slide,
    //     { x: index * 100 + '%' }, // start from the right
    //     {
    //       x: (index - slides.length) * 100 + '%', // animate to the left
    //       scrollTrigger: {
    //         trigger: slide,
    //         start: 'top top', // pin at the top of the viewport
    //         end: 'bottom top', // end when the bottom of the slide hits the top of the viewport
    //         pin: true, // pin the slide
    //         pinSpacing: false, // no extra spacing when pinned element is shorter/longer
    //         scrub: true,
    //         markers: false,
    //       },
    //     }
    //   );
    // });

    // Refresh ScrollTrigger to ensure correct positioning
    ScrollTrigger.refresh();
  }

  public init(): void {
    const slides = gsap.utils.toArray<HTMLElement>('.zwiper-slide');

    slides.forEach((section) => {
      const universeTitles = section.querySelectorAll('.universe_title');
      const universeCuts = section.querySelectorAll('.universe_cut');
      const universeBgs = section.querySelectorAll('.universe_bg');

      universeTitles.forEach((universeTitle) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pinSpacing: false,
            pin: false,
            start: 'top bottom',
            end: '100% top',
            scrub: true,
            markers: false,
          },
        });

        tl.from(universeTitle, {
          yPercent: 25,
          ease: 'power1.inOut',
        });
      });

      universeCuts.forEach((universeCut) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pinSpacing: false,
            pin: false,
            start: 'top bottom',
            end: '100% top',
            scrub: true,
            markers: false,
          },
        });

        tl.to(
          universeCut,
          {
            yPercent: 5.1,
            scale: 1.1,
            ease: 'power1.inOut',
            transformOrigin: 'center bottom',
          },
          '<'
        );
      });

      universeBgs.forEach((universeBg) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pinSpacing: false,
            pin: false,
            start: 'top bottom',
            end: '100% top',
            scrub: true,
            markers: false,
          },
        });

        tl.from(
          universeBg,
          {
            yPercent: 1,
            scale: 1.4,
            transformOrigin: 'center bottom',
          },
          '<'
        );
      });
    });
  }
  public onResize(): void {
    // if (this.textAnimation) {
    //   this.textAnimation.onResize();
    // }
  }
}
