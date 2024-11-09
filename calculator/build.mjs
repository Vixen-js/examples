import * as esbuild from "esbuild";
import importFlat from "@vixen-js/plugin-import-flat";
import vixenAssets from "@vixen-js/plugin-vixen-assets";

try {
  await esbuild.build({
    entryPoints: ["src/**/*.ts", "src/**/*.tsx"],
    outdir: "./dist",
    outExtension: {
      ".js": ".cjs"
    },
    bundle: true,
    platform: "node",
    target: "esnext",
    format: "cjs",
    minify: false,
    tsconfig: "./tsconfig.json",
    packages: "external",
    plugins: [
      importFlat(),
      vixenAssets({
        filterRegexp: /\.(png|svg)$/
      })
    ]
  });
} catch (e) {
  console.error(e);
}
