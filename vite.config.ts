import { defineConfig } from "vite";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  // clearScreen: false, // Optional: keep if you like this behavior for dev
  server: {
    port: 1420,
    strictPort: true
    // host: undefined, // Defaults to 'localhost'
    // watch: { // No longer need to ignore src-tauri
    //   ignored: ["**/src-tauri/**"],
    // },
  },
}));
