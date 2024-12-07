import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE as string;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    throw new Error(
        "Missing Supabase URL or Service Role Key in environment variables"
    );
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
