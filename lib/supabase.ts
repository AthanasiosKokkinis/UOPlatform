import { createClient } from "@supabase/supabase-js";

const supabaseURL= "https://frxyvqnezjvymrzzdwwc.supabase.co/";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyeHl2cW5lemp2eW1yenpkd3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNjk1MDEsImV4cCI6MjA5MDk0NTUwMX0.V65BtKwxSQZGJY04CTlcIuiNkLFrZ_e592S-AEhsmro";

export const supabase = createClient(supabaseURL, supabaseAnonKey);

