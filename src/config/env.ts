function required(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Missing environment variable ${name}. See .env.example`);
    }
    return value;
}

export const SUPABASE_URL = required(import.meta.env.VITE_SUPABASE_URL, "VITE_SUPABASE_URL");
export const SUPABASE_PUBLISHABLE_KEY = required(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, "VITE_SUPABASE_PUBLISHABLE_KEY");
export const COVER_URL = required(import.meta.env.VITE_COVER_URL, "VITE_COVER_URL");
export const ROMS_URL = required(import.meta.env.VITE_ROMS_URL, "VITE_ROMS_URL");