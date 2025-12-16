
import { createClient } from '@supabase/supabase-js';

// User-provided Supabase URL
const supabaseUrl = 'https://lkfnglrbdzdyjeebnnez.supabase.co';

// Using the public API key provided by the user.
const supabaseAnonKey = 'sb_publishable_ZZL8r_wsIacHN_5QR12_4Q_T6rPsZTc';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EnquiryData {
  name: string;
  phone: string;
  travelers: string;
  message: string;
}

/**
 * Saves a new enquiry to the 'enquiries' table in Supabase.
 * @param enquiryData The form data to be saved.
 * @returns The saved data from Supabase.
 * @throws An error if the insertion fails.
 */
export const saveEnquiry = async (enquiryData: EnquiryData) => {
  const submissionData = {
    name: enquiryData.name,
    phone: enquiryData.phone,
    // Convert travelers to a number for the database, or null if it's empty
    travelers: enquiryData.travelers ? parseInt(enquiryData.travelers, 10) : null,
    message: enquiryData.message,
  };

  const { data, error } = await supabase
    .from('enquiries') // Assumes a table named 'enquiries'
    .insert([submissionData]);

  if (error) {
    console.error('Supabase submission error:', error.message);
    throw new Error('There was an issue submitting your enquiry. Please try again.');
  }

  return data;
};
