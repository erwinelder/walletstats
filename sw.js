const cache_version = 'v3.2.2';
const asset_files = [
    'index.html',
    'Main/main.css',
    'main.js',
    'scripts/language.js',
    'Main/svg/background-l.svg',
    'Main/svg/background-d.svg',
    'Main/svg/background-b.svg',
    'Main/sounds/notification_1.mp3',
    'Main/sounds/notification_2.mp3',
    'Main/sounds/notification_3.mp3'
];


self.addEventListener('install', async () => {
    const cache = await caches.open(cache_version);
    await cache.addAll(asset_files);
});


self.addEventListener('activate', async () => {
    const cache_names = await caches.keys();
    console.log(cache_names);
    await Promise.all(
        cache_names
            .filter(name => name !== cache_version)
            .map(name => caches.delete(name))
    );
});


self.addEventListener('fetch', e => {
    e.respondWith(cacheFirst(e.request));
});

async function cacheFirst (request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}