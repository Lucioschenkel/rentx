import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'VOLVO',
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with an existent license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'VOLVO',
        name: 'Car 1 name',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        category_id: 'category',
      });

      await createCarUseCase.execute({
        brand: 'VOLVO',
        name: 'Car 2 name',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with available property set to true', async () => {
    const car = await createCarUseCase.execute({
      brand: 'VOLVO',
      name: 'Car 1 name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('available');
    expect(car.available).toBe(true);
  });
});
