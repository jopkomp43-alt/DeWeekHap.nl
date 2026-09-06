/**
 * Google Consent Mode v2 - DeWeekHap
 * Verwerkt cookiebanner-keuzes en stuurt naar Google Analytics/Ads
 */

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('accept-all');
    const acceptSelectedBtn = document.getElementById('accept-selected');
    const declineAllBtn = document.getElementById('decline-all');
    const analyticsConsent = document.getElementById('analytics-consent');
    const adsConsent = document.getElementById('ads-consent');
    
    // Check of er al een keuze is opgeslagen
    const savedConsent = localStorage.getItem('deweekhap_consent');
    
    if (savedConsent) {
        cookieBanner.style.display = 'none';
        const consent = JSON.parse(savedConsent);
        updateConsent(consent);
    } else {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 2000);
    }
    
    // Update consent naar Google
    function updateConsent(consent) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'consent',
            'consent': {
                'ad_storage': consent.ad_storage || 'denied',
                'analytics_storage': consent.analytics_storage || 'denied',
                'ad_user_data': consent.ad_user_data || 'denied',
                'ad_personalization': consent.ad_personalization || 'denied'
            }
        });
        console.log('Consent bijgewerkt:', consent);
    }
    
    // Alles accepteren
    acceptAllBtn.addEventListener('click', function() {
        const consent = {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        };
        updateConsent(consent);
        localStorage.setItem('deweekhap_consent', JSON.stringify(consent));
        cookieBanner.style.display = 'none';
        
        if (typeof gtag === 'function') {
            gtag('event', 'consent_granted', {
                'event_category': 'cookies',
                'event_label': 'all'
            });
        }
    });
    
    // Geselecteerde accepteren
    acceptSelectedBtn.addEventListener('click', function() {
        const consent = {
            'ad_storage': adsConsent.checked ? 'granted' : 'denied',
            'analytics_storage': analyticsConsent.checked ? 'granted' : 'denied',
            'ad_user_data': adsConsent.checked ? 'granted' : 'denied',
            'ad_personalization': adsConsent.checked ? 'granted' : 'denied'
        };
        updateConsent(consent);
        localStorage.setItem('deweekhap_consent', JSON.stringify(consent));
        cookieBanner.style.display = 'none';
        
        if (typeof gtag === 'function') {
            gtag('event', 'consent_granted', {
                'event_category': 'cookies',
                'event_label': 'selected'
            });
        }
    });
    
    // Alles weigeren
    declineAllBtn.addEventListener('click', function() {
        const consent = {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        };
        updateConsent(consent);
        localStorage.setItem('deweekhap_consent', JSON.stringify(consent));
        cookieBanner.style.display = 'none';
        
        if (typeof gtag === 'function') {
            gtag('event', 'consent_denied', {
                'event_category': 'cookies',
                'event_label': 'all'
            });
        }
    });
});