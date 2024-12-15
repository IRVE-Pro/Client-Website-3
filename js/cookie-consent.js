class CookieConsent {
    constructor() {
        this.cookieName = 'irve_cookie_consent';
        this.cookieExpiry = 365; // days
        this.initCookieConsent();
    }

    initCookieConsent() {
        if (!this.getCookie(this.cookieName)) {
            this.showCookieBanner();
        }
    }

    createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>Politique de Cookies</h3>
                <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
                <div class="cookie-buttons">
                    <button id="accept-cookies" class="cookie-btn accept">Accepter</button>
                    <button id="customize-cookies" class="cookie-btn customize">Personnaliser</button>
                    <button id="reject-cookies" class="cookie-btn reject">Refuser</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 9999;
                padding: 1rem;
            }

            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                text-align: center;
            }

            .cookie-content h3 {
                margin-bottom: 0.5rem;
                color: var(--dark-color);
            }

            .cookie-content p {
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }

            .cookie-buttons {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }

            .cookie-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }

            .cookie-btn.accept {
                background: var(--primary-color);
                color: white;
            }

            .cookie-btn.customize {
                background: var(--secondary-color);
                color: white;
            }

            .cookie-btn.reject {
                background: #e74c3c;
                color: white;
            }

            .cookie-btn:hover {
                opacity: 0.9;
                transform: translateY(-1px);
            }

            @media (max-width: 768px) {
                .cookie-buttons {
                    flex-direction: column;
                }

                .cookie-btn {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(style);
        return banner;
    }

    showCookieBanner() {
        const banner = this.createCookieBanner();
        document.body.appendChild(banner);

        document.getElementById('accept-cookies').addEventListener('click', () => {
            this.acceptCookies();
            this.hideBanner();
        });

        document.getElementById('customize-cookies').addEventListener('click', () => {
            this.showCustomizeModal();
        });

        document.getElementById('reject-cookies').addEventListener('click', () => {
            this.rejectCookies();
            this.hideBanner();
        });
    }

    showCustomizeModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-customize-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Paramètres des Cookies</h3>
                <div class="cookie-options">
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="essential-cookies" checked disabled>
                            Cookies Essentiels (Requis)
                        </label>
                        <p>Nécessaires au fonctionnement du site</p>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="analytics-cookies">
                            Cookies Analytiques
                        </label>
                        <p>Nous aident à améliorer notre site</p>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="marketing-cookies">
                            Cookies Marketing
                        </label>
                        <p>Utilisés pour la publicité ciblée</p>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button id="save-preferences" class="cookie-btn accept">Sauvegarder</button>
                    <button id="close-modal" class="cookie-btn reject">Fermer</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #cookie-customize-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }

            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
            }

            .cookie-options {
                margin: 1.5rem 0;
            }

            .cookie-option {
                margin-bottom: 1rem;
            }

            .cookie-option label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: bold;
            }

            .cookie-option p {
                margin-left: 1.5rem;
                font-size: 0.9rem;
                color: #666;
            }

            .modal-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        document.getElementById('save-preferences').addEventListener('click', () => {
            this.savePreferences();
            this.closeModal();
            this.hideBanner();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });
    }

    savePreferences() {
        const preferences = {
            essential: true,
            analytics: document.getElementById('analytics-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked
        };

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
        
        // Apply preferences
        if (preferences.analytics) {
            this.enableAnalytics();
        }
        if (preferences.marketing) {
            this.enableMarketing();
        }
    }

    acceptCookies() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true
        };

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
        this.enableAnalytics();
        this.enableMarketing();
    }

    rejectCookies() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false
        };

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
    }

    enableAnalytics() {
        // Implement Google Analytics or similar
        console.log('Analytics enabled');
    }

    enableMarketing() {
        // Implement marketing cookies
        console.log('Marketing enabled');
    }

    closeModal() {
        const modal = document.getElementById('cookie-customize-modal');
        if (modal) {
            modal.remove();
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
