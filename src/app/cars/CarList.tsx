import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Image from 'next/image';

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

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    // Fetch car data from JSON or API
    const fetchCars = async () => {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data.cars);
      setFilteredCars(data.cars);
    };
    fetchCars();
  }, []);

  const handleFilterChange = (filters: any) => {
    const { brand, priceRange, fuelType, seatingCapacity } = filters;
    const filtered = cars.filter(car =>
      (brand ? car.make === brand : true) &&
      (fuelType ? car.fuelType === fuelType : true) &&
      (seatingCapacity ? car.features.includes(seatingCapacity) : true) &&
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
        <Filters onFilterChange={handleFilterChange} />

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  {car.year} {car.make} {car.model}
                </h2>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">${car.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} miles</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <button
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => alert('Detailed view coming soon!')}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList; 