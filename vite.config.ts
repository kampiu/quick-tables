import { defineConfig, normalizePath } from "vite"
import react from "@vitejs/plugin-react"
import { resolve, join } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{find: "@", replacement: join(__dirname, "src")}],
	},
	plugins: [react()],
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
			generateScopedName: "[local]_[hash:base64:10]",
		},
		preprocessorOptions: {
			less: {
				additionalData: `
						@import "${ normalizePath(resolve("./src/assets/styles/variables.less")) }";
						@import "${ normalizePath(resolve("./src/assets/styles/mixins.less")) }";
					`,
				javascriptEnabled: true,
			},
		},
	},
	build: {
		sourcemap: false,
		minify: true,
		cssMinify: true,
		cssCodeSplit: false,
	},
})
