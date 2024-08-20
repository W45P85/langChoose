/**
 * Name: Daniel Rukober
 * Abteilung: User Assistance
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
  // ... weitere Sprachen
};

function getBrowserLanguage() {
  // Get the primary language code without regional specifications
  const lang = navigator.language || navigator.userLanguage;
  return lang.split('-')[0];
}

function redirectBasedOnLanguage(language) {
    if (languagePaths.hasOwnProperty(language)) {
        const testUrl = languagePaths[language];
        
        // Check if the URL exists using fetch
        fetch(testUrl)
            .then(response => {
                if (response.ok) {
                    // Attempt the redirect
                    const timeoutDuration = 3000; // 3 seconds
                    const redirectTimer = setTimeout(() => {
                        console.error(`Error: Redirect timeout for ${language}. Redirecting to default language.`);
                        alert(`Redirect timeout for ${language}. Redirecting to default language.`);
                        window.location.href = languagePaths.de; // Redirect to default language (German)
                    }, timeoutDuration);
                    
                    // Try to redirect and clear the timeout if successful
                    window.location.href = testUrl;
                    clearTimeout(redirectTimer);
                } else {
                    console.error(`Error: Language ${language} path not found. Redirecting to default language.`);
                    alert(`Language ${language} not available. Redirecting to default language.`);
                    window.location.href = languagePaths.de; // Redirect to default language (German)
                }
            })
            .catch(error => {
                console.error(`Error fetching language ${language}: ${error.message}. Redirecting to default language.`);
                alert(`Error fetching language ${language}. Redirecting to default language.`);
                window.location.href = languagePaths.de; // Redirect to default language (German)
            });
    } else {
        // Handle when the language is not found in languagePaths
        console.error(`Error: Language ${language} not found in the languagePaths object`);
        alert(`Language ${language} not available. Redirecting to default language.`);
        window.location.href = languagePaths.de; // Redirect to default language (German)
    }
}

// Event-Listener für Änderungen der Sprachauswahl
const languageSelect = document.getElementById('languageSelect');

languageSelect.addEventListener('change', () => {
  const selectedLanguage = languageSelect.value;
  redirectBasedOnLanguage(selectedLanguage);
});

// Initialisierung der Weiterleitung beim Laden der Seite
window.onload = () => {
  const initialLanguage = getBrowserLanguage();
  redirectBasedOnLanguage(initialLanguage);
};