// Cookie Consent Implementation
(function() {
  const COOKIE_NAME = 'forsyth-bridge-consent';
  const COOKIE_EXPIRY = 365; // days

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
    }
    return null;
  }

  function initCookieConsent() {
    // Check if consent already given
    if (getCookie(COOKIE_NAME)) {
      return;
    }

    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <p>We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
        </div>
        <div class="cookie-consent-buttons">
          <button id="cookie-accept-btn" class="cookie-btn cookie-btn-accept">Accept</button>
          <a href="pages/privacy.html" class="cookie-link">Learn more</a>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #cookie-consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #1a1f35 0%, #2d3e50 100%);
        color: white;
        padding: 1.5rem 2rem;
        z-index: 9999;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .cookie-consent-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
      }

      .cookie-consent-text {
        flex: 1;
        min-width: 250px;
      }

      .cookie-consent-text p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        opacity: 0.95;
      }

      .cookie-consent-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }

      .cookie-btn {
        padding: 0.7rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .cookie-btn-accept {
        background: linear-gradient(135deg, #e85d3b 0%, #d44d2b 100%);
        color: white;
      }

      .cookie-btn-accept:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(232, 93, 59, 0.3);
      }

      .cookie-link {
        color: #e85d3b;
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 600;
        transition: opacity 0.3s ease;
      }

      .cookie-link:hover {
        opacity: 0.8;
        text-decoration: underline;
      }

      @media (max-width: 768px) {
        #cookie-consent-banner {
          padding: 1rem;
        }

        .cookie-consent-content {
          flex-direction: column;
          gap: 1rem;
        }

        .cookie-consent-text {
          width: 100%;
        }

        .cookie-consent-buttons {
          width: 100%;
          justify-content: center;
        }

        .cookie-btn,
        .cookie-link {
          width: 100%;
          text-align: center;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Add event listener
    document.getElementById('cookie-accept-btn').addEventListener('click', function() {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY);
      banner.style.display = 'none';
      // Optional: You can add analytics or other tracking here
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
