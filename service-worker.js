const CACHE_NAME = "projeto-rotina-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./script.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache aberto");
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log("Erro no cache:", error);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

