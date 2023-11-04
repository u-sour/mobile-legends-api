import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
// import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
// export default ({ mode = '' }) => {
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
//   return defineConfig({
//     server: {
//       proxy: {
//         '/api': {
//           target: process.env.VITE_API_URI,
//           changeOrigin: true,
//           secure: false
//         }
//       }
//     },
//     plugins: [vue()],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     }
//   })
// }
