const CACHE_NAME = 'infinite-fart'
const urlsToCache = [
	'/',
	'/fartscroll.js',
	'/scripts.js'
]

function respondFromNetworkThenCache (event) {
	// Check network first, then cache
	const request = event.request
	event.respondWith(
		fetch(request)
			.then(response => addToCache(request, response))
			.catch(() => fetchFromCache(event))
			.catch(() => offlineResponse())
	)
}

function respondFromCacheThenNetwork (event) {
	// Check cache first, then network
	const request = event.request
	event.respondWith(
		fetchFromCache(event)
			.catch(() => fetch(request))
			.then(response => addToCache(request, response))
			.catch(() => offlineResponse())
	)
}

self.addEventListener('install', (event) => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
	)
})

self.addEventListener('fetch', (event) => {
	// Handle requests
	if (shouldHandleFetch(event)) {
		if (event.request.headers.get('Accept').indexOf('text/html') >= 0) {
			respondFromNetworkThenCache(event)
		} else {
			respondFromCacheThenNetwork(event)
		}
	}
})

self.addEventListener('activate', (event) => {
	var cacheWhitelist = [CACHE_NAME]
	// Clean up old cache versions
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			)
		})
	)
})