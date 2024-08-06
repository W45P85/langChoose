function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    console.log('Detected browser language:', lang); // Debugging-Nachricht: Zeige die erkannte Sprache an
    const language = lang.split('-')[0]; // Nutze den Teil vor dem Bindestrich, falls vorhanden
    console.log('Extracted language code:', language); // Debugging-Nachricht: Zeige den extrahierten Sprachcode an
    return language;
}

function redirectBasedOnLanguage() {
    const language = getBrowserLanguage();
    let redirectUrl = '';

    console.log('Determining redirect URL based on language:', language); // Debugging-Nachricht: Zeige die Sprache und die Entscheidung zur Weiterleitung an

    switch(language) {
        case 'de':
            redirectUrl = './de/index_de.html'; // Relativer Pfad zur deutschen Seite
            break;
        case 'en':
            redirectUrl = './en/index_en.html'; // Relativer Pfad zur englischen Seite
            break;
        default:
            redirectUrl = './index.html'; // Standardmäßig auf die Hauptseite weiterleiten
            break;
    }

    console.log('Redirect URL:', redirectUrl); // Debugging-Nachricht: Zeige die endgültige Weiterleitungs-URL an
    window.location.href = redirectUrl; // Weiterleitung
}

// Führe die Weiterleitung beim Laden der Seite aus
window.onload = function() {
    console.log('Page loaded. Starting language-based redirect.'); // Debugging-Nachricht: Seite wurde geladen
    redirectBasedOnLanguage();
};
