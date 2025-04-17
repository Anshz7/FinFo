// components/GlobalLoader.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const GlobalLoader = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#23292f] bg-opacity-90">
      <div className="loader-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
