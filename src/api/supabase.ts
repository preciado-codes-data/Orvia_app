import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Sustituye con las credenciales de tu proyecto Supabase (Project Settings -> API)
const SUPABASE_URL = 'https://ntyabnqdyakorkebaeio.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_91Vc4u53_0g8GhR4jhMyEw_Ve1D3Ezb';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});