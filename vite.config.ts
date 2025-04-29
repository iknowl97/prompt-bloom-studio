
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: "::"
  },
  define: {
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.VITE_OPENROUTER_API_KEY || "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"),
    'import.meta.env.VITE_DEFAULT_MODEL': JSON.stringify(process.env.VITE_DEFAULT_MODEL || "deepseek/deepseek-chat-v3-0324:free"),
  }
}))
