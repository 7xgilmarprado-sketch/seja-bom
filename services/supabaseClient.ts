import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ffrllfmlhfselvzvhgjt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WxpNoE3ZdISgJ1lqOlHmQw_lcJLyPTW';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);