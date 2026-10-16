const V='tt-v2',CORE=['./','index.html','returns.html','manifest.webmanifest','leaflet/leaflet.js','leaflet/leaflet.css','icon-180.png','icon-192.png','icon-512.png'],TILES='tt-tiles';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==TILES).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.endsWith('tile.openstreetmap.org')){e.respondWith(caches.open(TILES).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){c.put(r,x.clone());c.keys().then(k=>{if(k.length>600)c.delete(k[0])})}return x}).catch(()=>new Response('',{status:504})))));return}
 if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))))});
