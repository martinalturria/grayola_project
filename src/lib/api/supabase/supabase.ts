import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
        "Faltan las claves de Supabase en las variables de entorno."
    );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
