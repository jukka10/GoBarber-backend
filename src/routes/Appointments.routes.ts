import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

import authenticated from '../middlewares/auth/index';

const appointmentsRouter = Router();

appointmentsRouter.use(authenticated);

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

appointmentsRouter.get('/', async (req, res) => {
  const appointmentReposiroty = getCustomRepository(AppointmentsRespository);
  const appointment = await appointmentReposiroty.find();

  return res.json(appointment);
});

export default appointmentsRouter;
