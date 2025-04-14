'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isThrottled, setIsThrottled] = useState(false); // To track if throttling is active

  const handleTryAgain = () => {
    if (!isThrottled) {
      reset(); // Trigger the reset action
      setIsThrottled(true); // Enable throttling
      setTimeout(() => setIsThrottled(false), 3000); // Disable throttling after 3 seconds
    }
  };

  return (
    <html>
      <body className="bg-gray-100 flex items-center justify-center h-screen font-sans">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
          <h1 className="text-5xl font-extrabold text-red-600 mb-4">
            Oops! Something Went Wrong! 😕
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            We're sorry, but something went wrong. Please try again, or contact support if the issue persists.
          </p>
          <button
            onClick={handleTryAgain}
            disabled={isThrottled} 
            className={`px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg text-lg transition duration-300 mr-4 ${
              isThrottled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isThrottled ? 'Please wait...' : 'Try Again'}
          </button>
          <Link href="/">
            <a className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-400 rounded-lg text-lg transition duration-300">
              Go to Home
            </a>
          </Link>
          <p className="mt-6 text-gray-500 text-sm">
            Error Digest: <span className="font-mono">{error.digest}</span>
          </p>
        </div>
      </body>
    </html>
  );
}
