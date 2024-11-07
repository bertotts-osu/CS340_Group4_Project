import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    // For Development Session
    // host: 'localhost'
    
    // For Production Session
    host: 'classwork.engr.oregonstate.edu',
    port: 4571
  },
  plugins: [react()],
})