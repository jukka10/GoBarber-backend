import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentRespository = getCustomRepository(AppointmentsRespository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRespository.findBydate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('this appointment is already booked');
    }

    const appointment = appointmentRespository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentRespository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
