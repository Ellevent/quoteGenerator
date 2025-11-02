import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Quote {
  q: string;
  a: string;
}

// Fallback quotes if all APIs fail
const fallbackQuotes: Quote[] = [
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { q: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" },
  { q: "Life is what happens to you while you're busy making other plans.", a: "John Lennon" },
  { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
  { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
  { q: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
  { q: "In this life we cannot do great things. We can only do small things with great love.", a: "Mother Teresa" },
  { q: "The only person you are destined to become is the person you decide to be.", a: "Ralph Waldo Emerson" },
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "The two most important days in your life are the day you are born and the day you find out why.", a: "Mark Twain" },
];

// Try multiple quote APIs as fallbacks
async function fetchQuoteFromAPI(): Promise<Quote> {
  const apis = [
    // Quotable API (good rate limits, reliable)
    async () => {
      const response = await fetch('https://api.quotable.io/random?tags=motivational', {
        next: { revalidate: 0 },
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return { q: data.content, a: data.author };
    },
    // ZenQuotes API (try as fallback due to rate limits)
    async () => {
      const response = await fetch('https://zenquotes.io/api/random', {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 0 },
      });
      if (!response.ok) throw new Error('API error');
      const data: Quote[] = await response.json();
      if (!data || data.length === 0) throw new Error('No data');
      return data[0];
    },
    // Alternative: QuoteGarden API
    async () => {
      const response = await fetch('https://quotegarden.io/api/v3/quotes/random', {
        next: { revalidate: 0 },
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      if (data.data && data.data[0]) {
        return { q: data.data[0].quoteText, a: data.data[0].quoteAuthor || 'Unknown' };
      }
      throw new Error('No data');
    },
  ];

  // Try each API in sequence
  for (const apiCall of apis) {
    try {
      const quote = await apiCall();
      if (quote && quote.q && quote.a) {
        return quote;
      }
    } catch (error) {
      console.log('API failed, trying next...', error);
      continue;
    }
  }

  // If all APIs fail, return a random fallback quote
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[randomIndex];
}

export async function GET() {
  try {
    const quote = await fetchQuoteFromAPI();
    
    if (!quote || !quote.q || !quote.a) {
      throw new Error('Invalid quote received');
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Even if all fails, return a fallback quote
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return NextResponse.json(fallbackQuotes[randomIndex]);
  }
}

