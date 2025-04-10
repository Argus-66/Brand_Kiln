"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuelType: string;
  engine: string;
  features: string[];
  images: string[];
  description: string;
  uniqueId?: string;
}

interface ApiError {
  message: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        setIsLoading(true);
        // Get wishlist IDs from localStorage
        const savedWishlist = localStorage.getItem('carWishlist');
        if (!savedWishlist) {
          setWishlistItems([]);
          setIsLoading(false);
          return;
        }

        const wishlistIds = JSON.parse(savedWishlist);
        
        // Fetch car data from API
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.cars || !Array.isArray(data.cars)) {
          throw new Error('Invalid data format: cars array not found');
        }
        
        // Filter cars to only include wishlist items
        const wishlistCars = data.cars.filter((car: Car) => 
          wishlistIds.includes(car.id)
        );
        
        setWishlistItems(wishlistCars);
      } catch (err: unknown) {
        console.error('Error loading wishlist:', err);
        const errorMessage = (err as ApiError).message || 'Failed to load wishlist';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  const removeFromWishlist = (carId: number) => {
    // Update localStorage
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const updatedWishlist = wishlistIds.filter((id: number) => id !== carId);
      localStorage.setItem('carWishlist', JSON.stringify(updatedWishlist));
    }
    
    // Update state
    setWishlistItems(wishlistItems.filter(car => car.id !== carId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Link 
            href="/cars" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cars
          </Link>
        </div>
        
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Error Loading Wishlist</h2>
            <p>{error}</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          // Empty wishlist
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-gray-400 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                Start adding cars to your wishlist to save them for later.
              </p>
              <Link 
                href="/cars"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
              >
                Discover Cars
              </Link>
            </div>
          </div>
        ) : (
          // Wishlist items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((car) => (
              <div key={car.uniqueId || car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={car.images && car.images.length > 0 ? car.images[0] : "/images/cars1.jpg"}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {car.year} {car.make} {car.model}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold text-blue-600">${car.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-semibold">{car.mileage.toLocaleString()} miles</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/cars/${car.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(car.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 