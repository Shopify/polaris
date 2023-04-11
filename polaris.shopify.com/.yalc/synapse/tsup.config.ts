import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/synapse.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    outExtension({ format }) {
      return {
        js: `.mjs`,
      };
    },
  },
]);
