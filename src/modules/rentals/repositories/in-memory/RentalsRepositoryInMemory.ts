import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((r) => r.car_id === car_id && !r.end_date);
  }

  async findOpenRentalByUser(user_id: any): Promise<Rental> {
    return this.rentals.find((r) => r.user_id === user_id && !r.end_date);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      expected_return_date,
      car_id,
    });

    this.rentals.push(rental);

    return rental;
  }
}
