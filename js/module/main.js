const FingerprintJS = require('@fingerprintjs/fingerprintjs-pro');
// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: 'OS3SLXNyklDNGY2qQcMy', endpoint: 'https://sr.asepnabila.link' });
global.window.fpPromise = fpPromise;