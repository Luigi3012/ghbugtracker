/// <reference types='vitest' />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/apps/bug-tracker-frontend",

	server: {
		port: 4200,
		host: "localhost",
		proxy: {
			"/api": {
				target: "http://localhost:3333",
				changeOrigin: true,
				secure: false,
			},
		},
	},

	preview: {
		port: 4300,
		host: "localhost",
	},

	plugins: [react(), nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	build: {
		outDir: "../../dist/apps/bug-tracker-frontend",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
});
