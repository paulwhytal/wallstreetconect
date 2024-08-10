'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";

export default function CompleteProfile() {
  const [userType, setUserType] = useState<'professional' | 'prospect'>('prospect');
  const [fullName, setFullName] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          user_type: userType,
        });

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as 'professional' | 'prospect')}
          className="w-full p-2 border rounded"
        >
          <option value="prospect">Prospect</option>
          <option value="professional">Professional</option>
        </select>
        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </form>
    </div>
  );
}