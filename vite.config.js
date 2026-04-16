import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                flash64: resolve(__dirname, 'flash64/index.html'),
                flash64Obrigado: resolve(__dirname, 'flash64/obrigado/index.html'),
            },
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                },
            },
        },
        cssCodeSplit: true,
        minify: 'esbuild',
    },
})
