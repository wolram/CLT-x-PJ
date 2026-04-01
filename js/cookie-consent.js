// Cookie Consent Banner — CLT x PJ
// LGPD-compliant simple consent mechanism

(function () {
    'use strict';

    var CONSENT_KEY = 'cltxpj_cookie_consent';
    var banner = null;

    function createBanner() {
        banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookie-banner';
        banner.innerHTML =
            '<div class="cookie-banner-inner">' +
                '<div class="cookie-banner-text">' +
                    '<p>Usamos cookies para melhorar sua experiencia. ' +
                    '<a href="privacy.html">Politica de Privacidade</a> e ' +
                    '<a href="terms.html">Termos de Uso</a>.</p>' +
                '</div>' +
                '<div class="cookie-banner-actions">' +
                    '<button class="cookie-btn-accept" id="cookie-accept">Aceitar</button>' +
                    '<button class="cookie-btn-decline" id="cookie-decline">Recusar</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', function () {
            setConsent(true);
        });

        document.getElementById('cookie-decline').addEventListener('click', function () {
            setConsent(false);
        });
    }

    function setConsent(accepted) {
        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify({
                accepted: accepted,
                timestamp: Date.now()
            }));
        } catch (e) {}

        if (banner) {
            banner.classList.remove('visible');
            setTimeout(function () {
                if (banner && banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 400);
        }

        if (accepted && window.CLTxPJAnalytics) {
            window.CLTxPJAnalytics.init();
        }
    }

    function hasConsent() {
        try {
            var raw = localStorage.getItem(CONSENT_KEY);
            return raw !== null;
        } catch (e) {
            return false;
        }
    }

    function getConsentValue() {
        try {
            var raw = localStorage.getItem(CONSENT_KEY);
            if (!raw) return null;
            return JSON.parse(raw).accepted;
        } catch (e) {
            return null;
        }
    }

    function showBanner() {
        if (hasConsent()) return;
        createBanner();
        requestAnimationFrame(function () {
            banner.classList.add('visible');
        });
    }

    window.CLTxPJCookieConsent = {
        show: showBanner,
        hasConsent: hasConsent,
        getValue: getConsentValue
    };

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', function () {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/cookie-consent.css';
            document.head.appendChild(link);

            setTimeout(showBanner, 1500);
        });
    }
})();
