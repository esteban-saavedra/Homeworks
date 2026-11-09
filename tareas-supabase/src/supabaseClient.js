import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://reduvckysbxlbkrijlmz.supabase.co'
const SUPABASE_KEY = 'sb_publishable_kcXokYK5kwJbwjBBk6jGGw_xg_W9B31'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
