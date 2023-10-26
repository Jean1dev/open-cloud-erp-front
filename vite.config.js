import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    outDir: 'build', // Nome do diretório de build personalizado
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
});
