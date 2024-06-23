'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams?.get('origin') ;

  useEffect(() => {
    const syncUser = async () => {
     
        const response = await fetch('/api/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          router.push(origin ? `/${origin}` : '/dashboard');
        } else {
          router.push('/sign-in');
        }
    }

    syncUser();
  }, [origin, router]);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default page;
