import React, { useState } from 'react';

interface FilterOptions {
  brand: string;
  priceRange: [number, number];
  fuelType: string;
  seatingCapacity: string;
  searchQuery: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  makes: string[];
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, makes = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [fuelType, setFuelType] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ brand, priceRange, fuelType, seatingCapacity, searchQuery });
  };

  const clearFilters = () => {
    setBrand('');
    setPriceRange([0, 100000]);
    setFuelType('');
    setSeatingCapacity('');
    setSearchQuery('');
    onFilterChange({ brand: '', priceRange: [0, 100000], fuelType: '', seatingCapacity: '', searchQuery: '' });
  };

  const getCurrentFilterCount = () => {
    let count = 0;
    if (brand) count++;
    if (priceRange[1] < 100000) count++;
    if (fuelType) count++;
    if (seatingCapacity) count++;
    if (searchQuery) count++;
    return count;
  };

  return (
    <div className="filters-container">
      {/* Filter Header */}
      <div 
        className="filters-header flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filter Cars</span>
          {getCurrentFilterCount() > 0 && (
            <span className="filter-badge ml-2">
              {getCurrentFilterCount()}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">
            {getCurrentFilterCount() > 0
              ? "Filters applied" 
              : "No filters applied"}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Search bar (always visible) */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="filter-search">
          <input
            type="text"
            placeholder="Search by make, model, or features..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) {
                onFilterChange({ brand, priceRange, fuelType, seatingCapacity, searchQuery: e.target.value });
              }
            }}
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                onFilterChange({ brand, priceRange, fuelType, seatingCapacity, searchQuery: '' });
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Body */}
      {isOpen && (
        <div className="filters-body animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="filter-group">
              <label className="filter-label">Brand</label>
              <select
                value={brand}
                onChange={(e) => { setBrand(e.target.value); }}
                className="filter-select"
              >
                <option value="">All Brands</option>
                {makes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="flex flex-col">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => { setPriceRange([0, parseInt(e.target.value)]); }}
                  className="filter-range"
                />
                <div className="price-range-display">
                  <span>$0</span>
                  <span className="text-blue-600 font-medium">Up to ${priceRange[1].toLocaleString()}</span>
                  <span>$100K+</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => { setFuelType(e.target.value); }}
                className="filter-select"
              >
                <option value="">All Fuel Types</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Seating Capacity</label>
              <select
                value={seatingCapacity}
                onChange={(e) => { setSeatingCapacity(e.target.value); }}
                className="filter-select"
              >
                <option value="">All Seating Capacities</option>
                <option value="2">2 Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="6">6 Seats</option>
                <option value="7">7 Seats</option>
                <option value="8">8 Seats</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button 
              onClick={clearFilters}
              className="btn-filter-clear"
            >
              Clear Filters
            </button>
            <button 
              onClick={handleFilterChange}
              className="btn-filter-apply"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters; 