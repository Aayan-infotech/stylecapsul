import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define the config for Vite
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  server: {
    https: true,  // Enable HTTPS
  },
});
