// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:["assets/style.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    // 'nuxt-electron',
    '@vite-pwa/nuxt',
  ],
  plugins: [
    // '~/plugins/db.js'
  ],
  // electron: {
  //   build: [
  //     {
  //       // Main-Process entry file of the Electron App.
  //       entry: 'electron/main.ts',
  //     },
  //   ],
  // },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'KSR Sistem',
      short_name: 'KSR',
      theme_color: '#07071C',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
