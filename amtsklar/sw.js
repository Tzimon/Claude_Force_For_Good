/* Amtsklar service worker: cache-first for the app files so it works offline. */
const CACHE = "amtsklar-v11";
const FILES = [
  "./", "index.html", "css/app.css", "manifest.webmanifest", "icon.svg", "flyer.html",
  "js/deadline.js", "js/i18n.js", "js/i18n/uk.js", "js/i18n/ar.js", "js/i18n/tr.js", "js/i18n/ru.js", "js/i18n/fa.js",
  "js/data/glossary.js", "js/data/glossary-uk.js", "js/data/glossary-ar.js", "js/data/glossary-tr.js", "js/data/glossary-ru.js", "js/data/glossary-fa.js", "js/data/glossary-tips-uk-ru.js", "js/data/glossary-tips-ar-tr-fa.js", "js/data/templates.js", "js/data/templates-i18n.js", "js/data/help.js", "js/data/extra-i18n.js",
  "js/views/brief.js", "js/data/guides.js", "js/data/guides-uk.js", "js/data/guides-ar.js", "js/data/guides-tr.js", "js/data/guides-ru.js", "js/data/guides-fa.js", "js/views/ratgeber.js", "js/views/woerter.js", "js/views/vorlagen.js", "js/views/hilfe.js", "js/app.js",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // fonts etc. go to the network
  // Network first, so updates arrive quickly; fall back to the cache offline.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("index.html")))
  );
});
