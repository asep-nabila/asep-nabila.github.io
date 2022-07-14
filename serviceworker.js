importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js');
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyBaaMDEZSfrBule95n_y0RcbnzdVtz6Fp8",
	authDomain: "wedding-asep-nabila.firebaseapp.com",
	databaseURL: "https://wedding-asep-nabila-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "wedding-asep-nabila",
	storageBucket: "wedding-asep-nabila.appspot.com",
	messagingSenderId: "12760851327",
	appId: "1:12760851327:web:dab336f27bb009bd4bf04a",
	measurementId: "G-77YBSBL6PY"
});

const messaging = firebase.getMessaging();

messaging.getToken({ vapidKey: 'BFW5T47GqIr7Sc5zU2L5gG-98hN23hlbgQH3zIQOOhT9rUEe8evsw3L9Dg7K_awzsulDvnujCrWiRoB7aKbE860' }).then((currentToken) => {
	if (currentToken) {
		console.log(currentToken);
		let tokenMessages = {
			eventType: "token",
			token: currentToken
		};
		sendMessage(tokenMessages);
	} else {
		console.log('No registration token available. Request permission to generate one.');
	}
}).catch((err) => {
	console.log('An error occurred while retrieving token. ', err);
});

messaging.onMessage((payload) => {
	console.log('Message received. ', payload);
	let msgMessages = {
		eventType: "pushmsg",
		payload: payload
	};
	sendMessage(msgMessages);
});

function sendMessage(message) {
	self.clients.matchAll().then(function(clients) {
	clients.forEach(function(client) {
		client.postMessage(message);
	});
});
}

const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;

// Cache Google Fonts with a stale-while-revalidate strategy, with
// a maximum number of entries.
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' ||
             url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({maxEntries: 20}),
    ],
  }),
);

registerRoute(
  ({request}) => request.destination === 'script' ||
                 request.destination === 'style' ||
				 request.destination === 'html',
  new StaleWhileRevalidate()
);

registerRoute(
  ({request}) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);