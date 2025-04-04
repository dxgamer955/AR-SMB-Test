import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: {
      key: './key.key',
      cert: './crt.crt',
    },
    host: '0.0.0.0',
    port: 5000,
  },
});
