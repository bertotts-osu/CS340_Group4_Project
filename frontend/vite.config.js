import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());

    if (command === "serve") {
        // dev
        return {
            plugins: [react()],
            // base: env.VITE_BASE,
            server: {
                host: env.VITE_SERVER_HOST,
                port: env.VITE_SERVER_PORT
            }
        };
    } else {
        // prod
        return {
            plugins: [react()],
            // base: env.VITE_BASE,
        };
    }
});