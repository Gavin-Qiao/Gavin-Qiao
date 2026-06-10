/**
 * server.ts — zero-dependency development server (Bun).
 *
 *   bun server.ts          → http://localhost:4173
 *
 * Serves the folder statically and bundles `src/main.ts` on the fly
 * for every request to /dist/cv.js, so edits to content or renderer
 * appear on refresh with no manual build. Run `bun run build` to
 * refresh the committed bundle before publishing.
 */

import path from "node:path";

const root = import.meta.dir;
const port = Number(Bun.env.PORT || 4173);

const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ts": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

async function liveBundle(): Promise<Response> {
  const result = await Bun.build({
    entrypoints: [path.join(root, "src", "main.ts")],
    format: "iife",
    minify: false,
  });
  if (!result.success) {
    const messages = result.logs.map((log) => String(log)).join("\n");
    console.error(messages);
    return new Response(`/* build failed */\nconsole.error(${JSON.stringify(messages)});`, {
      status: 500,
      headers: { "content-type": "text/javascript; charset=utf-8" },
    });
  }
  return new Response(await result.outputs[0].text(), {
    headers: { "content-type": "text/javascript; charset=utf-8" },
  });
}

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    // Always serve a fresh bundle in development.
    if (pathname === "/dist/cv.js") return liveBundle();

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
        "content-type":
          contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      },
    });
  },
});

console.log(`CV preview running at http://localhost:${port}`);
