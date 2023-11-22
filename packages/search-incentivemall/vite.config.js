import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ],
  build: {
    rollupOptions: {
      output: [{
        name: "search",
        format: "esm",
        dir: "dist/",
        entryFileNames: "search.js",
      }]
    }
  }
});
