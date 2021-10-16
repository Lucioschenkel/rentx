import { Specification } from '../model/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({}: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}
