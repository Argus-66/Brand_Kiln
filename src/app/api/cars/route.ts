import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'src/data/cars.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Map the data to match the expected structure in the app
    const mappedCars = data.cars.map(car => ({
      id: car.id,
      make: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: typeof car.mileage === 'string' 
        ? parseInt(car.mileage.split(' ')[0]) 
        : car.mileage,
      color: car.color,
      transmission: car.transmission,
      fuelType: car.fuel_type,
      engine: car.engine,
      features: Array.isArray(car.features) ? car.features : [],
      images: car.image_url ? [car.image_url] : [],
      description: car.description || ''
    }));

    // Return the transformed data
    return NextResponse.json({ cars: mappedCars });
  } catch (error) {
    console.error('Error reading cars data:', error);
    return NextResponse.json(
      { error: 'Failed to load cars data' },
      { status: 500 }
    );
  }
} 