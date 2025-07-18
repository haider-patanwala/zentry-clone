import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		host: true,
	},
	preview: {
		port: 3000,
		host: true,
		allowedHosts: ["localhost", "127.0.0.1", "0.0.0.0", "zentry.haider.sh"],
	},
});
