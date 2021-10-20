import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    drivers_license,
    password,
    email,
    name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      drivers_license,
      name,
      email,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async findById(user_id: string): Promise<User> {
    return this.users.find((u) => u.id === user_id);
  }
}
