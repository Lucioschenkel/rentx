import { AppError } from '@errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be possible to authenticate an existing user', async () => {
    const user: ICreateUserDTO = {
      drivers_license: '123456',
      email: 'teste@example.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'a@email.com',
        password: 'test_pass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to authenticate a user with an incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        drivers_license: '123456',
        email: 'teste@example.com',
        name: 'John Doe',
        password: '1234',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'not the right password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
