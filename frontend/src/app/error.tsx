'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import NavigationBar from '@/components/en/NavigationBar';
import Footer from '@/components/shared/Footer';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <NavigationBar />
      <main className="flex-grow flex items-center justify-center min-h-[54vh]">
        <div className="text-center p-8  rounded-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Error: {error.message}
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="bg-unitedPrimary hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Try again
            </button>
            <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}