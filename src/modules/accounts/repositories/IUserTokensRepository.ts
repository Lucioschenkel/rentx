import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../entities/UserTokens';

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}
