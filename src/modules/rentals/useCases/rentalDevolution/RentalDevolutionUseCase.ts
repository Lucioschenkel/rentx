import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class RentalDevolutionUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_rental_days = 1;

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    const now = this.dateProvider.now();

    let daily = this.dateProvider.diffInDays(rental.start_date, now);

    if (daily <= 0) {
      daily = minimum_rental_days;
    }

    const delay = this.dateProvider.diffInDays(
      now,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const fine = delay * car.fine_amount;
      total = fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = now;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}
