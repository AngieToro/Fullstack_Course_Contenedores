import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    globals: true,          //habilita describe/it/expect  de las pruebas de forma global         
  } 
})
