'use client';

import { useState, useEffect } from 'react';

interface Quote {
  q: string;
  a: string;
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/quote');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data: Quote = await response.json();
      if (data && data.q && data.a) {
        setQuote(data);
      } else {
        throw new Error('No quote received');
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setError('Failed to load quote. Please try again.');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl w-full text-center border border-gray-100">
        {loading ? (
          <div className="py-8">
            <p className="text-gray-500">Loading quote...</p>
          </div>
        ) : error ? (
          <div className="py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchQuote}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : quote ? (
          <>
            <blockquote className="text-xl md:text-2xl text-gray-800 mb-6 leading-relaxed font-light">
              &ldquo;{quote.q}&rdquo;
            </blockquote>
            <p className="text-sm md:text-base text-gray-600 mb-8">
              &mdash; {quote.a}
            </p>
            <button
              onClick={fetchQuote}
              className="bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 focus:outline-none transition-colors text-sm font-medium"
            >
              New Quote
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

