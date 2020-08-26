import { Router } from 'express';

import appointments from './Appointments.routes';

const routes = Router();

routes.use('/appointments', appointments);

export default routes;
