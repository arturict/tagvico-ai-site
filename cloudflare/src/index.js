import { applyRange } from "./range.js";
// tagvico.arturf.ch on Cloudflare Workers static assets (moved from VM 124 biz, containers tagvico-site and
// tagvico-docs, on 2026-11-05). Reproduces the two nginx configs of those images:
//   site: try_files $uri $uri/ =404, error_page 404 /404.html, /docs -> 302 /docs/, /privacy and /terms
//         served from their index.html, /health -> "ok", robots.txt and sitemap.xml cached 1 h.
//   docs: mounted under /docs/ (the docs build uses base /docs/), try_files $uri $uri.html $uri/ =404,
//         .md as text/markdown, .txt as text/plain, static assets cached 30 days immutable.
// Assets: public/ holds the site at the root and the docs under public/docs/.
const DOCS_ASSET = /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2)$/i;

async function asset(env, request, path) {
  const url = new URL(request.url);
  url.pathname = path;
  const res = await env.ASSETS.fetch(new Request(url, request));
  return res.status === 404 ? null : applyRange(request, res, path);
}

function withHeaders(res, headers, status) {
  const out = new Response(res.body, { status: status ?? res.status, headers: res.headers });
  for (const [k, v] of Object.entries(headers)) out.headers.set(k, v);
  return out;
}

async function notFound(env, request, page) {
  const res = await asset(env, new Request(request.url, { method: "GET" }), page);
  return res ? withHeaders(res, {}, 404) : new Response("Not Found", { status: 404 });
}

// nginx try_files with $uri and $uri/ (directory index); a directory without trailing slash gets a 301.
async function tryFiles(env, request, path, { html = false } = {}) {
  if (!path.endsWith("/")) {
    const res = await asset(env, request, path);
    if (res) return res;
    if (html) {
      const h = await asset(env, request, path + ".html");
      if (h) return h;
    }
    if (await asset(env, request, path + "/index.html")) {
      const url = new URL(request.url);
      return Response.redirect(url.origin + path + "/" + url.search, 301);
    }
    return null;
  }
  return asset(env, request, path + "index.html");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Keep the encoded form for asset lookups: the asset server canonicalises encodings (e.g. @ -> %40)
    // with a 307, so a decoded path would loop. Only the traversal check looks at the decoded form.
    const path = url.pathname;
    if (decodeURIComponent(path).includes("..")) return new Response("Bad Request", { status: 400 });

    if (path === "/health") return new Response("ok\n", { headers: { "Content-Type": "text/plain" } });
    if (path === "/docs") return Response.redirect(url.origin + "/docs/", 302);

    if (path.startsWith("/docs/")) {
      const res = await tryFiles(env, request, path, { html: true });
      if (!res) return notFound(env, request, "/docs/404.html");
      if (/\.md$/i.test(path)) return withHeaders(res, { "Content-Type": "text/markdown; charset=utf-8" });
      if (/\.txt$/i.test(path)) return withHeaders(res, { "Content-Type": "text/plain; charset=utf-8" });
      if (DOCS_ASSET.test(path)) return withHeaders(res, { "Cache-Control": "public, immutable, max-age=2592000" });
      return res;
    }

    if (path === "/robots.txt" || path === "/sitemap.xml") {
      const res = await asset(env, request, path);
      if (!res) return notFound(env, request, "/404.html");
      const h = { "Cache-Control": "public, max-age=3600" };
      if (path === "/sitemap.xml") h["Content-Type"] = "application/xml";
      return withHeaders(res, h);
    }
    if (path === "/privacy" || path === "/terms") {
      return (await asset(env, request, path + "/index.html")) ?? notFound(env, request, "/404.html");
    }
    if (path === "/404.html") return notFound(env, request, "/404.html"); // nginx: internal location
    return (await tryFiles(env, request, path)) ?? notFound(env, request, "/404.html");
  },
};
