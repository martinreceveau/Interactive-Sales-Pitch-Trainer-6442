import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://smxyjzffvthbjumjltlm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteHlqemZmdnRoYmp1bWpsdGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTE4OTgsImV4cCI6MjA2NzQ2Nzg5OH0.mCa72exIyZbD4W_FueT3ruewqYGtbolwVy1Vl2QLA-Q'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export default supabase;