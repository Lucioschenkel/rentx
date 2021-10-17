import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export default () => {
  const specificationsRepository = new SpecificationsRepository();

  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
  );

  return new CreateSpecificationController(createSpecificationUseCase);
};
