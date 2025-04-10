import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Finder - Find Your Perfect Ride",
  description: "Browse through our extensive collection of vehicles and find your perfect car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Premium Navbar */}
        <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <div>
                    <span className="text-2xl font-bold gradient-text">CarFinder</span>
                    <span className="text-xs text-blue-600 block -mt-1 ml-0.5">PREMIUM VEHICLES</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Home
                  </Link>
                  <Link href="/cars" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Browse Cars
                  </Link>
                  <Link href="/cars/compare" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Compare
                  </Link>
                  <Link href="/about" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    About
                  </Link>
                  <Link href="/contact" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Contact
                  </Link>
                </div>
                <Link 
                  href="/cars" 
                  className="ml-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hidden md:block"
                >
                  Find Your Car
                </Link>
                {/* Mobile menu button */}
                <button className="md:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="page-container">
          {children}
        </main>

        {/* Premium Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <div>
                    <span className="text-2xl font-bold text-white">CarFinder</span>
                    <span className="text-xs text-blue-300 block -mt-1 ml-0.5">PREMIUM VEHICLES</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Your trusted partner in finding the perfect vehicle for your needs, with a focus on luxury and performance.
                </p>
                <div className="flex mt-4 space-x-4">
                  <a href="#" className="text-blue-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Browse Cars
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars/compare" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Compare Cars
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Car Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/cars?fuelType=Electric" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Electric Vehicles
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars?fuelType=Hybrid" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Hybrid Cars
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars?seatingCapacity=5" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Family Cars
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars?brand=BMW" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Luxury Cars
                    </Link>
                  </li>
                  <li>
                    <Link href="/cars?brand=Jeep" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      SUVs & Crossovers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">info@carfinder.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-300">(123) 456-7890</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300">
                      123 Car Street<br />
                      Auto City, AC 12345
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    href="/contact" 
                    className="inline-block px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-blue-800/50 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CarFinder Premium Motors. All rights reserved.</p>
              <div className="mt-2 space-x-4 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
