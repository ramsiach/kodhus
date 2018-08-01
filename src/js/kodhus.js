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

    /* notifications */
    var notifications = document.querySelectorAll('.cdt-notification');
    notifications.forEach(function(notification) {
        var closeBtn = notification.querySelector('.close') || notification.querySelector("[data-close='true']");
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                notification.classList.add('hide');
            });
        }
    });
    /* end of notification */


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


    var carousel = (function() {
        function whichTransitionEvent() {
            var el = document.createElement('fake'),
                transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                };
        
            for (var t in transEndEventNames) {
                if (el.style[t] !== undefined) {
                    return transEndEventNames[t];
                }
            }
        }
        
        var inTransition = false;
        
        var transEndEventName = whichTransitionEvent();
        
        var carousel = document.querySelector('.cdt-carousel');
        var carouselType = carousel.getAttribute('data-carousel-type');
        var autoSlide = carousel.getAttribute('data-auto-slide') ? (carousel.getAttribute('data-auto-slide') == 'true' ? true : false) : false;
        var slideDelay = carousel.getAttribute('data-slide-delay');
        
        var infinite = carousel.getAttribute('data-infinite') ? (carousel.getAttribute('data-infinite') == 'true' ? true : false) : false;
        var controls = carousel.querySelectorAll('.controls li');
        var arrowLeft = carousel.querySelector('.arrow.left');
        var arrowRight = carousel.querySelector('.arrow.right');
        var sections = carousel.querySelectorAll('section');
        var numElements = sections.length;
        
        var opacityDuration = carouselType === 'fade' ? carousel.getAttribute('data-opacity-duration') : 0;
        
        var carouselSlideSenseContainer = document.createElement('div');
        
        var selected = 0;
        
        function resetSections() {
            if (carouselType === 'slide-sense') {
        
                carouselSlideSenseContainer.classList.add('slideSense-container');
                carousel.prepend(carouselSlideSenseContainer); //prepend not working in IE ?!
            }
            sections.forEach(function(section, index) {
                if (carouselType === 'fade') {
                    section.style.zIndex = 0;
                    section.style.opacity = 0;
                    section.style.transition = 'opacity ' + opacityDuration + 'ms';
                } else if (carouselType === 'overlay' || carouselType === 'slide') {
                    if (index !== selected) {
                        section.style.zIndex = 0;
                    }
                } else if (carouselType === 'slide-sense') {
                    section.style.position = 'relative';
                    carouselSlideSenseContainer.appendChild(section);
                }
            });
        }
        
        function runCarousel(index, dir) {
            if (inTransition) return;
            if (!infinite && index === numElements - 1) {
                arrowRight.style.display = 'none';
            } else {
                arrowRight.style.display = 'block';
            }
            if (!infinite && index === 0) {
                arrowLeft.style.display = 'none';
            } else {
                arrowLeft.style.display = 'block';
            }
            /* setting z-index of all to 0 */
            if (carouselType !== 'slide-sense') {
                resetSections();
            }
            if (carouselType === 'slide-sense') {
        
                carouselSlideSenseContainer.style.transition = 'transform 1s';
                carouselSlideSenseContainer.style.transform = 'translateX(' + -index * 25 + '%)';
                selected = index;
            }
        
            if (carouselType === 'slide') {
                sections[index].style.zIndex = 5;
            } else if (carouselType === 'overlay') {
                sections[selected].style.zIndex = 7;
                sections[index].style.zIndex = 6;
            }
        
            if (carouselType === 'overlay' || carouselType === 'slide') {
                if (infinite) {
                    if ((index > selected && (index !== numElements - 1)) || (dir && dir === 'right')) {
                        sections[index].style.transform = 'translateX(100%)';
                    } else {
                        sections[index].style.transform = 'translateX(-100%)';
                    }
                } else {
                    if (index > selected) {
                        sections[index].style.transform = 'translateX(100%)';
                    } else {
                        sections[index].style.transform = 'translateX(-100%)';
                    }
                }
            }
        
            if (controls.length) {
                controls.forEach(function(control) {
                    control.classList.remove('selected');
                });
            }
        
            setTimeout(function() {
                inTransition = true;
                if (carouselType === 'slide-sense') {
                    if (controls.length) controls[index].classList.add('selected');
                    carouselSlideSenseContainer.addEventListener(transEndEventName, function(e) {
                        selected = index;
                        inTransition = false;
                    });
                } else {
                    sections[selected].style.transition = 'transform 1s';
                    if (carouselType === 'fade') {
                        /* set corresponding section z-index to 1*/
                        sections[index].style.zIndex = 6;
                        sections[index].style.opacity = 1;
                        selected = index;
                        inTransition = false;
                    }
                    if (carouselType === 'slide') {
                        sections[index].style.transition = 'transform 1s';
                    }
        
                    if (carouselType === 'overlay' || carouselType === 'slide') {
                        if (infinite) {
                            if ((index > selected && (index !== numElements - 1)) || (dir && dir === 'right')) {
                                sections[selected].style.transform = 'translateX(-100%)';
                            } else {
                                sections[selected].style.transform = 'translateX(100%)';
                            }
                        } else {
                            if (index > selected) {
                                sections[selected].style.transform = 'translateX(-100%)';
                            } else {
                                sections[selected].style.transform = 'translateX(100%)';
                            }
                        }
                        sections[index].style.transform = 'translateX(0)';
                        sections[index].style.transform = 'translateX(0)';
                    }
                    if (controls.length) controls[index].classList.add('selected');
                    var transitionCounter = 0;
                    sections[selected].addEventListener(transEndEventName, function(e) {
                        transitionCounter++;
                        if (transitionCounter === 1 && e.propertyName === 'transform') {
                            sections[selected].style.transform = '';
                            sections[selected].style.transition = '';
                            sections[index].style.transform = '';
                            sections[index].style.transition = '';
                            if (carouselType === 'overlay') {
                                sections[selected].style.zIndex = 6;
                                sections[index].style.zIndex = 7;
                            } else if (carouselType === 'slide') {
                                resetSections();
                                sections[selected].style.zIndex = 5;
                                sections[index].style.zIndex = 6;
                            }
                            selected = index;
                            inTransition = false;
                        }
                    });
                }
            }, 0);
        }
        
        function slide() {
            infinite = true;
            var intervalId = setInterval(function() {
                var index;
                if (selected + 1 >= numElements) {
                    if (infinite) {
                        index = 0
                    } else {
                        index = numElements - 1;
                    }
                } else {
                    index = selected + 1;
                }
                runCarousel(index);
            }, slideDelay);
        }
        if (autoSlide) {
            slide();
        }
        if (arrowLeft) {
            arrowLeft.addEventListener('click', function() {
                if (selected === 0 && !infinite) return;
                var index;
                if (selected - 1 < 0) {
                    if (infinite) {
                        index = numElements - 1
                    } else {
                        index = 0;
                    }
                } else {
                    index = selected - 1;
                }
                runCarousel(index, 'left');
            });
        }
        if (arrowRight) {
            arrowRight.addEventListener('click', function() {
                if (selected === numElements - 1 && !infinite) return
                var index;
                if (selected + 1 >= numElements) {
                    if (infinite) {
                        index = 0
                    } else {
                        index = numElements - 1;
                    }
                } else {
                    index = selected + 1;
                }
                runCarousel(index, 'right');
            });
        }
        
        var initCarousel = function() {
            resetSections();
            sections[selected].style.zIndex = 6;
            if (carouselType === 'fade') {
                sections[selected].style.opacity = 1;
            }
            if (controls.length) controls[selected].classList.add('selected');
        
            controls.forEach(function(control, index) {
                control.addEventListener('click', function() {
                    if (index === selected) return;
                    runCarousel(index);
                });
            });
        }
        initCarousel();
    }());

  
}());