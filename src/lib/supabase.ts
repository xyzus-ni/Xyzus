import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wgzenmtojctuvboxmxia.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_7ggBDVSxZnGqEzQoda6Iew_8YDyu_lj";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
