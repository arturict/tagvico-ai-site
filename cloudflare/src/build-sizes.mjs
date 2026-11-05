// Writes src/sizes.json: { "/path": bytes } for every asset of 256 KB or more (see range.js).
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = process.argv[2] ?? "public", prefix = process.argv[3] ?? "";
const out = {};
(function walk(dir, rel) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const p = join(dir, name), r = rel + "/" + name, s = statSync(p);
    if (s.isDirectory()) walk(p, r); else if (s.size >= 262144) out[prefix + r] = s.size;
  }
})(root, "");
writeFileSync(process.argv[4] ?? "src/sizes.json", JSON.stringify(out));
console.log(Object.keys(out).length, "sizes");
