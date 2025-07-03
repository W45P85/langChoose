/**
 * Name: Daniel Rukober
 * Description: This script reads the language setting of the browser and redirects to the corresponding language version of the documentation.
 * Datum: 19. August 2024
 */

/**
 * Function for determining the browser language.
 * Returns the language code without regional specifications (e.g. 'de' instead of 'de-DE').
 * @returns {string} The main language of the browser.
 */

// Mapping of language codes to the respective language pages (relative paths)
const languagePaths = {
  de: './de/index.html',
  en: './en-us/index.html',
  nl: './nl/index.html',
  fr: './fr/index.html',
  hu: './hu/index.html',
  pt: './pt/index.html',
  it: './it/index.html',
  es: './es/index.html',
  // ... more languages
};

function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.split('-')[0];
}

// Executes a redirect to the appropriate language page, if available
function redirectBasedOnLanguage(language) {
  const fallbackUrl = languagePaths.de;

  // Check whether the language is available in the mapping
  if (!languagePaths.hasOwnProperty(language)) {
    console.warn(`Language ${language} not supported. Redirecting to default.`);
    window.location.href = fallbackUrl;
    return;
  }

  const testUrl = languagePaths[language];

  // HEAD request to verify if file exists
  fetch(testUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        // Page exists - forwarding
        window.location.href = testUrl;
      } else {
        // Page does not exist - fallback
        console.warn(`Page for ${language} not found. Redirecting to default.`);
        window.location.href = fallbackUrl;
      }
    })
    .catch(error => {
      // Error retrieving the page - fallback
      console.error(`Fetch error for ${language}: ${error.message}`);
      window.location.href = fallbackUrl;
    });
}

// On page load: automatic redirection based on the browser language
window.onload = () => {
  const initialLanguage = getBrowserLanguage();
  redirectBasedOnLanguage(initialLanguage);
};

// Event listener for a manual language dropdown
document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const selectedLanguage = languageSelect.value;
      redirectBasedOnLanguage(selectedLanguage);
    });
  }
});
