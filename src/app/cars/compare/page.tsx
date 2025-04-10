"use client"
import React, { useState, useEffect } from 'react';
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

export default function ComparePage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // Load compare list from localStorage
    const loadCompareList = () => {
      const compareList = JSON.parse(localStorage.getItem('carCompareList') || '[]');
      if (allCars.length > 0 && compareList.length > 0) {
        const cars = allCars.filter(car => compareList.includes(car.id));
        setSelectedCars(cars);
      }
    };

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
        setAllCars(data.cars);
      } catch (err: unknown) {
        console.error('Error loading cars:', err);
        const errorMessage = (err as ApiError).message || 'Failed to load cars';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars().then(() => {
      loadCompareList();
    });

    // Add storage event listener to update on changes
    window.addEventListener('storage', loadCompareList);
    return () => {
      window.removeEventListener('storage', loadCompareList);
    };
  }, [allCars.length]);

  // When allCars changes, update selected cars
  useEffect(() => {
    const compareList = JSON.parse(localStorage.getItem('carCompareList') || '[]');
    if (allCars.length > 0 && compareList.length > 0) {
      const cars = allCars.filter(car => compareList.includes(car.id));
      setSelectedCars(cars);
    }
  }, [allCars]);

  const addCarToCompare = (car: Car) => {
    if (selectedCars.length < 3) {
      if (!selectedCars.some(c => c.id === car.id)) {
        const newSelectedCars = [...selectedCars, car];
        setSelectedCars(newSelectedCars);
        
        // Update localStorage
        const compareList = newSelectedCars.map(c => c.id);
        localStorage.setItem('carCompareList', JSON.stringify(compareList));
      }
      if (selectedCars.length === 2) {
        setShowSelector(false);
      }
    }
  };

  const removeCarFromCompare = (carId: number) => {
    const newSelectedCars = selectedCars.filter(car => car.id !== carId);
    setSelectedCars(newSelectedCars);
    
    // Update localStorage
    const compareList = newSelectedCars.map(c => c.id);
    localStorage.setItem('carCompareList', JSON.stringify(compareList));
  };

  const clearComparison = () => {
    setSelectedCars([]);
    localStorage.setItem('carCompareList', JSON.stringify([]));
  };

  // Define comparison categories with more detailed information
  const categories = [
    { 
      name: 'Basic Information', 
      fields: [
        { key: 'make', label: 'Make' },
        { key: 'model', label: 'Model' },
        { key: 'year', label: 'Year' },
        { key: 'color', label: 'Color' }
      ] 
    },
    { 
      name: 'Performance', 
      fields: [
        { key: 'engine', label: 'Engine' },
        { key: 'transmission', label: 'Transmission' },
        { key: 'fuelType', label: 'Fuel Type' },
      ] 
    },
    { 
      name: 'Cost & Condition', 
      fields: [
        { key: 'price', label: 'Price', format: (value: number) => `$${value.toLocaleString()}` },
        { key: 'mileage', label: 'Mileage', format: (value: number) => `${value.toLocaleString()} miles` },
      ] 
    },
    {
      name: 'Features',
      fields: [
        { key: 'features', label: 'Features', isList: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Compare Cars</h1>
          <Link 
            href="/cars" 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-blue-600" 
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
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold">Error Loading Cars</h2>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Car Selection Area */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-6 mb-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="basis-0 flex-1 min-w-[250px]">
                    {selectedCars[index] ? (
                      <div className="bg-white rounded-xl shadow-xl overflow-hidden group">
                        <div className="relative h-48">
                          <Image
                            src={selectedCars[index].images && selectedCars[index].images.length > 0 
                              ? selectedCars[index].images[0] 
                              : "/images/cars1.jpg"}
                            alt={`${selectedCars[index].make} ${selectedCars[index].model}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeCarFromCompare(selectedCars[index].id)}
                            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                            aria-label="Remove car"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <h3 className="text-white font-bold text-lg p-4">
                              {selectedCars[index].year} {selectedCars[index].make} {selectedCars[index].model}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <div className="text-gray-600 mb-2">${selectedCars[index].price.toLocaleString()}</div>
                          <Link
                            href={`/cars/${selectedCars[index].id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowSelector(true)}
                        className="w-full h-[208px] bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300 shadow-lg"
                      >
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="mt-2 block text-blue-600 font-medium">Add a car</span>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {selectedCars.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={clearComparison}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Car Selector Modal */}
            {showSelector && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
                    <h3 className="text-lg font-bold">Select a Car to Compare</h3>
                    <button 
                      onClick={() => setShowSelector(false)}
                      className="text-white hover:text-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {allCars.map(car => (
                        <button
                          key={car.uniqueId || car.id}
                          onClick={() => {
                            addCarToCompare(car);
                          }}
                          disabled={selectedCars.some(c => c.id === car.id)}
                          className={`flex items-center p-4 border rounded-lg ${
                            selectedCars.some(c => c.id === car.id)
                              ? 'bg-blue-50 border-blue-200 cursor-not-allowed'
                              : 'hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300'
                          }`}
                        >
                          <div className="w-20 h-16 relative mr-4 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={car.images && car.images.length > 0 ? car.images[0] : "/images/cars1.jpg"}
                              alt={car.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900">
                              {car.year} {car.make} {car.model}
                            </h4>
                            <p className="text-sm text-gray-500">
                              ${car.price.toLocaleString()} • {car.mileage.toLocaleString()} miles
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              {selectedCars.some(c => c.id === car.id) ? 'Already Selected' : 'Click to Select'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {selectedCars.length > 0 && (
              <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
                <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <h2 className="text-xl font-bold text-white">Comparison Details</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-4 px-6 text-left font-semibold text-gray-700 border-b border-r">Feature</th>
                        {selectedCars.map(car => (
                          <th key={car.id} className="py-4 px-6 text-left font-semibold text-gray-700 border-b min-w-[200px]">
                            {car.year} {car.make} {car.model}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <React.Fragment key={category.name}>
                          <tr className="bg-blue-50">
                            <td 
                              colSpan={selectedCars.length + 1} 
                              className="py-3 px-6 font-medium text-blue-800 border-b"
                            >
                              {category.name}
                            </td>
                          </tr>
                          {category.fields.map(field => (
                            <tr key={field.key} className="hover:bg-gray-50">
                              <td className="py-3 px-6 border-b border-r text-gray-700 font-medium">
                                {field.label}
                              </td>
                              {selectedCars.map(car => (
                                <td key={`${car.id}-${field.key}`} className="py-3 px-6 border-b text-gray-800">
                                  {field.isList ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                      {(car[field.key as keyof Car] as any[])?.slice(0, 5).map((item, i) => (
                                        <li key={i} className="text-sm">{item}</li>
                                      ))}
                                      {(car[field.key as keyof Car] as any[])?.length > 5 && (
                                        <li className="text-sm text-blue-600">
                                          +{(car[field.key as keyof Car] as any[]).length - 5} more
                                        </li>
                                      )}
                                    </ul>
                                  ) : field.format ? (
                                    field.format(car[field.key as keyof Car] as number)
                                  ) : (
                                    car[field.key as keyof Car]
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedCars.length === 0 && !showSelector && (
              <div className="text-center py-16 bg-white rounded-xl shadow-xl">
                <div className="max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Compare Cars</h2>
                  <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                    Add up to 3 cars to compare their features and specifications side by side.
                  </p>
                  <button 
                    onClick={() => setShowSelector(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Select Cars to Compare
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 