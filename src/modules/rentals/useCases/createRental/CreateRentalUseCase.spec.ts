import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

dayjs.extend(utc);

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const _24hours_from_now = dayjs().add(1, 'day');

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
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
    const today = dayjs();
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '121212',
        expected_return_date: today.toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
