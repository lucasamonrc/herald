import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export default supabase;
