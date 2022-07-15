importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js');

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
  ({url}) => url.origin === 'https://cdnjs.cloudflare.com' ||
             url.origin === 'https://cdn.jsdelivr.net',
  new CacheFirst();
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