// The Workers asset binding answers a Range request with the whole file (200) and without Content-Length.
// Safari and iOS refuse to play <video> without 206 answers, and nginx served ranges, so single byte ranges are
// cut here. The file size comes from sizes.json (written by build-sizes.mjs at deploy time for files of 256 KB
// and more, so large videos are streamed, never buffered); smaller files are buffered to learn their size.
import SIZES from "./sizes.json";

export async function applyRange(request, res, path) {
  const range = request.headers.get("Range");
  if (!range || res.status !== 200 || !res.body) return res;
  const m = range.match(/^bytes=(\d*)-(\d*)$/);
  if (!m || (m[1] === "" && m[2] === "")) return res; // multiple or malformed ranges: whole file, like nginx
  let body = res.body;
  let size = Number(res.headers.get("Content-Length")) || SIZES[decodeURIComponent(path)];
  if (!size) {
    const buf = await res.arrayBuffer();
    size = buf.byteLength;
    body = new Response(buf).body;
  }
  let start, end;
  if (m[1] === "") { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }
  const headers = new Headers(res.headers);
  headers.set("Accept-Ranges", "bytes");
  if (start >= size || start > end) {
    headers.set("Content-Range", `bytes */${size}`);
    body.cancel();
    return new Response(null, { status: 416, headers });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  const reader = body.getReader();
  let pos = 0;
  const out = new ReadableStream({
    async pull(ctrl) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) { ctrl.close(); return; }
        const chunkStart = pos;
        pos += value.byteLength;
        if (pos <= start) continue;
        const from = Math.max(0, start - chunkStart), to = Math.min(value.byteLength, end + 1 - chunkStart);
        if (to > from) ctrl.enqueue(value.subarray(from, to));
        if (pos > end) { ctrl.close(); reader.cancel(); }
        return;
      }
    },
    cancel() { reader.cancel(); },
  });
  return new Response(out, { status: 206, headers });
}
