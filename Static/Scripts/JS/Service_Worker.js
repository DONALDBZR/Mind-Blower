const name = "Mind-Blower-v0.0.0";
const assets = [
    "/",
    "/Templates/Template.html",
    "/Static/Stylesheets/Mind_Blower.css",
    "/Static/Stylesheets/desktop.css",
    "/Static/Stylesheets/mobile.css",
    "/Static/Stylesheets/tablet.css",
    "/Static/Scripts/JS/Mind_Blower.js",
    "/Static/SVG/Logo.svg",
    "/Components/Header.js",
    "/Components/Main.js",
    "/Components/Footer.js",
];
self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(name)
        .then((cache) => cache.addAll(assets))
    )
});
self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then((response) => {
            return response || fetch(fetchEvent.request)
        })
    )
});