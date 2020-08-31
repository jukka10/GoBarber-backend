import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', async (req, res) => {
  const appointmentReposiroty = getCustomRepository(AppointmentsRespository);
  const appointment = await appointmentReposiroty.find();

  return res.json(appointment);
});

export default appointmentsRouter;
