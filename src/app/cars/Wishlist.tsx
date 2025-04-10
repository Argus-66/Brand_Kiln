import React, { useState, useEffect } from 'react';

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
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (car: Car) => {
    const updatedWishlist = [...wishlist, car];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (carId: number) => {
    const updatedWishlist = wishlist.filter(car => car.id !== carId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={car.images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">
                    {car.year} {car.make} {car.model}
                  </h2>
                  <button
                    className="block w-full bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => removeFromWishlist(car.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 