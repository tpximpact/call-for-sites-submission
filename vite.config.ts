import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    commonjsOptions: { transformMixedEsModules: true },
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
        viewTheDataSchema: resolve(
          __dirname,
          "view-the-data--schema/index.html"
        ),
      },
    },
  },
  // If you are deploying to https://<USERNAME>.github.io/<REPO>/ (eg. your repository is at https://github.com/<USERNAME>/<REPO>), then set base to '/<REPO>/'.
  base: "/call-for-sites-submission/",
  plugins: [react()],
});
