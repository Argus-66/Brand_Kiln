"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Filters from './Filters';

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

interface FilterOptions {
  brand: string;
  priceRange: [number, number];
  fuelType: string;
  seatingCapacity: string;
  searchQuery: string;
}

interface ApiError {
  message: string;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [makes, setMakes] = useState<string[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    async function fetchCars() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.cars || !Array.isArray(data.cars)) {
          throw new Error('Invalid data format: cars array not found');
        }
        
        // Ensure each car has a unique ID
        const carsWithUniqueIds = data.cars.map((car: Car, index: number) => {
          // If two cars have the same ID, add an index suffix to make it unique
          return {
            ...car,
            uniqueId: `${car.id}-${index}`
          };
        });
        
        setCars(carsWithUniqueIds);
        setFilteredCars(carsWithUniqueIds);
        
        // Extract unique makes for the filter dropdown
        const uniqueMakes = Array.from(new Set(data.cars.map((car: Car) => car.make)));
        setMakes(uniqueMakes as string[]);
      } catch (err: unknown) {
        console.error('Error loading cars:', err);
        const errorMessage = (err as ApiError).message || 'Failed to load cars';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    const { brand, priceRange, fuelType, seatingCapacity, searchQuery } = filters;
    
    // Apply filters
    const filtered = cars.filter(car => {
      const brandMatch = !brand || car.make === brand;
      const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
      const fuelMatch = !fuelType || car.fuelType === fuelType;
      
      // Check if car has the required seating capacity
      let seatingMatch = true;
      if (seatingCapacity) {
        // Look for seating capacity in features or use a direct match if the car has a seatingCapacity property
        seatingMatch = car.features.some(feature => 
          feature.includes(`${seatingCapacity} Seats`) || 
          feature.includes(`${seatingCapacity}-seater`) ||
          feature.includes(`Seats ${seatingCapacity}`) ||
          feature.toLowerCase().includes(`${seatingCapacity} seat`)
        );
      }
      
      // Search query matching
      let searchMatch = true;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        searchMatch = 
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query) ||
          car.features.some(feature => feature.toLowerCase().includes(query));
      }
      
      return brandMatch && priceMatch && fuelMatch && seatingMatch && searchMatch;
    });
    
    setFilteredCars(filtered);
  };

  const toggleWishlist = (carId: number) => {
    let newWishlist;
    if (wishlist.includes(carId)) {
      newWishlist = wishlist.filter(id => id !== carId);
    } else {
      newWishlist = [...wishlist, carId];
    }
    setWishlist(newWishlist);
    localStorage.setItem('carWishlist', JSON.stringify(newWishlist));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <h1 className="text-xl font-bold">Error Loading Cars</h1>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Discover Your Perfect Car</h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Browse our exclusive collection of premium vehicles and find the perfect match for your lifestyle.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/cars/compare" 
              className="btn-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>Compare</span>
            </Link>
            <Link 
              href="/cars/wishlist" 
              className="btn-secondary flex items-center gap-2 relative"
            >
              <span className="relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-blue-600" 
                  fill={wishlist.length > 0 ? "currentColor" : "none"} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse-custom">
                    {wishlist.length}
                  </span>
                )}
              </span>
              <span>Wishlist</span>
            </Link>
          </div>
        </div>

        {/* Elegant Filters */}
        <div className="relative z-10">
          <Filters onFilterChange={handleFilterChange} makes={makes} />
        </div>

        {/* Stats Counter */}
        {!isLoading && !error && (
          <div className="flex flex-wrap justify-center gap-8 bg-white rounded-2xl shadow-xl p-8 -mt-6 mb-12 mx-auto max-w-4xl border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{cars.length}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">Available Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{makes.length}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">Unique Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {Array.from(new Set(cars.map(car => car.fuelType))).length}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">Fuel Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {cars.filter(car => car.price < 30000).length}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">Under $30K</div>
            </div>
          </div>
        )}

        {isLoading ? (
          // Premium Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-xl overflow-hidden animate-pulse">
                <div className="h-60 bg-gray-300 shimmer"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded shimmer mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded shimmer mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="h-3 bg-gray-300 rounded shimmer mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 shimmer"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-300 rounded shimmer mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 shimmer"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Premium Cars Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <div key={car.uniqueId} className={`premium-card group animate-fadeIn`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <Image
                      src={car.images && car.images.length > 0 ? car.images[0] : "/images/cars1.jpg"}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <button
                        onClick={() => {
                          // Implementing local storage for compare list
                          const compareList = JSON.parse(localStorage.getItem('carCompareList') || '[]');
                          if (compareList.includes(car.id)) {
                            localStorage.setItem('carCompareList', JSON.stringify(compareList.filter((id: number) => id !== car.id)));
                          } else {
                            // Limit to 3 cars
                            if (compareList.length < 3) {
                              localStorage.setItem('carCompareList', JSON.stringify([...compareList, car.id]));
                            } else {
                              alert('You can compare up to 3 cars at a time. Please remove a car from comparison first.');
                            }
                          }
                          // Force re-render
                          window.dispatchEvent(new Event('storage'));
                        }}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300 shadow-md hover:shadow-lg"
                        aria-label="Add to compare"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-blue-600" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleWishlist(car.id)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300 shadow-md hover:shadow-lg"
                        aria-label={wishlist.includes(car.id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-red-500" 
                          fill={wishlist.includes(car.id) ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-3 flex justify-between items-center">
                      <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${car.price.toLocaleString()}
                      </div>
                      <div className="text-white font-medium text-sm">
                        {car.year}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-b-xl shadow-xl">
                    <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {car.make} {car.model}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="car-spec-label">Mileage</p>
                        <p className="car-spec-value">{car.mileage.toLocaleString()} mi</p>
                      </div>
                      <div>
                        <p className="car-spec-label">Fuel Type</p>
                        <p className="car-spec-value">{car.fuelType}</p>
                      </div>
                      <div>
                        <p className="car-spec-label">Transmission</p>
                        <p className="car-spec-value">{car.transmission}</p>
                      </div>
                      <div>
                        <p className="car-spec-label">Color</p>
                        <p className="car-spec-value">{car.color}</p>
                      </div>
                    </div>
                    <Link
                      href={`/cars/${car.id}`}
                      className="btn-primary w-full block text-center group-hover:shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 glass-effect text-center py-16 mt-8 rounded-2xl">
                <div className="max-w-md mx-auto">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-24 w-24 text-gray-300 mx-auto mb-4 animate-float" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No cars found</h3>
                  <p className="text-gray-500 mb-6 px-4">
                    We couldn't find any cars matching your current filter criteria. Try adjusting your filters or browse our complete inventory.
                  </p>
                  <button 
                    onClick={() => setFilteredCars(cars)}
                    className="btn-primary"
                  >
                    View All Cars
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination & Quick Stats (when there are cars) */}
        {!isLoading && filteredCars.length > 0 && (
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-gray-600">
              Showing <span className="font-semibold text-blue-600">{filteredCars.length}</span> of <span className="font-semibold text-blue-600">{cars.length}</span> cars
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
} 