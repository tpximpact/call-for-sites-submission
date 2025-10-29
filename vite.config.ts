import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        submitTheDataOnePageForm: resolve(
          __dirname,
          "submit-the-data--one-page-form/index.html"
        ),
        viewTheDataWebComponent: resolve(
          __dirname,
          "view-the-data--web-component/index.html"
        ),
      },
    },
  },
});
