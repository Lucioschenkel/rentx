import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      name: 'Audi A1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      category_id: 'fed92b59-831d-4d6d-9f5b-e1c19c22428c',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      name: 'Audi A1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      category_id: 'fed92b59-831d-4d6d-9f5b-e1c19c22428c',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      name: 'Audi A1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      category_id: 'fed92b59-831d-4d6d-9f5b-e1c19c22428c',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Audi A1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      name: 'Audi A1',
      description: 'Carro com espaço',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      category_id: 'fed92b59-831d-4d6d-9f5b-e1c19c22428c',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'fed92b59-831d-4d6d-9f5b-e1c19c22428c',
    });

    expect(cars).toEqual([car]);
  });
});
