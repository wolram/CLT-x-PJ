// Analytics module for CLT x PJ landing page funnel tracking
// Tracks key conversion events for GA4 and custom analytics

(function () {
    'use strict';

    var ANALYTICS_ID = window.ANALYTICS_ID || null;
    var isInitialized = false;

    // Custom event queue (works even before analytics loads)
    var eventQueue = [];

    /**
     * Initialize analytics (GA4 or custom endpoint)
     */
    function init() {
        if (isInitialized) return;

        // GA4 initialization
        if (ANALYTICS_ID && ANALYTICS_ID.indexOf('G-') === 0) {
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', ANALYTICS_ID, {
                send_page_view: true,
                custom_map: {
                    'custom_parameter_1': 'simulation_type',
                    'custom_parameter_2': 'waitlist_source'
                }
            });
        }

        // Process any queued events
        while (eventQueue.length > 0) {
            var evt = eventQueue.shift();
            trackEvent(evt.name, evt.params);
        }

        isInitialized = true;
    }

    /**
     * Track a custom event
     * @param {string} name - Event name
     * @param {Object} params - Event parameters
     */
    function trackEvent(name, params) {
        if (!isInitialized) {
            eventQueue.push({ name: name, params: params || {} });
            return;
        }

        // GA4
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, params);
        }

        // Netlify Functions telemetry (built-in)
        try {
            navigator.sendBeacon && navigator.sendBeacon('/api/telemetry', JSON.stringify({
                event_type: name,
                event_data: Object.assign({}, params || {}, {
                    url: window.location.href,
                    timestamp: Date.now()
                })
            }));
        } catch (e) {
            fetch('/api/telemetry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_type: name,
                    event_data: Object.assign({}, params || {}, {
                        url: window.location.href,
                        timestamp: Date.now()
                    })
                }),
                keepalive: true
            }).catch(function () {});
        }

        // Custom analytics endpoint (if configured)
        if (window.CUSTOM_ANALYTICS_URL) {
            try {
                navigator.sendBeacon && navigator.sendBeacon(window.CUSTOM_ANALYTICS_URL, JSON.stringify({
                    event: name,
                    params: params || {},
                    url: window.location.href,
                    timestamp: Date.now()
                }));
            } catch (e) {
                // Fallback to fetch
                fetch(window.CUSTOM_ANALYTICS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: name,
                        params: params || {},
                        url: window.location.href,
                        timestamp: Date.now()
                    }),
                    keepalive: true
                }).catch(function () {});
            }
        }

        // Console logging in dev mode
        if (window.ANALYTICS_DEBUG) {
            console.log('[Analytics]', name, params || '');
        }
    }

    // ============================================================
    // Funnel-specific event helpers
    // ============================================================

    /**
     * User viewed hero section
     */
    function trackHeroView() {
        trackEvent('hero_view', {
            page: 'landing',
            has_simulator: true
        });
    }

    /**
     * User interacted with the CLT x PJ simulator
     */
    function trackSimulation(type, cltValue, pjValue) {
        trackEvent('simulation_started', {
            simulation_type: type || 'manual',
            clt_value_range: getValueRange(cltValue),
            pj_value_range: getValueRange(pjValue)
        });
    }

    /**
     * User completed a simulation (got a result)
     */
    function trackSimulationComplete(winner, cltValue, pjValue) {
        trackEvent('simulation_complete', {
            winner: winner, // 'CLT' | 'PJ' | 'tie'
            clt_value_range: getValueRange(cltValue),
            pj_value_range: getValueRange(pjValue)
        });
    }

    /**
     * User clicked primary CTA
     */
    function trackCTAClick(ctaName, source) {
        trackEvent('cta_click', {
            cta_name: ctaName, // 'download_ios' | 'download_android' | 'compare_in_app' | 'whatsapp' | 'email'
            source: source || 'hero' // hero | simulator | footer | navbar
        });
    }

    /**
     * User clicked "Ver leitura da proposta" (AI analysis)
     */
    function trackAnalysisRequest() {
        trackEvent('analysis_requested', {
            source: 'simulator'
        });
    }

    /**
     * User clicked "Quero apoio para negociar"
     */
    function trackNegotiationSupport() {
        trackEvent('negotiation_support_click', {
            source: 'simulator'
        });
    }

    /**
     * User started waitlist form
     */
    function trackWaitlistStart(source) {
        trackEvent('waitlist_started', {
            waitlist_source: source || 'android' // android | general | homepage
        });
    }

    /**
     * User submitted waitlist form
     */
    function trackWaitlistComplete(source) {
        trackEvent('waitlist_complete', {
            waitlist_source: source || 'android'
        });
    }

    /**
     * User abandoned waitlist form
     */
    function trackWaitlistAbandoned(source) {
        trackEvent('waitlist_abandoned', {
            waitlist_source: source || 'android'
        });
    }

    /**
     * User scrolled past key sections
     */
    function trackScrollDepth(percent) {
        trackEvent('scroll_depth', {
            percent: percent
        });
    }

    /**
     * User viewed social proof section
     */
    function trackSocialProofView() {
        trackEvent('social_proof_view', {
            section: 'testimonials'
        });
    }

    /**
     * User viewed blog section
     */
    function trackBlogView() {
        trackEvent('blog_section_view', {
            section: 'blog'
        });
    }

    /**
     * User navigated to blog post
     */
    function trackBlogClick(postTitle) {
        trackEvent('blog_click', {
            post_title: postTitle
        });
    }

    /**
     * Mobile menu interaction
     */
    function trackMobileMenuOpen() {
        trackEvent('mobile_menu_open', {
            device: 'mobile'
        });
    }

    /**
     * Page load time
     */
    function trackPageLoad() {
        if (window.performance && window.performance.timing) {
            var timing = window.performance.timing;
            var loadTime = timing.loadEventEnd - timing.navigationStart;
            trackEvent('page_load', {
                load_time_ms: loadTime,
                dom_ready_ms: timing.domContentLoadedEventEnd - timing.navigationStart
            });
        }
    }

    /**
     * Error tracking
     */
    function trackError(errorType, message) {
        trackEvent('error', {
            error_type: errorType,
            error_message: message
        });
    }

    // ============================================================
    // Helpers
    // ============================================================

    function getValueRange(value) {
        if (!value) return 'none';
        if (value < 3000) return 'under_3k';
        if (value < 6000) return '3k_to_6k';
        if (value < 10000) return '6k_to_10k';
        if (value < 15000) return '10k_to_15k';
        if (value < 25000) return '15k_to_25k';
        return 'over_25k';
    }

    // ============================================================
    // Auto-tracking setup
    // ============================================================

    function setupAutoTracking() {
        if (typeof document === 'undefined') return;

        document.addEventListener('DOMContentLoaded', function () {
            // Page load tracking
            setTimeout(trackPageLoad, 0);

            // Hero view (immediate)
            setTimeout(trackHeroView, 500);

            // Scroll depth tracking
            var scrollDepths = { 25: false, 50: false, 75: false, 90: false };
            window.addEventListener('scroll', function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var docHeight = document.documentElement.scrollHeight - window.innerHeight;
                var scrollPercent = Math.round((scrollTop / docHeight) * 100);

                for (var depth in scrollDepths) {
                    if (scrollPercent >= parseInt(depth) && !scrollDepths[depth]) {
                        scrollDepths[depth] = true;
                        trackScrollDepth(parseInt(depth));
                    }
                }
            }, { passive: true });

            // Section view tracking via IntersectionObserver
            var sectionTrackers = [
                { selector: '#beneficios', event: trackSocialProofView },
                { selector: '#blog', event: trackBlogView }
            ];

            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var tracker = sectionTrackers.find(function (t) {
                                return entry.target.matches(t.selector);
                            });
                            if (tracker) {
                                tracker.event();
                                observer.unobserve(entry.target);
                            }
                        }
                    });
                }, { threshold: 0.3 });

                sectionTrackers.forEach(function (t) {
                    var el = document.querySelector(t.selector);
                    if (el) observer.observe(el);
                });
            }

            // Mobile menu tracking
            var mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', function () {
                    var menu = document.getElementById('mobile-menu');
                    if (menu && menu.classList.contains('hidden')) {
                        trackMobileMenuOpen();
                    }
                });
            }

            // Blog link tracking
            var blogLinks = document.querySelectorAll('a[href*="blog/"]');
            blogLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    var title = link.textContent.trim() || link.closest('article')?.querySelector('h3')?.textContent?.trim() || 'unknown';
                    trackBlogClick(title);
                });
            });
        });
    }

    // ============================================================
    // Public API
    // ============================================================

    window.CLTxPJAnalytics = {
        init: init,
        track: trackEvent,
        funnel: {
            heroView: trackHeroView,
            simulation: trackSimulation,
            simulationComplete: trackSimulationComplete,
            ctaClick: trackCTAClick,
            analysisRequest: trackAnalysisRequest,
            negotiationSupport: trackNegotiationSupport,
            waitlistStart: trackWaitlistStart,
            waitlistComplete: trackWaitlistComplete,
            waitlistAbandoned: trackWaitlistAbandoned,
            scrollDepth: trackScrollDepth,
            socialProofView: trackSocialProofView,
            blogView: trackBlogView,
            blogClick: trackBlogClick,
            mobileMenuOpen: trackMobileMenuOpen,
            pageLoad: trackPageLoad,
            error: trackError
        }
    };

    // Auto-setup
    setupAutoTracking();

    // Auto-init on load if ANALYTICS_ID is set
    if (ANALYTICS_ID) {
        if (document.readyState === 'complete') {
            init();
        } else {
            window.addEventListener('load', init);
        }
    }
})();
