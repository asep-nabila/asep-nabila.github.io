importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js');

const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, CacheFirst} = workbox.strategies;

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
                 request.destination === 'font' ||
				 request.destination === 'html',
  new StaleWhileRevalidate(),
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache'
  }),
);