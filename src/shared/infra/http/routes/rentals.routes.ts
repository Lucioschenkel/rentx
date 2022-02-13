import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { RentalDevolutionController } from '@modules/rentals/useCases/rentalDevolution/RentalDevolutionController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  rentalDevolutionController.handle
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
