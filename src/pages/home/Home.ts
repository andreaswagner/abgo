import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure to register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother);
interface CustomObserver extends Observer {
  savedScroll?: number;
}
export class Home {
  private currentIndex: number;
  private slides: HTMLElement[];
  private isAnimating: boolean;
  private intentObserver: Observer;
  private preventScroll: Observer;

  constructor() {
    ScrollSmoother.create({
      smooth: 0.8, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 1.2, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      normalizeScroll: true,
      //speed: speedValue,
      //ignoreMobileResize: true,
    });
    this.isAnimating = false;
    this.currentIndex = 0;
    this.slides = gsap.utils.toArray('.zwiper-slide') as HTMLElement[];
    gsap.set(this.slides[1], { xPercent: 100 });
    gsap.set(this.slides[2], { xPercent: 200 });
    gsap.set(this.slides, {
      zIndex: (i) => i,
    });
    // create an observer and disable it to start
    this.intentObserver = ScrollTrigger.observe({
      type: 'wheel,touch',
      onUp: () => !this.isAnimating && this.gotoPanel(this.currentIndex + 1, true),
      onDown: () => !this.isAnimating && this.gotoPanel(this.currentIndex - 1, false),
      wheelSpeed: -1, // to match mobile behavior, invert the wheel speed
      tolerance: 20,
      preventDefault: true,
      onPress: (self) => {
        // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
        ScrollTrigger.isTouch && self.event.preventDefault();
      },
    });
    this.intentObserver.disable();
    this.preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: 'wheel,scroll',
      allowClicks: true,
      onEnable: (self: CustomObserver) => {
        self.savedScroll = self.scrollY();
      },
      onChangeY: (self: CustomObserver) => {
        if (typeof self.savedScroll === 'number') {
          self.event.stopPropagation();
          self.scrollY(self.savedScroll);
        }
      },
    });
    this.preventScroll.disable();
  }

  public init(): void {
    // pin swipe section and initiate observer
    ScrollTrigger.create({
      trigger: '.zwiper-wrapper',
      pin: true,
      anticipatePin: 1,
      start: 'top top',
      end: '+=50%',
      onLeave: () => {
        gsap.set(this.slides[1], { xPercent: 0 });
      },
      onEnter: (self) => {
        if (this.preventScroll.isEnabled === false) {
          self.scroll(self.start);
          this.preventScroll.enable();
          this.intentObserver.enable();
          this.gotoPanel(this.currentIndex + 1, true);
        }
      },
      onEnterBack: (self) => {
        if (this.preventScroll.isEnabled === false) {
          self.scroll(self.start);
          this.preventScroll.enable();
          this.intentObserver.enable();
          this.gotoPanel(this.currentIndex - 1, false);
        }
      },
    });
  }
  // handle the panel swipe animations
  public gotoPanel(index: number, isScrollingDown: boolean) {
    console.log('gotoPanel', index, isScrollingDown, this.slides.length);
    this.isAnimating = true;
    // return to normal scroll if we're at the end or back up to the start
    if ((index === this.slides.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
      console.log('return to normal scroll');
      this.intentObserver.disable();
      this.preventScroll.disable();
      this.isAnimating = false;
      // now make it go 1px beyond in the correct direction so that it doesn't trigger onEnter/onEnterBack.
      this.preventScroll.scrollY(
        this.preventScroll.scrollY() + (index === this.slides.length ? 1 : -1)
      );
      return;
    }

    //target the second panel, last panel?
    const target = isScrollingDown ? this.slides[index] : this.slides[this.currentIndex];

    gsap.to(target, {
      xPercent: isScrollingDown ? 0 : 100,
      duration: 0.75,
      ease: 'power1.inOut',
      onComplete: () => {
        this.isAnimating = false;
      },
    });

    this.currentIndex = index;
  }
}
