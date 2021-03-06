import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RentalDevolutionUseCase } from './RentalDevolutionUseCase';

export class RentalDevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const rentalDevolutionUseCase = container.resolve(RentalDevolutionUseCase);

    const rental = await rentalDevolutionUseCase.execute({
      user_id,
      id,
    });

    return response.status(200).json(rental);
  }
}
