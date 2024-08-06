# Language Redirect Demo
This repository contains a simple example of language redirection based on the browser's language settings. The redirection is implemented using JavaScript and works in Chrome, Firefox, and Edge.


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
</body>
</html>
```

### main.js
This JavaScript script reads the browser's language and redirects accordingly.

```js
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    const language = lang.split('-')[0]; // Use only the part before the hyphen
    return language;
}

function redirectBasedOnLanguage() {
    const language = getBrowserLanguage();
    let redirectUrl = '';

    switch(language) {
        case 'de':
            redirectUrl = './de/index_de.html'; // Relative path to the German page
            break;
        case 'en':
        case 'en-US': // Check for English variants
        case 'en-GB':
        case 'en-AU':
            redirectUrl = './en/index_en.html'; // Relative path to the English page
            break;
        default:
            redirectUrl = './index.html'; // Default page
            break;
    }

    window.location.href = redirectUrl; // Redirect
}

// Perform redirection on page load
window.onload = function() {
    redirectBasedOnLanguage();
};
```

### Usage
1. Create the directories and files as described above.
2. Ensure your live server is running and accessing the folder.
3. Open index.html in your browser to test the language redirection.