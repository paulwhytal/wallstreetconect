'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { authRateLimiter } from '@/utils/rateLimiter';

type AuthFormProps = {
  type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'professional' | 'prospect'>('prospect');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!authRateLimiter.canAttempt()) {
      const remainingTime = Math.ceil(authRateLimiter.getRemainingTime() / 1000);
      setError(`Too many attempts. Please try again in ${remainingTime} seconds.`);
      return;
    }

    setIsLoading(true);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              user_type: userType,
            },
          },
        });
        if (error) {
          if (error.message.includes('rate limit')) {
            setError('Too many signup attempts from this IP. Please try again later or contact support if this persists.');
          } else {
            throw error;
          }
        } else {
          alert('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === 'signup' && (
        <div>
          <label className="block mb-2">I am a:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'professional' | 'prospect')}
            className="w-full p-2 border rounded"
          >
            <option value="prospect">Prospect</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Processing...' : type === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}