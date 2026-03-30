import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

/**
 * vite-plugin-federation은 expose 진입점의 직접 import만 importShared()로 변환한다.
 * recharts 등 3rd-party가 번들된 청크는 로컬 React를 정적 import하여
 * host와 다른 React 인스턴스를 사용하게 되고, hooks가 깨진다.
 *
 * 이 플러그인은 빌드 결과물의 react/react-dom 청크를 후처리하여,
 * federation shared가 초기화되어 있으면 host의 React를 반환하도록 패치한다.
 */
function patchReactShared(): Plugin {
  return {
    name: "patch-react-shared",
    enforce: "post",
    generateBundle(_opts, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue;

        // react-XXXX.js 청크만 대상 (react-dom 아님)
        if (
          /^assets\/react-[^/]+\.js$/.test(chunk.fileName) &&
          !chunk.fileName.includes("react-dom")
        ) {
          // host가 globalThis.__FEDERATION_REACT__에 동기적으로 노출한 React를 사용
          chunk.code = chunk.code.replace(
            /module\.exports = require_react_production\(\);/,
            `if (globalThis.__FEDERATION_REACT__) { module.exports = globalThis.__FEDERATION_REACT__; return; }\n` +
              `\tmodule.exports = require_react_production();`
          );
        }

        // react-dom-XXXX.js 청크도 동일하게 패치
        if (/^assets\/react-dom-[^/]+\.js$/.test(chunk.fileName)) {
          chunk.code = chunk.code.replace(
            /module\.exports = require_react_dom_production\(\);/,
            `if (globalThis.__FEDERATION_REACT_DOM__) { module.exports = globalThis.__FEDERATION_REACT_DOM__; return; }\n` +
              `\tmodule.exports = require_react_dom_production();`
          );
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "view",
      filename: "remoteEntry.js",
      exposes: {
        "./ViewApp": "./src/ViewApp.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
        } as Record<string, unknown>,
        "react-dom": {
          singleton: true,
          requiredVersion: false,
        } as Record<string, unknown>,
      },
    }),
    patchReactShared(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "react-router", "react-router-dom"],
  },
  build: {
    target: "esnext",
    minify: false,
    modulePreload: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5174,
    cors: true,
  },
  preview: {
    port: 5174,
    cors: true,
  },
});
