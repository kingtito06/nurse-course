'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const isResetPath = url.pathname.includes('/reset-password');

    if (isResetPath) {
      router.replace(`/reset-password/${url.search}${url.hash}`);
      return;
    }

    router.replace('/');
  }, [router]);

  return null;
}