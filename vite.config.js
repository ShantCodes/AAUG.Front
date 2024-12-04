import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Enable in development mode
      },
      manifest: {
        name: 'AAUG App',
        short_name: 'AAUG',
        description: 'Հայ Համալսարանականների Ընդհանուր Միութիւն',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/aaugLogo.jpg',
            sizes: '192x192',
            type: 'image/jpg',
          },
          {
            src: '/icons/aaugLogo.png',
            sizes: '144x144',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/AaugUser\/GetCurrentUserInfo$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'user-info-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 12 * 60 * 60, // Cache for 12 hours
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/News\/GetNewsTeaser$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'news-teaser-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/SlideShow\/GetSlideShowWithTitle$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'slideshow-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/Events\/GetReservedEventDates$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'reserved-events-cache',
              expiration: {
                maxEntries: 15,
                maxAgeSeconds: 6 * 60 * 60, // Cache for 6 hours
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/Events\/GetAllEvents\/1\/4$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'all-events-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 12 * 60 * 60, // Cache for 12 hours
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          // Cache dynamic file download requests
          {
            urlPattern: /^https:\/\/aaug\.ir\/api\/Media\/DownloadFile\/\d+$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'file-download-cache',
              expiration: {
                maxEntries: 50, // Cache up to 50 files
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
    }),
  ],
});
