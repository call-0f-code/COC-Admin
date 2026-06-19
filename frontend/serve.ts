import { serve } from "bun";
import { join } from "path";

const PORT = 5173;
const DIST_DIR = join(import.meta.dir, "dist");

console.log(`Serving static files from ${DIST_DIR} on port ${PORT}`);

serve({
    port: PORT,
    async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;

        // Default to index.html for root
        if (path === "/") path = "/index.html";

        const filePath = join(DIST_DIR, path);
        const file = Bun.file(filePath);

        if (await file.exists()) {
            return new Response(file);
        }

        // SPA Routing: if file doesn't exist, serve index.html
        const indexFile = Bun.file(join(DIST_DIR, "index.html"));
        if (await indexFile.exists()) {
            return new Response(indexFile);
        }

        return new Response("Not Found", { status: 404 });
    },
});
