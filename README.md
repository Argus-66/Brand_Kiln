# 🚗 Car Finder

A modern web application built with Next.js for browsing and filtering car listings. Features include car search, wishlists, comparison tools, and detailed car information pages.

## ✨ Features

- **Car Catalog**: Browse through a collection of cars with detailed specifications
- **Advanced Filtering**: Filter cars by brand, price range, fuel type, and seating capacity
- **Search Functionality**: Search cars by make, model, or features
- **Wishlist**: Save your favorite cars for later viewing
- **Car Comparison**: Compare multiple cars side by side
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Data Storage**: Local JSON with API routes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/car-finder.git
   cd car-finder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 📁 Project Structure

```
car-finder/
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router
│   │   ├── api/     # API routes
│   │   ├── cars/    # Car pages (listing, details, compare, wishlist)
│   │   └── globals.css  # Global styles
│   └── data/        # JSON data sources
└── tailwind.config.js  # TailwindCSS configuration
```

## 🔧 Configuration

### TailwindCSS

The project uses TailwindCSS for styling. The configuration is in `tailwind.config.js`.

### Next.js

The Next.js configuration is in `next.config.ts`. It includes settings for:
- TypeScript error handling
- ESLint configuration
- Image optimization

## 🧪 Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
