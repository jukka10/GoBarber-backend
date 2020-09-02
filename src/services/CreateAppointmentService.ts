import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentRespository = getCustomRepository(AppointmentsRespository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRespository.findBydate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked');
    }

    const appointment = appointmentRespository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRespository.save(appointment);

    return appointment;
  }
}
