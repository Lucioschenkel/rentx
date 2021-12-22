import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((c) => c.license_plate === license_plate);
  }

  async findAvailable(brand?: string, category_id?: string, name?: string) {
    return this.cars
      .filter((c) => c.available)
      .filter((c) => {
        if (
          c.available ||
          (brand && c.brand === brand) ||
          (category_id && c.category_id === category_id) ||
          (name && c.name === name)
        ) {
          return true;
        }
        return false;
      });
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.cars.find((c) => c.id === car_id);

    return car;
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const carIdx = this.cars.findIndex((c) => c.id === id);

    this.cars[carIdx].available = available;
  }
}
