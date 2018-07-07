(function() {
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
    function setResponsiveMenu() {
        if (window.innerWidth <= tabletPhoneBreakpoint) {
            navChildrenVisibility(false);
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
                secondaryMobileNavs.classList.add('cdt-secondary', 'cdt-list');
                topNavigations.querySelector('nav').appendChild(secondaryMobileNavs);
                allOtherNavs.forEach((nav, index) => {
                    
                    nav.querySelectorAll(':scope > ul > li').forEach((item) => {
                        secondaryMobileNavsUl.appendChild(item);
                    });
                    allOtherNavsParent[index].removeChild(allOtherNavs[index]);
                });
                secondaryNavCreated = true;
            }
        } else {
            if (secondaryNavCreated) {
                navChildrenVisibility(true);
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
    }
    if (topNavigations) {
        window.addEventListener('resize', () => {
            setResponsiveMenu();
        });
        setResponsiveMenu();
    }

    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', function() {
            this.classList.toggle('open');
            topNavigations.classList.toggle('show');
        });
    }
    

    /* Initial hiding of cdt-nav children */
    function navChildrenVisibility(state) {
        var cls = (state) ? 'show' : 'hide';
        var navChildren = document.querySelectorAll('.cdt-nav li ul');
        navChildren.forEach(function(listItem, index) {
            listItem.classList.add(cls);
        });
    }
    var navItems = document.querySelectorAll('.cdt-nav > li');
    navItems.forEach(function(listItem, index) {
        listItem.addEventListener('click', function() {
            navChildren.forEach(function(listItem, index) {
                listItem.classList.add('hide');
            });
            listItem.querySelector('ul').classList.remove('hide');
        });
    });


    /* cdt-nav list ul child selected */
    var childListItems = document.querySelectorAll('.cdt-list li ul .cdt-list-item');
    childListItems.forEach(function(listItem, index) {
        listItem.addEventListener('click', function() {
            childListItems.forEach(function(item, i) {
                item.classList.remove('selected')
            });
            listItem.classList.add('selected');
        });
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

    // Reveal on scroll
    var revealElements = document.querySelectorAll('[data-aiv]');

    function revealElement(element, scroll_pos, duration, timingFunction, delay) {
        var elementHeight = element.offsetHeight;
        var elementTop = element.offsetTop;
        element.style.transformOrigin = "50% 100%";
        element.style.transform = "translateY(" + 100 + "px) scale(1)";
        element.style.opacity = "0";
        // if (scroll_pos + window.innerHeight > elementTop + elementHeight * .4) {
        if (scroll_pos + window.innerHeight > elementTop + elementHeight) {
            // element.style.transition = "all 1s cubic-bezier(0.6, 0.2, 0.1, 1)";
            element.style.transition = "all " + duration + "ms " + delay + "ms " +  timingFunction;
            setTimeout(function() {
                element.style.transform = "translateY(0) scale(1)";
                element.style.opacity = "1";
            }, 0);
        }
    }
    // cache element properties
    revealElementsCached = [];
    revealElements.forEach(function(elem) {
        revealElementsCached.push({
            element: elem,
            duration: elem.getAttribute('data-duration') || 1000,
            timingFunction: elem.getAttribute('data-timing-function') || '',
            delay: elem.getAttribute('data-delay') ? parseInt(elem.getAttribute('data-delay')) : 0,
            elementHeight: elem.offsetHeight,
            elementTop: elem.offsetTop,
            onChildren: elem.getAttribute('data-aiv-children') || false,
            childrenDelay: elem.getAttribute('data-children-delay') || 0
        });
    });
    function reveal(scroll_pos) {
        revealElementsCached.forEach(function(elementObj) {
            if (elementObj.onChildren) {
                elementObj.element.querySelectorAll(':scope > *').forEach(function(element, index) {
                    revealElement(element, scroll_pos, elementObj.duration, elementObj.timingFunction, index * elementObj.childrenDelay);
                });
            } else {
                revealElement(elementObj.element, scroll_pos, elementObj.duration, elementObj.timingFunction, elementObj.delay);
            }
        });
    }
    
    if (revealElements.length) {
        var last_known_scroll_position = 0;
        var ticking = false;
        window.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    reveal(last_known_scroll_position);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    // end Reveal on scroll

    // BG Parallax
    (function() {
        var headers = document.querySelectorAll('[data-bg-parallax]');
        var ticking = false;
        function resetParallax(item) {
        if (item) item.style.backgroundPosition = 'center 0';
        else {
            headers.forEach(function(header) {
            header.style.backgroundPosition = 'center 0';  
            });  
        }
        
        }
        resetParallax();

        function calculateRangeValue(oldMin, oldMax, newMin, newMax, oldValue) {
        let oldRange = (oldMax - oldMin); 
        let newRange = (newMax - newMin);
        return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
        }

        function doSomething(scroll_pos) {
        headers.forEach(function(header, index) {
            if (scroll_pos > header.offsetTop - window.innerHeight / 2) {
            let oldMin = (header.offsetTop) < (window.innerHeight/2) ? header.offsetTop : header.offsetTop - window.innerHeight / 2;
            let oldMax = oldMin + header.offsetHeight;
            let yPosition = calculateRangeValue(
                oldMin, oldMax, 0, -50, scroll_pos);
            header.style.backgroundPosition = 'center ' + yPosition + 'px';
            } else {
            resetParallax(header);
            }  
        });
        }

        window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
            doSomething(last_known_scroll_position);
            ticking = false;
            });
            ticking = true;
        }
        });
    }());
    // end of BG Parallax

    // Code highlight
    document.querySelectorAll('pre code').forEach(function(block, i) {
        hljs.highlightBlock(block);
    });

  
}());