const CACHE_NAME = "v1"

this.addEventListener('install', (event) => {
    // The service worker is installed
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Load a set of files for offline usage
            return cache.addAll([
                '',
                '/',
                '/index.html',
                '/svg/undraw_building-blocks.svg',
                '/svg/undraw_diet.svg',
                '/svg/undraw_elements.svg',
                '/svg/undraw_file-bundle.svg',
                '/svg/undraw_image-viewer.svg',
                '/svg/undraw_loading.svg',
                '/svg/undraw_memory-storage.svg',
                '/svg/undraw_mobile-web.svg',
                '/svg/undraw_nature-on-screen.svg',
                '/svg/undraw_order-delivered.svg',
                '/svg/undraw_pen-tool.svg'
            ]);
        })
    );
});

// When a network request sent by the browser is intercepted
this.addEventListener('fetch', async (event) => {
    if (/ecosystem-booklet/.test(event.url) && event.request.method === 'GET') {
        const responseFromCache = await caches.match(event.request) // Search the cache
        if (responseFromCache) return responseFromCache
        return fetch(event.request) // Not found, lookup on the network
    }
});

// Forceful take-over to push service worker updates
this.addEventListener('activate', async () => {
    // after we've taken over, iterate over all the current clients (windows)
    const tabs = await self.clients.matchAll({ type: 'window' })
    for (const tab of tabs) {
        // ...and refresh each one of them
        tab.navigate(tab.url)
    }
})