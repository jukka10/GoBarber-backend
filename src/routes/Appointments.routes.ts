import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

const appointments = Router();

appointments.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointments.get('/', async (req, res) => {
  const appointmentReposiroty = getCustomRepository(AppointmentsRespository);
  const appointment = await appointmentReposiroty.find();

  return res.json(appointment);
});

export default appointments;
