import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

dayjs.extend(utc);

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  // eslint-disable-next-line no-underscore-dangle
  const _24hours_from_now = dayjs().add(1, 'day');

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'nice',
      daily_rate: 180.3,
      description: 'Very nice',
      fine_amount: 100,
      license_plate: 'DCBA',
      name: 'Nice name',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: _24hours_from_now.toDate(),
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: _24hours_from_now.toDate(),
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: _24hours_from_now.toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if the expected return date is within less than 24h', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '121212',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
