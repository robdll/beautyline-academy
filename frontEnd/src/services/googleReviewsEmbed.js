const SCRIPT_ID = 'gs-embed-script';
let script = document.getElementById(SCRIPT_ID);
if (!script) {
  script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = "https://embed.gizmosauce.com/gs.js";
  script.defer = true;
  script.onerror = function() {
    window.gsEmbedFailed = true;
  };
  document.head.appendChild(script);
}
if (!window.gsEmbedFallbackListenerAdded) {
  window.gsEmbedFallbackListenerAdded = true;
  window.addEventListener('load', function () {
    if (window.gsEmbedFailed) {
      try {
        const fallbackNotice = document.createElement('div');
        fallbackNotice.textContent = 'Google reviews are temporarily unavailable. Please try again later.';
        fallbackNotice.style.fontSize = '0.875rem';
        fallbackNotice.style.color = '#4b5563';
        fallbackNotice.style.backgroundColor = '#f9fafb';
        fallbackNotice.style.border = '1px solid #e5e7eb';
        fallbackNotice.style.borderRadius = '0.375rem';
        fallbackNotice.style.padding = '0.75rem 1rem';
        fallbackNotice.style.margin = '0.75rem';
        fallbackNotice.style.textAlign = 'center';
        fallbackNotice.setAttribute('aria-live', 'polite');
        const fallbackContainer = document.getElementById('googleReviews')
            || document.querySelector('[data-gs-embed]')
            || document.querySelector('[data-gizmo="google-reviews"]');
        if (fallbackContainer) {
            fallbackContainer.insertBefore(fallbackNotice, fallbackContainer.firstChild);
        } else {
            document.body.insertBefore(fallbackNotice, document.body.firstChild);
        }
      } catch (e) {
        console.error("Error displaying Google Reviews fallback:", e);
      }
    }
  });
}
