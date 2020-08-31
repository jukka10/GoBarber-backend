import { Router } from 'express';

import appointmentsRouter from './Appointments.routes';
import usersRouter from './Users.routes';
import sessionsRouter from './Sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
