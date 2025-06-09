'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function GitHubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleOAuthCallback('github', code)
        .then(() => {
          router.push('/'); // Redirect to home page after successful login
        })
        .catch((error) => {
          console.error('GitHub OAuth error:', error);
          router.push('/?error=github-auth-failed');
        });
    } else {
      router.push('/?error=no-code');
    }
  }, [searchParams, router, handleOAuthCallback]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing GitHub Sign In...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
} 