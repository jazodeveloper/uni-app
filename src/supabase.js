import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ppkfcsjvrecwcnssjkax.supabase.co'
const supabaseKey = 'sb_publishable_0A5ISs-2UKBfNOfsi7I8HQ_SkbnvF12'

export const supabase = createClient(supabaseUrl, supabaseKey)