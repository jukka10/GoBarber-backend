import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRespository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointments = Router();
const appointmentReposiroty = new AppointmentRespository();

appointments.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentReposiroty = new CreateAppointmentService(
      appointmentReposiroty,
    );

    const appointment = createAppointmentReposiroty.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointments.get('/', (req, res) => {
  const appointment = appointmentReposiroty.all();

  return res.json(appointment);
});

export default appointments;
