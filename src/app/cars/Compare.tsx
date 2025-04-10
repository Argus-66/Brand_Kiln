import React, { useState } from 'react';

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

const Compare: React.FC = () => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);

  const addCarToCompare = (car: Car) => {
    if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    } else {
      alert('You can only compare up to 3 cars.');
    }
  };

  const removeCarFromCompare = (carId: number) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Compare Cars</h1>
        {selectedCars.length === 0 ? (
          <p className="text-gray-600">Select cars to compare.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedCars.map((car) => (
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
                  <p className="text-gray-600 mb-4">{car.description}</p>
                  <button
                    className="block w-full bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => removeCarFromCompare(car.id)}
                  >
                    Remove from Compare
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

export default Compare; 