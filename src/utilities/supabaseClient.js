// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
