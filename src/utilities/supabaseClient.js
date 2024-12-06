// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const SUPABASE_URL = 'https://qguyqnambotnqensjyku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXlxbmFtYm90bnFlbnNqeWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4OTMwOTcsImV4cCI6MjA0NTQ2OTA5N30.aJ-FqjjHHJUozIZ-aayF4wguIHUIqjnU1cHt4U2Ci5I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
