/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

         __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
            /* harmony export */
         });
         /*---------------------------------------------------------------------------
         Проверка WebP
         ---------------------------------------------------------------------------*/
         function isWebp() {
            function testWebP(callback) {
               const webP = new Image();
               webP.onload = webP.onerror = function () {
                  callback(webP.height === 2);
               };
               webP.src =
                  "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }

            testWebP(function (support) {
               document.body.classList.add(support ? "webp" : "no-webp");
            });
         }


         /*---------------------------------------------------------------------------
         Маска телефона
         ---------------------------------------------------------------------------*/
         function phoneMask() {
            document.addEventListener("DOMContentLoaded", () => {
               document.querySelectorAll("input.tel-mask").forEach((input) => {
                  let keyCode;
                  function mask(event) {
                     event.keyCode && (keyCode = event.keyCode);
                     let pos = this.selectionStart;
                     if (pos < 3) event.preventDefault();
                     let matrix = "+7 (___) ___ __ __",
                        i = 0,
                        val = this.value.replace(/\D/g, ""),
                        new_value = matrix.replace(/[_\d]/g, (a) =>
                           i < val.length ? val.charAt(i++) : a
                        );
                     i = new_value.indexOf("_");
                     if (i !== -1) {
                        i < 5 && (i = 3);
                        new_value = new_value.slice(0, i);
                     }
                     let reg = matrix
                        .substr(0, this.value.length)
                        .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
                        .replace(/[+()]/g, "\\$&");
                     reg = new RegExp("^" + reg + "$");
                     if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
                        this.value = new_value;
                     }
                     if (event.type === "blur" && this.value.length < 5) this.value = "";
                  }

                  input.addEventListener("input", mask);
                  input.addEventListener("focus", mask);
                  input.addEventListener("blur", mask);
                  input.addEventListener("keydown", mask);
               });
            });
         }


         /*---------------------------------------------------------------------------
         Бургер меню
         ---------------------------------------------------------------------------*/
         function burgerMenu() {
            document.addEventListener("DOMContentLoaded", () => {
               const menuIcon = document.querySelector(".menu__icon");
               const menuBody = document.querySelector(".menu__body");
               const body = document.body;
               const menuBodyClose = document.querySelector(".menu__body-close");
               const animationDuration = 500;

               if (!menuIcon || !menuBody) return;

               const closeMenu = () => {
                  menuIcon.classList.remove("active");
                  menuBody.classList.remove("active");
                  body.classList.remove("no-scroll");
               };

               menuIcon.addEventListener("click", () => {
                  menuIcon.classList.toggle("active");
                  menuBody.classList.toggle("active");
                  body.classList.toggle("no-scroll");
               });

               if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

               document.addEventListener("click", (e) => {
                  if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
               });
            });
         }


         /*==========================================================================
         Submenu
         ============================================================================*/
         document.addEventListener("DOMContentLoaded", function () {
            const isTouch = window.matchMedia("(hover: none)").matches;

            if (isTouch) {
               document.querySelectorAll(".has-submenu > a").forEach(link => {
                  link.addEventListener("click", function (e) {
                     e.preventDefault();
                     const parent = this.parentElement;
                     document.querySelectorAll(".has-submenu").forEach(item => {
                        if (item !== parent) {
                           item.classList.remove("active");
                        }
                     });
                     parent.classList.toggle("active");
                  });
               });
            }
         });



         /*---------------------------------------------------------------------------
         Попапы
         ---------------------------------------------------------------------------*/
         function popups() {
            if (document.readyState === "loading") {
               document.addEventListener("DOMContentLoaded", initPopups);
            } else {
               initPopups();
            }
         }

         function initPopups() {
            const POPUP_SELECTOR = ".popup";
            const OPEN_BTN_SELECTOR = ".open-popup";
            const ACTIVE_CLASS = "show";
            const BODY_ACTIVE_CLASS = "popup-opened";

            let activeButton = null;

            // =========================
            // OPEN / SWITCH POPUPS
            // =========================
            document.addEventListener("click", (e) => {
               const button = e.target.closest(OPEN_BTN_SELECTOR);
               if (!button) return;

               e.preventDefault();
               e.stopPropagation();

               const popupId = button.dataset.popup;
               if (!popupId) return;

               const popup = document.getElementById(popupId);
               if (!popup) return;

               const currentPopup = document.querySelector(
                  `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
               );

               if (activeButton === button && currentPopup) {
                  closePopup(currentPopup);
                  return;
               }

               if (currentPopup) {
                  closePopup(currentPopup);
               }

               openPopup(popup, button);
            });

            // =========================
            // CLOSE POPUPS
            // =========================
            document.addEventListener("click", (e) => {
               const openPopupEl = document.querySelector(
                  `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
               );
               if (!openPopupEl) return;

               if (e.target.closest(OPEN_BTN_SELECTOR)) return;

               const isCloseBtn = e.target.closest(".popup__close");
               const isInsideBody = e.target.closest(".popup__body");

               if (isCloseBtn || !isInsideBody) {
                  closePopup(openPopupEl);
               }
            });


            // =========================
            // ESC KEY
            // =========================
            document.addEventListener("keydown", (e) => {
               if (e.key !== "Escape") return;

               const openPopupEl = document.querySelector(
                  `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
               );
               if (!openPopupEl) return;

               closePopup(openPopupEl);
            });

            // =========================
            // HELPERS
            // =========================
            function openPopup(popup, button) {
               popup.classList.add(ACTIVE_CLASS);
               document.body.classList.add(BODY_ACTIVE_CLASS);

               if (button) {
                  button.classList.add("active");
                  activeButton = button;
               }
            }

            function closePopup(popup) {
               popup.classList.remove(ACTIVE_CLASS);
               document.body.classList.remove(BODY_ACTIVE_CLASS);

               if (activeButton) {
                  activeButton.classList.remove("active");
                  activeButton = null;
               }
            }
         }


         /***/
      })
/******/]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
         /******/
      }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
         /******/
      };
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
   }
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
               /******/
            }
            /******/
         }
         /******/
      };
      /******/
   })();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      /******/
   })();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
         }
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
         /******/
      };
      /******/
   })();
   /******/
   /************************************************************************/
   var __webpack_exports__ = {};
   // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
   (() => {
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

      /*==========================================================================
      Observer Animation
      ============================================================================*/
      /* if (document.readyState === "complete") {
         init();
      } else {
         window.addEventListener("load", init);
      }
      
      function init() {
         function onEntry(entry) {
            entry.forEach(change => {
               if (change.isIntersecting) {
                  change.target.classList.add('element-show');
               }
            });
         }
      
         let options = { threshold: [0.4] };
         let observer = new IntersectionObserver(onEntry, options);
         let elements = document.querySelectorAll('.element-animation');
         for (let elm of elements) {
            observer.observe(elm);
         }
      } */

      /*==========================================================================
      Swiper slider
      ============================================================================*/
      /* const reviewsSlider = document.querySelector(".reviews__slider");
      
      if (reviewsSlider) {
         const reviewsSwiper = new Swiper(reviewsSlider, {
            slidesPerView: 1,
            loop: true,
            freeMode: false,
            parallax: true,
            speed: 800,
            pagination: {
               el: ".reviews__slider-pagination",
               clickable: true,
            },
            navigation: {
               nextEl: ".reviews__slide-next",
               prevEl: ".reviews__slide-prev",
            },
         });
      }
       */

      /*==========================================================================
      Header bg
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const header = document.querySelector('.header');
         if (!header) return;

         const toggleHeaderBg = () => {
            if (window.scrollY > 0) {
               header.classList.add('-bg');
            } else {
               header.classList.remove('-bg');
            }
         };

         toggleHeaderBg();
         window.addEventListener('scroll', toggleHeaderBg, { passive: true });
      });


      /*==========================================================================
      Consultation
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const consultation = document.querySelector('.header__consultation');
         if (!consultation) return;

         const btn = consultation.querySelector('.header__consultation-btn');
         const popup = consultation.querySelector('.header__consultation-popup');

         if (!btn || !popup) return;

         btn.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.classList.toggle('show');
         });


         document.addEventListener('click', (e) => {
            if (!consultation.contains(e.target)) {
               popup.classList.remove('show');
            }
         });


      });


      /*==========================================================================
      Move menu elements
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const BREAKPOINT = 1100;

         const buttonsWrapper = document.querySelector('.header__buttons-wrapper');
         const menuBody = document.querySelector('.menu__body');
         const headerButtons = document.querySelector('.header__buttons');

         if (!buttonsWrapper || !menuBody || !headerButtons) return;

         const originalParent = headerButtons;

         function moveHeaderButtons() {
            const isMobile = window.innerWidth <= BREAKPOINT;

            if (isMobile) {
               if (!menuBody.contains(buttonsWrapper)) {
                  menuBody.appendChild(buttonsWrapper);
               }
            } else {
               if (!originalParent.contains(buttonsWrapper)) {
                  originalParent.appendChild(buttonsWrapper);
               }
            }
         }

         moveHeaderButtons();
         window.addEventListener('resize', moveHeaderButtons);
      });

      /*==========================================================================
      Galleries
      ============================================================================*/
      Fancybox.bind('[data-fancybox]', {
         groupAll: false
      });

      /*==========================================================================
      Team slider
      ============================================================================*/
      const teamSlider = document.querySelector(".team__slider");

      if (teamSlider) {
         const teamSwiper = new Swiper(teamSlider, {
            slidesPerView: 4,
            spaceBetween: 24,
            loop: true,
            navigation: {
               nextEl: ".team__navigation-next",
               prevEl: ".team__navigation-prev",
            },
            breakpoints: {
               320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
               },
               850: {
                  slidesPerView: 3,
                  spaceBetween: 20,
               },
               1200: {
                  slidesPerView: 4,
                  spaceBetween: 24,
               },
            }
         });
      }

      /*==========================================================================
      Hide text
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const BREAKPOINT = 980;
         const items = document.querySelectorAll('.about__popup-hide');

         if (!items.length) return;

         function applyCollapse() {
            const isMobile = window.innerWidth <= BREAKPOINT;

            items.forEach(item => {
               let btn = item.nextElementSibling;

               if (isMobile) {
                  if (!btn || !btn.classList.contains('about__popup-more')) {
                     btn = document.createElement('button');
                     btn.type = 'button';
                     btn.className = 'about__popup-more';
                     btn.textContent = 'Подробнее';
                     item.after(btn);

                     btn.addEventListener('click', () => {
                        item.classList.toggle('is-collapsed');
                        btn.textContent = item.classList.contains('is-collapsed')
                           ? 'Подробнее'
                           : 'Свернуть';
                     });
                  }

                  item.classList.add('is-collapsed');
               } else {
                  item.classList.remove('is-collapsed');

                  if (btn && btn.classList.contains('about__popup-more')) {
                     btn.remove();
                  }
               }
            });
         }

         applyCollapse();
         window.addEventListener('resize', applyCollapse);
      });


      /*==========================================================================
      faq
      ============================================================================*/
      document.addEventListener("DOMContentLoaded", () => {
         const faqItems = document.querySelectorAll(".faq__item");

         if (!faqItems || faqItems.length === 0) return;

         faqItems.forEach((item) => {
            if (!item) return;

            const question = item.querySelector(".faq__question");
            const answer = item.querySelector(".faq__answer");

            if (!question || !answer) return;

            const toggleFaqItem = () => {
               const isActive = item.classList.contains("active");

               faqItems.forEach((el) => {
                  const elAnswer = el.querySelector(".faq__answer");
                  if (elAnswer) {
                     el.classList.remove("active");
                     elAnswer.style.maxHeight = null;
                  }
               });

               if (!isActive) {
                  item.classList.add("active");
                  answer.style.maxHeight = answer.scrollHeight + 32 + "px";
               }
            };

            question.addEventListener("click", toggleFaqItem);
         });
      });

      /*==========================================================================
      Dropdown
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const dropdowns = document.querySelectorAll('.dropdown');

         if (!dropdowns.length) return;

         dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown__button');
            const buttonText = button?.querySelector('p');
            const list = dropdown.querySelector('.dropdown__list');
            const radios = dropdown.querySelectorAll('input[type="radio"]');

            if (!button || !list || !buttonText) return;

            button.addEventListener('click', (e) => {
               e.stopPropagation();

               dropdowns.forEach(d => {
                  if (d !== dropdown) d.classList.remove('is-open');
               });

               dropdown.classList.toggle('is-open');
            });

            radios.forEach(radio => {
               radio.addEventListener('change', () => {
                  const labelText = radio.closest('.dropdown__label')?.textContent.trim();

                  if (labelText) {
                     buttonText.textContent = labelText;
                  }

                  dropdown.classList.remove('is-open');
               });
            });
         });

         document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown.is-open')
               .forEach(dropdown => dropdown.classList.remove('is-open'));
         });
      });

      /*==========================================================================
      Move elements
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const usefulBody = document.querySelector('.blog__useful-body');
         const usefulParent = document.querySelector('.blog__useful');
         const articles = document.querySelector('.blog__articles');

         if (!usefulBody || !usefulParent || !articles) return;

         const mediaQuery = window.matchMedia('(max-width: 1200px)');

         const moveElement = () => {
            if (mediaQuery.matches) {
               if (!articles.contains(usefulBody)) {
                  articles.appendChild(usefulBody);
               }
            } else {
               if (!usefulParent.contains(usefulBody)) {
                  usefulParent.appendChild(usefulBody);
               }
            }
         };

         moveElement();
         mediaQuery.addEventListener('change', moveElement);
      });


      /*==========================================================================
      Article videos
      ============================================================================*/
      document.addEventListener('DOMContentLoaded', () => {
         const videos = document.querySelectorAll('.article__video');

         videos.forEach((wrapper) => {
            const video = wrapper.querySelector('video');
            const playBtn = wrapper.querySelector('.article__video-play');

            if (!video || !playBtn) return;

            playBtn.addEventListener('click', () => {
               // ставим на паузу все остальные видео
               videos.forEach((otherWrapper) => {
                  if (otherWrapper !== wrapper) {
                     const otherVideo = otherWrapper.querySelector('video');
                     otherVideo.pause();
                     otherVideo.removeAttribute('controls');
                     otherWrapper.classList.remove('is-playing');
                  }
               });

               video.setAttribute('controls', 'controls');
               video.play();
               wrapper.classList.add('is-playing');
            });

            // если пользователь поставил видео на паузу
            video.addEventListener('pause', () => {
               wrapper.classList.remove('is-playing');
            });
         });
      });

      /*==========================================================================
      Article slider
      ============================================================================*/
      const articleSlider = document.querySelector(".article__slider");

      if (articleSlider) {
         const articleSwiper = new Swiper(articleSlider, {
            slidesPerView: 1,
            loop: true,
            navigation: {
               nextEl: ".article__slider-next",
               prevEl: ".article__slider-prev",
            },
         });
      }

   })();


   /*==========================================================================
   TEST IN DEV
   ============================================================================*/
   /*==========================================================================
   TEST IN DEV
   ============================================================================*/
   document.addEventListener('DOMContentLoaded', () => {
      const tooltipClass = 'in-dev-tooltip';
      const tooltipText = 'Раздел в разработке';
      let hideTimer = null;

      const tooltip = document.createElement('div');
      tooltip.className = tooltipClass;
      tooltip.textContent = tooltipText;

      if (window.location.pathname === '/blog/' || window.location.pathname === '/blog') {
         tooltip.classList.add('-white');
      }

      tooltip.style.position = 'absolute';
      tooltip.style.display = 'none';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.zIndex = '9999';
      tooltip.style.transform = 'translateX(-50%)';

      document.body.appendChild(tooltip);

      function showTooltip(target) {
         const rect = target.getBoundingClientRect();
         const header = document.querySelector('.header');

         tooltip.style.display = 'block';
         const tooltipHeight = tooltip.offsetHeight;

         let top = rect.top + window.scrollY - tooltipHeight;

         if (header && header.classList.contains('-bg')) {
            top += tooltipHeight * 0.4;
         }

         if (top < 0) top = window.scrollY + 10;

         tooltip.style.top = top + 'px';
         tooltip.style.left = rect.left + window.scrollX + rect.width / 2 + 'px';

         if (hideTimer) clearTimeout(hideTimer);
         hideTimer = setTimeout(() => {
            tooltip.style.display = 'none';
         }, 3000);
      }

      const inDevElements = document.querySelectorAll('.in-dev');

      inDevElements.forEach(el => {
         el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showTooltip(el);
         });
      });

      document.addEventListener('click', (e) => {
         if (!e.target.closest('.in-dev')) {
            tooltip.style.display = 'none';
            if (hideTimer) clearTimeout(hideTimer);
         }
      });
   });



   /*==========================================================================
   Form submissions - Callback form
   ============================================================================*/
   document.addEventListener('DOMContentLoaded', () => {
      const callbackForm = document.getElementById('callback-form');
      if (callbackForm) {
         callbackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            formData.append('action', 'submit_callback_form');
            formData.append('nonce', yurclickAjax.nonce);

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            fetch(yurclickAjax.ajaxurl, {
               method: 'POST',
               body: formData
            })
               .then(res => res.json())
               .then(data => {
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;

                  if (data.success) {
                     // Закрыть текущий popup
                     const callbackPopup = document.getElementById('callback-popup');
                     if (callbackPopup) {
                        callbackPopup.classList.remove('show');
                     }
                     // Открыть thanks popup
                     const thanksPopup = document.getElementById('thanks-popup');
                     if (thanksPopup) {
                        thanksPopup.classList.add('show');
                        document.body.classList.add('popup-opened');
                     }
                     this.reset();
                  } else {
                     alert(data.data || 'Ошибка отправки. Попробуйте позже.');
                  }
               })
               .catch(err => {
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;
                  alert('Ошибка сети. Попробуйте позже.');
               });
         });
      }
   });

   /*==========================================================================
   Form submissions - Partnership form
   ============================================================================*/
   document.addEventListener('DOMContentLoaded', () => {
      const partnershipForm = document.getElementById('partnership-form');
      if (partnershipForm) {
         partnershipForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            formData.append('action', 'submit_partnership_form');
            formData.append('nonce', yurclickAjax.nonce);

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            fetch(yurclickAjax.ajaxurl, {
               method: 'POST',
               body: formData
            })
               .then(res => res.json())
               .then(data => {
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;

                  if (data.success) {
                     // Закрыть текущий popup
                     const partnershipPopup = document.getElementById('partnership-popup');
                     if (partnershipPopup) {
                        partnershipPopup.classList.remove('show');
                     }
                     const partnershipSecPopup = document.getElementById('partnership-sec-popup');
                     if (partnershipSecPopup) {
                        partnershipSecPopup.classList.remove('show');
                     }
                     // Открыть thanks popup
                     const thanksPopup = document.getElementById('thanks-popup');
                     if (thanksPopup) {
                        thanksPopup.classList.add('show');
                        document.body.classList.add('popup-opened');
                     }
                     this.reset();
                     // Сбросить dropdown
                     const dropdownBtn = this.querySelector('.dropdown__button p');
                     if (dropdownBtn) {
                        dropdownBtn.textContent = 'Выберите в какой области вы хотите с нами сотрудничать';
                     }
                  } else {
                     alert(data.data || 'Ошибка отправки. Попробуйте позже.');
                  }
               })
               .catch(err => {
                  submitBtn.textContent = originalText;
                  submitBtn.disabled = false;
                  alert('Ошибка сети. Попробуйте позже.');
               });
         });
      }
   });

   /*==========================================================================
   Team popup AJAX
   ============================================================================*/
   document.addEventListener('DOMContentLoaded', () => {
      const teamPopup = document.getElementById('team-popup');
      if (!teamPopup) return;

      // Обработчик для кнопок открытия team popup
      document.addEventListener('click', (e) => {
         const btn = e.target.closest('[data-team-id]');
         if (!btn) return;

         const teamId = btn.dataset.teamId;
         if (!teamId) return;

         // Показать loading state
         const photoEl = teamPopup.querySelector('[data-team-photo] img, .team__popup-photo img');
         const nameEl = teamPopup.querySelector('[data-team-name], .team__popup-name');
         const positionEl = teamPopup.querySelector('[data-team-position]');
         const bioEl = teamPopup.querySelector('[data-team-bio]');
         const detailsEl = teamPopup.querySelector('[data-team-details]');

         if (nameEl) nameEl.textContent = 'Загрузка...';
         if (positionEl) positionEl.textContent = '';
         if (bioEl) bioEl.textContent = '';
         if (detailsEl) detailsEl.innerHTML = '';

         // AJAX запрос
         const formData = new FormData();
         formData.append('action', 'get_team_member');
         formData.append('nonce', yurclickAjax.nonce);
         formData.append('team_id', teamId);

         fetch(yurclickAjax.ajaxurl, {
            method: 'POST',
            body: formData
         })
            .then(res => res.json())
            .then(data => {
               if (data.success) {
                  const d = data.data;
                  if (photoEl && d.photo) {
                     photoEl.src = d.photo;
                     photoEl.alt = d.name || '';
                  }
                  if (nameEl) nameEl.textContent = d.name || '';
                  if (positionEl) positionEl.textContent = d.position || '';
                  if (bioEl) bioEl.textContent = d.short_bio || '';
                  if (detailsEl) detailsEl.innerHTML = d.full_bio || '';
               }
            })
            .catch(err => {
               if (nameEl) nameEl.textContent = 'Ошибка загрузки';
            });
      });
   });

   /******/
})()
   ;