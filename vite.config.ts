import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {     // 3 files are downloaded in parallel, no need for client to download all again when code changes (caching).
                    react: ["react", "react-dom"],
                    router: ["react-router"],
                    supabase: ["@supabase/supabase-js"]
                }
            }
        }
    }
});