'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to all chats page
    router.push('/all_chats');
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to OpenAgent</h1>
      <p className="text-muted-foreground">Redirecting to chats...</p>
    </div>
  );
}