import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/pro-diss-track/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pro Diss Track',
        short_name: 'PDT',
        start_url: '/pro-diss-track/',
        scope: '/pro-diss-track/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/pro-diss-track/icons/icon-pdt-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pro-diss-track/icons/icon-pdt-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
