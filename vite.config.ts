import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'view',
      filename: 'remoteEntry.js',
      exposes: {
        './ViewApp': './src/ViewApp.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: false } as Record<string, unknown>,
        'react-dom': { singleton: true, requiredVersion: false } as Record<string, unknown>,
        'react-router-dom': { singleton: true, requiredVersion: false } as Record<string, unknown>,
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
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
})
