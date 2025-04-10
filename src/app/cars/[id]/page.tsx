"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

// Car Detail page component
export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Fetch car data
  useEffect(() => {
    async function fetchCarData() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/cars`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch car: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.cars || !Array.isArray(data.cars)) {
          throw new Error('Invalid data format: cars array not found');
        }
        
        const carId = parseInt(params.id);
        const foundCar = data.cars.find((c: Car) => c.id === carId);
        
        if (!foundCar) {
          throw new Error(`Car with ID ${params.id} not found`);
        }
        
        setCar(foundCar);
        
        // Check if car is in wishlist
        const savedWishlist = localStorage.getItem('carWishlist');
        if (savedWishlist) {
          const wishlistIds = JSON.parse(savedWishlist);
          setIsInWishlist(wishlistIds.includes(carId));
        }
      } catch (err: unknown) {
        console.error('Error fetching car:', err);
        const errorMessage = (err as ApiError).message || 'Failed to load car details';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCarData();
  }, [params.id]);

  // Toggle wishlist function
  const toggleWishlist = () => {
    if (!car) return;
    
    const savedWishlist = localStorage.getItem('carWishlist') || '[]';
    const wishlistIds = JSON.parse(savedWishlist);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlistIds.filter((id: number) => id !== car.id);
      localStorage.setItem('carWishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      wishlistIds.push(car.id);
      localStorage.setItem('carWishlist', JSON.stringify(wishlistIds));
      setIsInWishlist(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation and actions */}
        <div className="flex items-center justify-between mb-8">
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
          <div className="flex gap-3">
            <Link 
              href="/cars/wishlist"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View Wishlist
            </Link>
            <Link 
              href="/cars/compare"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Compare Cars
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Error Loading Car Details</h2>
            <p>{error}</p>
          </div>
        ) : car ? (
          // Car details display
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Car images gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
              <div className="lg:col-span-2">
                <div className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={car.images && car.images.length > activeImageIndex ? car.images[activeImageIndex] : "/images/cars1.jpg"}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {car.images && car.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`relative h-20 w-32 rounded cursor-pointer border-2 ${
                        index === activeImageIndex ? 'border-blue-600' : 'border-transparent'
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={image || "/images/cars1.jpg"}
                        alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Car details */}
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={toggleWishlist}
                      className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                        isInWishlist 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill={isInWishlist ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {isInWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    ${car.price.toLocaleString()}
                  </div>
                </div>
                
                {/* Car specifications */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Specifications</h2>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium">{car.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-medium">{car.mileage.toLocaleString()} miles</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-medium">{car.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium">{car.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Engine</p>
                      <p className="font-medium">{car.engine}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-colors">
                    Schedule Test Drive
                  </button>
                  <button className="bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition-colors">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
            
            {/* Car description and features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 border-t">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {car.description}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">Features</h2>
                <ul className="space-y-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-green-600 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Car not found
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Car Not Found</h1>
            <p className="text-gray-500 mb-6">
              We couldn't find the car you're looking for.
            </p>
            <Link 
              href="/cars"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
            >
              Browse Available Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 