/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
    readonly VITE_COVER_URL: string;
    readonly VITE_ROMS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}