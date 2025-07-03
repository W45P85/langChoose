/**
 * Name: Daniel Rukober
 * Beschreibung: Dieses Script liest die Spracheneinstellung des Browsers aus und leitet auf die entsprechende Sprachversion der Dokumentation weiter.
 * Datum: 19. August 2024
 */

/**
 * Funktion zur Ermittlung der Browsersprache.
 * Gibt den Sprachcode ohne Regionalspezifizierungen zurück (z.B. 'de' statt 'de-DE').
 * @returns {string} Die Hauptsprache des Browsers.
 */

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

function redirectBasedOnLanguage(language) {
  const fallbackUrl = languagePaths.de;

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
        window.location.href = testUrl;
      } else {
        console.warn(`Page for ${language} not found. Redirecting to default.`);
        window.location.href = fallbackUrl;
      }
    })
    .catch(error => {
      console.error(`Fetch error for ${language}: ${error.message}`);
      window.location.href = fallbackUrl;
    });
}

window.onload = () => {
  const initialLanguage = getBrowserLanguage();
  redirectBasedOnLanguage(initialLanguage);
};

document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const selectedLanguage = languageSelect.value;
      redirectBasedOnLanguage(selectedLanguage);
    });
  }
});
