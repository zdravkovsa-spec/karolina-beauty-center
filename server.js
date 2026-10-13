const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = "/opt/karolina-site";
const MIME = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"application/javascript",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".webp":"image/webp",".ico":"image/x-icon"};
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p === "/") p = "/index.html";
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, {"Content-Type": MIME[path.extname(f)] || "application/octet-stream", "Cache-Control": "public, max-age=300"});
    res.end(d);
  });
}).listen(3230, "0.0.0.0");
