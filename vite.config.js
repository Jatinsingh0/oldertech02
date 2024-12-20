import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false, // Disables the HMR error overlay
    },
    proxy: {
      '/api': {
        target: 'http://15.188.50.117:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
})


// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:8000',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   },
//   plugins: [react()],
// })
