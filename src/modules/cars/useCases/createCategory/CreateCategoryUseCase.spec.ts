import { AppError } from '@errors/AppError';

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('CreateCategory', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };
    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create to categories with the same name', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description test',
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
