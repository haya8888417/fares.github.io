self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/calculator.html',
                '/bmi.html',
                '/speed.html',
                '/styles.css',
                '/calculatorapp.js',
                '/path-to-google-play-badge.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
