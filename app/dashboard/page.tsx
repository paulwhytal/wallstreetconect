import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', user.id)
    .single();

  if (profile?.user_type === 'professional') {
    redirect('/dashboard/professional');
  } else if (profile?.user_type === 'prospect') {
    redirect('/dashboard/prospect');
  } else {
    // Handle case where user_type is not set
    redirect('/complete-profile');
  }

  // This return statement will never be reached, but is necessary for TypeScript
  return null;
}