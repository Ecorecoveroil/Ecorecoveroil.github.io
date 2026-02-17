/* ============================================================
   ECO RECOVER OIL — i18n Language Switcher
   ============================================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'ECO RECOVER OIL-lang';
    const DEFAULT_LANG = 'en';
    const RTL_LANGS = ['ar'];

    // Get saved language or default
    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    }

    // Save language
    function setLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
    }

    // Apply translations to all elements with data-i18n
    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                // Check if it's an input/textarea (use placeholder) or regular element
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key][lang];
                } else if (el.tagName === 'OPTION' && el.hasAttribute('data-i18n')) {
                    el.textContent = translations[key][lang];
                } else {
                    el.innerHTML = translations[key][lang];
                }
            }
        });

        // Update data-i18n-placeholder elements
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });
    }

    // Handle RTL/LTR direction
    function applyDirection(lang) {
        const isRTL = RTL_LANGS.includes(lang);
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        document.body.classList.toggle('rtl', isRTL);

        // Force body direction
        document.body.style.direction = isRTL ? 'rtl' : 'ltr';
        document.body.style.textAlign = isRTL ? 'right' : '';

        // === Force inline styles on stubborn elements ===
        // Timeline green line: move to right
        const processTimeline = document.querySelector('.process-timeline');
        if (processTimeline) {
            // Patch the ::before via a dynamic <style> tag
            let rtlStyleTag = document.getElementById('rtl-inline-fix');
            if (isRTL) {
                if (!rtlStyleTag) {
                    rtlStyleTag = document.createElement('style');
                    rtlStyleTag.id = 'rtl-inline-fix';
                    document.head.appendChild(rtlStyleTag);
                }
                rtlStyleTag.textContent = `
                    html[dir="rtl"] .process-timeline::before {
                        left: auto !important;
                        right: 40px !important;
                    }
                    html[dir="rtl"] .timeline-item {
                        direction: rtl !important;
                        flex-direction: row !important;
                        text-align: right !important;
                    }
                    html[dir="rtl"] .timeline-item.visible {
                        opacity: 1 !important;
                        transform: translateX(0) !important;
                    }
                    html[dir="rtl"] .segment-card {
                        direction: rtl !important;
                        flex-direction: row !important;
                        text-align: right !important;
                    }
                    html[dir="rtl"] .segment-card h4,
                    html[dir="rtl"] .segment-card p {
                        text-align: right !important;
                    }
                    html[dir="rtl"] .segment-type {
                        direction: rtl !important;
                        flex-direction: row !important;
                    }
                    html[dir="rtl"] .activity-list li {
                        direction: rtl !important;
                        flex-direction: row !important;
                        text-align: right !important;
                    }
                    html[dir="rtl"] .feature-item {
                        direction: rtl !important;
                        flex-direction: row !important;
                        text-align: right !important;
                    }
                    html[dir="rtl"] .feature-item h4,
                    html[dir="rtl"] .feature-item p {
                        text-align: right !important;
                    }
                    html[dir="rtl"] .advantage-card::before {
                        left: auto !important;
                        right: 0 !important;
                    }
                    @media (max-width: 768px) {
                        html[dir="rtl"] .process-timeline::before {
                            left: auto !important;
                            right: 20px !important;
                        }
                    }
                `;
            } else {
                if (rtlStyleTag) {
                    rtlStyleTag.remove();
                }
            }
        }

        // Force timeline items inline
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (isRTL) {
                item.style.direction = 'rtl';
                item.style.flexDirection = 'row';
                item.style.textAlign = 'right';
            } else {
                item.style.direction = '';
                item.style.flexDirection = '';
                item.style.textAlign = '';
            }
        });

        // Force segment cards inline — use direction:rtl (NOT flex-direction row-reverse)
        // because cards have 3 direct children (icon, h4, p)
        document.querySelectorAll('.segment-card').forEach(card => {
            if (isRTL) {
                card.style.direction = 'rtl';
                card.style.flexDirection = 'row';
                card.style.textAlign = 'right';
            } else {
                card.style.direction = '';
                card.style.flexDirection = '';
                card.style.textAlign = '';
            }
        });

        // Force segment type headers inline
        document.querySelectorAll('.segment-type').forEach(st => {
            if (isRTL) {
                st.style.direction = 'rtl';
                st.style.flexDirection = 'row';
            } else {
                st.style.direction = '';
                st.style.flexDirection = '';
            }
        });

        // Force feature items inline — direction:rtl makes row go right-to-left
        document.querySelectorAll('.feature-item').forEach(fi => {
            if (isRTL) {
                fi.style.direction = 'rtl';
                fi.style.flexDirection = 'row';
                fi.style.textAlign = 'right';
            } else {
                fi.style.direction = '';
                fi.style.flexDirection = '';
                fi.style.textAlign = '';
            }
        });

        // Force activity list items inline
        document.querySelectorAll('.activity-list li').forEach(li => {
            if (isRTL) {
                li.style.direction = 'rtl';
                li.style.flexDirection = 'row';
                li.style.textAlign = 'right';
            } else {
                li.style.direction = '';
                li.style.flexDirection = '';
                li.style.textAlign = '';
            }
        });

        // Force timeline content text align
        document.querySelectorAll('.timeline-content').forEach(tc => {
            if (isRTL) {
                tc.style.textAlign = 'right';
            } else {
                tc.style.textAlign = '';
            }
        });

        // Force advantage card green bar to right
        document.querySelectorAll('.advantage-card').forEach(card => {
            if (isRTL) {
                card.style.textAlign = 'right';
            } else {
                card.style.textAlign = '';
            }
        });

        // Re-trigger timeline animations so RTL transforms apply correctly
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (item.classList.contains('visible')) {
                item.classList.remove('visible');
                void item.offsetWidth; // force reflow
                item.classList.add('visible');
            }
        });
    }

    // Update active state of language buttons
    function updateLangButtons(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // Switch language
    function switchLanguage(lang) {
        setLang(lang);
        applyDirection(lang);
        applyTranslations(lang);
        updateLangButtons(lang);
    }

    // Initialize on DOM ready
    function init() {
        const lang = getLang();

        // Create language switcher HTML and inject into nav
        injectLanguageSwitcher();

        // Apply initial language
        applyDirection(lang);
        applyTranslations(lang);
        updateLangButtons(lang);

        // Bind click events
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = btn.getAttribute('data-lang');
                switchLanguage(newLang);
            });
        });
    }

    // Inject the language switcher into all navbars
    function injectLanguageSwitcher() {
        const navContainers = document.querySelectorAll('.nav-container');
        navContainers.forEach(container => {
            // Check if switcher already exists
            if (container.querySelector('.lang-switcher')) return;

            const switcher = document.createElement('div');
            switcher.className = 'lang-switcher';
            switcher.innerHTML = `
                <button class="lang-btn" data-lang="en" title="English">EN</button>
                <button class="lang-btn" data-lang="fr" title="Français">FR</button>
                <button class="lang-btn" data-lang="ar" title="العربية">ع</button>
            `;

            // Insert before hamburger
            const hamburger = container.querySelector('.hamburger');
            if (hamburger) {
                container.insertBefore(switcher, hamburger);
            } else {
                container.appendChild(switcher);
            }
        });
    }

    // Run init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose globally
    window.switchLanguage = switchLanguage;

})();
