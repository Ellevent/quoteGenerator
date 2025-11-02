import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const clientId = process.env.UNSPLASH_ACCESS_KEY;
    
    // If API key is provided, use official Unsplash API
    if (clientId) {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=scenery,nature,landscape&orientation=landscape&client_id=${clientId}`,
        {
          next: { revalidate: 0 }, // Don't cache
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        // Return the regular sized image URL (good quality, reasonable size)
        return NextResponse.json({ imageUrl: data.urls.regular });
      }
    }
    
    // Fallback: Use a curated list of high-quality Unsplash images
    // These are direct links to random scenery images (no API key needed)
    const fallbackImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ];
    
    // Return a random image from the fallback list
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return NextResponse.json({ imageUrl: fallbackImages[randomIndex] });
    
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    // Return a default image if everything fails
    return NextResponse.json({ 
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' 
    });
  }
}

