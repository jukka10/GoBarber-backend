import { Router } from 'express';

import appointmentsRouter from './Appointments.routes';
import usersRouter from './Users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
