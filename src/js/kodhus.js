/* Dialog */

const tabletPhoneBreakpoint = 768;
const dialogTriggers = document.querySelectorAll('[data-dialog]');
const dialogs = document.querySelectorAll('.cdt-dialog-container');

dialogTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
        document.querySelector(trigger.dataset.dialog).classList.add('show');
    });
});

dialogs.forEach(function(dialog) {
    console.log(dialog.querySelector("[data-close='true']").className);
    dialog.querySelector("[data-close='true']").addEventListener('click', function() {
        dialog.classList.remove('show');
    });
});

/* Dialog end */

const mobileTrigger = document.querySelector('.cdt-top-nav .mobile-trigger');
const topNavigations = document.querySelector('.cdt-top-nav .navigations');
const allOtherNavsCloned = [];
const allOtherNavsParent = [];

let secondaryNavCreated = false;
let secondaryMobileNavs;
window.addEventListener('resize', () => {
    if (window.innerWidth <= tabletPhoneBreakpoint) {
        const allOtherNavs = document.querySelectorAll('.cdt-nav-responsive');
        allOtherNavs.forEach((nav) => {
            allOtherNavsCloned.push(nav.cloneNode(true));
            let parentElement = nav.parentElement;
            allOtherNavsParent.push(nav.parentElement);
        });
        if (!secondaryNavCreated) {
            secondaryMobileNavs = document.createElement('div');
            const secondaryMobileNavsUl = document.createElement('ul');
            secondaryMobileNavs.appendChild(secondaryMobileNavsUl);
            secondaryMobileNavs.classList.add('cdt-secondary');
            topNavigations.querySelector('nav').appendChild(secondaryMobileNavs);
            allOtherNavs.forEach((nav, index) => {
                nav.querySelectorAll('li').forEach((item) => {
                    secondaryMobileNavsUl.appendChild(item);
                });
                allOtherNavsParent[index].removeChild(allOtherNavs[index]);
            });
            secondaryNavCreated = true;
        }
    } else {
        if (secondaryNavCreated) {
            allOtherNavsParent.map((parent, index) => {
                parent.appendChild(allOtherNavsCloned[index]);
            });
            secondaryMobileNavs.parentElement.removeChild(secondaryMobileNavs);
            secondaryMobileNavs = null;
            secondaryNavCreated = false;
            allOtherNavsCloned.length = 0;
            allOtherNavsParent.length = 0;
            
        }
        
    }
    
});
mobileTrigger.addEventListener('click', function() {
    this.classList.toggle('open');
    topNavigations.classList.toggle('show');
});



// var carousel = document.querySelector('.cdt-carousel .wrapper');
// var active = document.querySelector('.cdt-carousel .active');
// var activeIndex = -1;
// let length = 0;
// let carouselPrevBtn, carouselNextBtn;
// let current, next;
// if (carousel) {
//     length = carousel.childElementCount;
//     const carouselItems = document.querySelectorAll('.cdt-carousel .wrapper div')
//     const getActiveElementIndex = function() {
//         carouselItems.forEach(function(el, i) {
//             if (el.classList.contains('active'))
//                 activeIndex = i;
//         });
//     }
//     getActiveElementIndex();
//     carouselPrevBtn = document.querySelector('.cdt-carousel .prev-btn');
//     carouselNextBtn = document.querySelector('.cdt-carousel .next-btn');
//     var animating = false;
//     carouselPrevBtn.addEventListener('click', function() {
//         if (animating) return;
//         current = carousel.children[activeIndex];
//         var prevIndex = (activeIndex === 0) ? (length - 1) : activeIndex - 1;
//         next = carousel.children[prevIndex];
//         animating = true;
//         setTimeout(function() {
//             current.classList.add('right');
//         }, 0);
//         current.addEventListener("transitionend", function(event) {
//             current.classList.remove('active');
//             current.classList.remove('right');
//         });
//         next.classList.add('prev');
//         setTimeout(function() {
//             next.classList.add('right');
//         }, 0);
//         next.addEventListener('transitionend', function(event) {
//             next.classList.add('active');
//             next.classList.remove('prev');
//             next.classList.remove('right');
//             activeIndex = prevIndex;
//             animating = false;
//         });
//     });
// }

// carouselNextBtn.addEventListener('click', function() {
//     if (animating) return;
//     var current = carousel.children[activeIndex];
//     //current.classList.add('left');
//     var nextIndex = (activeIndex === length - 1) ? 0 : activeIndex + 1;
//     var next = carousel.children[nextIndex];
//     current.classList.add('prev');
//     next.classList.add('next');

//     setTimeout(function() {
//         animating = true;
//         current.classList.add('left');
//         next.classList.add('left');
//     }, 0);
//     current.addEventListener("transitionend", function(event) {
//         next.classList.remove('next');
//         next.classList.remove('left');
//         next.classList.add('active');
//         current.classList.remove('prev');
//         current.classList.remove('left');
//         current.classList.remove('active');
//         activeIndex = nextIndex;
//         animating = false;
//     });
// });

// // Reveal on scroll
// var last_known_scroll_position = 0;
// var ticking = false;

// const element = document.querySelector('[data-aiv]');
// const elementHeight = element.offsetHeight;
// const elementTop = element.offsetTop;
// element.style.transformOrigin = "50% 100%";
// element.style.transform = "translateY(" + 100 + "px) scale(0.9)";
// element.style.opacity = "0";

// function doSomething(scroll_pos) {
//     console.log(scroll_pos + window.innerHeight, elementTop + elementHeight);
//     if (scroll_pos + window.innerHeight > elementTop + elementHeight * .4) {
//         element.style.transition = "all 1s cubic-bezier(0.6, 0.2, 0.1, 1)";
//         setTimeout(function() {
//             element.style.transform = "translateY(0) scale(1)";
//             element.style.opacity = "1";
//         }, 0);
//     }
// }

// window.addEventListener('scroll', function(e) {
//     console.log('called');
//     last_known_scroll_position = window.scrollY;
//     if (!ticking) {
//         window.requestAnimationFrame(function() {
//             doSomething(last_known_scroll_position);
//             ticking = false;
//         });

//         ticking = true;
//     }
// });
// setTimeout(function() {
//     window.dispatchEvent(new Event('scroll'));
// }, 0);
// end Reveal on scroll

// Code highlight
document.querySelectorAll('pre code').forEach(function(block, i) {
    hljs.highlightBlock(block);
});
  