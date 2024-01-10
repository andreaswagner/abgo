import './index.css';

document.addEventListener('DOMContentLoaded', function () {
  window.onload = function () {
    window.requestAnimationFrame(function () {
      // your gsap code

      window.Webflow ||= [];
      window.Webflow.push(() => {
        // const app = new Wallet();
        //const app = new CloneMe();
        //const app = new DirtyProtest();
        //app.init();

        document.documentElement.classList.add('webflow-loaded');
      });
    });
  };
});
