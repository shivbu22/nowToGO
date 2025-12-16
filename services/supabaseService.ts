
import { createClient } from '@supabase/supabase-js';

// This service was previously used for Supabase integration for the contact form.
// It has been replaced with a direct Google Sheets integration.
// This file is kept to avoid breaking file structures but is no longer in active use for form submission.

// User-provided Supabase URL
const supabaseUrl = 'https://lkfnglrbdzdyjeebnnez.supabase.co';

// Using the public API key provided by the user.
const supabaseAnonKey = 'sb_publishable_ZZL8r_wsIacHN_5QR12_4Q_T6rPsZTc';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The saveEnquiry function has been removed as it is no longer used.
