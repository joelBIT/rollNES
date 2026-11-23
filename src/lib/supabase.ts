import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../config/env";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);