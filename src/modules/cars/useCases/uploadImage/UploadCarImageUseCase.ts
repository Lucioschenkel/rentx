import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  image_names: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, image_names }: IRequest): Promise<void> {
    image_names.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}
