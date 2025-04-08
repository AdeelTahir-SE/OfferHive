import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// const supabaseServicekey= process.env.SUPABASE_SERVICE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServicekey)

