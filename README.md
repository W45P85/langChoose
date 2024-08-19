<div align="center">
<pre>
 _                     ___ _                          
| | __ _ _ __   __ _  / __\ |__   ___   ___  ___  ___ 
| |/ _` | '_ \ / _` |/ /  | '_ \ / _ \ / _ \/ __|/ _ \
| | (_| | | | | (_| / /___| | | | (_) | (_) \__ \  __/
|_|\__,_|_| |_|\__, \____/|_| |_|\___/ \___/|___/\___|
               |___/                                  
<br>
Welcome to the TBX to HTML Converter! 🎉 This handy tool takes your TBX files
and transforms them into beautiful, readable HTML files. Whether you're a terminology
enthusiast or just someone who loves well-organized data, this tool is here to make your
life easier.
</pre>
</div>


# Language Redirect Demo
This repository contains a simple example of language redirection based on the browser's language settings. The redirection is implemented using JavaScript and works in Chrome, Firefox, and Edge.

Note: This code needs to be tested in a server-client environment to avoid the following error: Cross-Origin Request Blocked: The Same-Origin Policy disallows reading the external resource. (Reason: CORS request not http).

## Files

### index.html
This is the main HTML file that loads the JavaScript script `main.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Language Redirect</title>
    <script src="main.js" defer></script>
</head>
<body>
    <h1>Welcome</h1>
    <p>If you are not redirected, please choose your language manually.</p>
    <ul>
        <li><a href="./de/index_de.html">Deutsch</a></li>
        <li><a href="./en/index_en.html">English</a></li>
    </ul>
</body>
</html>

```

### main.js
This JavaScript script reads the browser's language and redirects accordingly.

```js
// Define language paths for different languages
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

// Function to get the primary language code without regional specifications
function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.split('-')[0];
}

// Function to redirect based on the selected language
function redirectBasedOnLanguage(language) {
  if (languagePaths.hasOwnProperty(language)) {
    const testUrl = languagePaths[language];

    // Check if the URL exists using fetch
    fetch(testUrl)
      .then(response => {
        if (response.ok) {
          const timeoutDuration = 3000; // 3 seconds
          const redirectTimer = setTimeout(() => {
            console.error(`Error: Redirect timeout for ${language}. Redirecting to default language.`);
            alert(`Redirect timeout for ${language}. Redirecting to default language.`);
            window.location.href = languagePaths.de; // Redirect to default language (German)
          }, timeoutDuration);
          
          window.location.href = testUrl; // Try to redirect and clear the timeout if successful
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
    console.error(`Error: Language ${language} not found in the languagePaths object`);
    alert(`Language ${language} not available. Redirecting to default language.`);
    window.location.href = languagePaths.de; // Redirect to default language (German)
  }
}

// Event listener for changes in language selection
const languageSelect = document.getElementById('languageSelect');

languageSelect.addEventListener('change', () => {
  const selectedLanguage = languageSelect.value;
  redirectBasedOnLanguage(selectedLanguage);
});

// Initialize the redirection when the page loads
window.onload = () => {
  const initialLanguage = getBrowserLanguage();
  redirectBasedOnLanguage(initialLanguage);
};
```

### Usage
1. Create the directories and files as described above.
2. Ensure your live server is running and accessing the folder.
3. Open index.html in your browser to test the language redirection.

## How it works
The code is a JavaScript file that implements a function for redirecting based on the selected language.

1. `languagePaths`: An object that contains paths for different languages.
2. `getBrowserLanguage()`: A function that returns the primary language code without regional specifications.
3. `redirectBasedOnLanguage(language)`: A function that performs redirection based on the selected language.
4. The code uses the Fetch API to check if the language URL exists.
5. A timeout of 3 seconds is set to control the redirection.
6. An event listener is added to monitor changes in the language selection.
7. Upon page load, the initial language is determined, and the redirection is carried out accordingly.

The code ensures that users are redirected to the appropriate language page based on their language selection. If the selected language is not available, a redirection to the default page (German) occurs.