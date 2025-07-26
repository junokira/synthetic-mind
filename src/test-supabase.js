import { supabase } from './supabase';

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
    console.log('Key present:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
    
    // Test basic connection
    const { data, error } = await supabase
      .from('memories')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('Supabase test failed:', error);
    return false;
  }
}; 