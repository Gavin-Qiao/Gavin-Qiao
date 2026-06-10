import path from "node:path";

const root = import.meta.dir;
const port = Number(Bun.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const cleanPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(root, cleanPath);

    if (!filePath.startsWith(root + path.sep) && filePath !== root) {
      return new Response("Forbidden", { status: 403 });
    }

    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(file, {
      headers: {
        "content-type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream"
      }
    });
  }
});

console.log(`Mohan CV preview running at http://localhost:${port}`);
