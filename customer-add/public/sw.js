let cacheData = "appV1";
this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/manifest.json',
                '/static/js/favicon.js',
                '/index.html',
                "/logo192.png",
                "/favicon.ico",
                // "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
                // "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
                "/",
                "/user"
            ])
        })
    )
})

this.addEventListener("fetch", (event)=>{
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then((resp)=>{
                if(resp){
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})