import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl'],
    exclude: ['lucide-react'],
  },
  build: {
    commonjsOptions: {
      include: [/@tensorflow\/tfjs/, /node_modules/],
    },
  },
});