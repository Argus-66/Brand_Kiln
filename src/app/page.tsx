import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <Image
          src="/images/cars1.jpg"
          alt="Classic car showcase"
          fill
          className="object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the best selection of cars at competitive prices
          </p>
          <Link
            href="/cars"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Wide Selection</h3>
              <p className="text-gray-700">Browse through our extensive collection of vehicles</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Best Prices</h3>
              <p className="text-gray-700">Competitive pricing and financing options available</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Search</h3>
              <p className="text-gray-700">Find your perfect car with our advanced search tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/cars2.jpg"
                  alt="Classic Car 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Classic Car 1</h3>
                <p className="text-gray-700 mb-4">A timeless classic with elegant design.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/cars3.jpg"
                  alt="Classic Car 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Classic Car 2</h3>
                <p className="text-gray-700 mb-4">Experience the charm of vintage engineering.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/cars4.jpg"
                  alt="Classic Car 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Classic Car 3</h3>
                <p className="text-gray-700 mb-4">A masterpiece of automotive history.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
