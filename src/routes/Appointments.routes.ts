import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRespository from '../repositories/AppointmentsRepository';

const appointments = Router();
const AppointmentRespository = new AppointmentsRespository();

appointments.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = AppointmentRespository.findBydate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'this appointment is already booked' });
  }

  const appointment = AppointmentRespository.create({
    provider,
    date: parsedDate,
  });

  return res.json(appointment);
});

appointments.get('/', (req, res) => {
  const appointment = AppointmentRespository.all();

  return res.json(appointment);
});

export default appointments;
