// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js');
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-sw.js');

const firebaseConfig = {
	apiKey: "AIzaSyBaaMDEZSfrBule95n_y0RcbnzdVtz6Fp8",
	authDomain: "wedding-asep-nabila.firebaseapp.com",
	databaseURL: "https://wedding-asep-nabila-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "wedding-asep-nabila",
	storageBucket: "wedding-asep-nabila.appspot.com",
	messagingSenderId: "12760851327",
	appId: "1:12760851327:web:dab336f27bb009bd4bf04a",
	measurementId: "G-77YBSBL6PY"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, { vapidKey: 'BFW5T47GqIr7Sc5zU2L5gG-98hN23hlbgQH3zIQOOhT9rUEe8evsw3L9Dg7K_awzsulDvnujCrWiRoB7aKbE860' }).then((currentToken) => {
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

onMessage(messaging, (payload) => {
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