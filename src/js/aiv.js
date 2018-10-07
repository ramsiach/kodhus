const Aiv = (() => {
  const revealElements = document.querySelectorAll('[data-aiv]');

  const revealElement = (element, scroll_pos, duration, timingFunction, delay) => {
      const elementHeight = element.offsetHeight;
      const elementTop = element.offsetTop;
      
      // if (scroll_pos + window.innerHeight > elementTop + elementHeight * .4) {
      if (scroll_pos + window.innerHeight > elementTop + elementHeight) {
        
          // element.style.transition = "all 1s cubic-bezier(0.6, 0.2, 0.1, 1)";
          element.style.transition = "all " + duration + "ms " + delay + "ms " +  timingFunction;
          //setTimeout(() => {
              element.style.transform = "translateY(0) scale(1)";
              element.style.opacity = "1";
          //}, 0);
      }
  }
  // cache element properties
  const revealElementsCached = [];
  revealElements.forEach((elem) => {
      revealElementsCached.push({
          element: elem,
          duration: elem.getAttribute('data-duration') || 1000,
          timingFunction: elem.getAttribute('data-timing-function') || '',
          delay: elem.getAttribute('data-delay') ? parseInt(elem.getAttribute('data-delay')) : 0,
          elementHeight: elem.offsetHeight,
          elementTop: elem.offsetTop,
          onChildren: elem.getAttribute('data-aiv-children') ? elem.getAttribute('data-aiv-children') : false,
          childrenDelay: elem.getAttribute('data-children-delay') || 0
      });
      console.log(revealElementsCached.onChildren);
      
  });
  const reveal = (scroll_pos) => {
      revealElementsCached.forEach((elementObj) => {
          if (elementObj.onChildren) {
              console.log('yes children');
              elementObj.element.querySelectorAll(':scope > *').forEach((element, index) => {
                element.style.transform = "translateY(" + 100 + "px) scale(1)";
                element.style.opacity = "0";
                element.style.transformOrigin = "50% 100%";
                  revealElement(element, scroll_pos, elementObj.duration, elementObj.timingFunction, elementObj.delay + index * elementObj.childrenDelay);
              });
          } else {
            elementObj.element.style.transform = "translateY(" + 100 + "px) scale(1)";
            elementObj.element.style.opacity = "0";
            elementObj.element.style.transformOrigin = "50% 100%";
              revealElement(elementObj.element, scroll_pos, elementObj.duration, elementObj.timingFunction, elementObj.delay);
          }
      });
  }
  
  if (revealElements.length) {
      let last_known_scroll_position = 0;
      let ticking = false;
      window.addEventListener('scroll', (e) => {
          last_known_scroll_position = window.scrollY;
          if (!ticking) {
              window.requestAnimationFrame(() => {
                  reveal(last_known_scroll_position);
                  ticking = false;
              });
              ticking = true;
          }
      });
      reveal(last_known_scroll_position);
  }
})();

export default Aiv;