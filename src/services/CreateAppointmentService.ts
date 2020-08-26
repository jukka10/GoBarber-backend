import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRespository: AppointmentsRespository;

  constructor(appointmentRespository: AppointmentsRespository) {
    this.appointmentRespository = appointmentRespository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRespository.findBydate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('this appointment is already booked');
    }

    const appointment = this.appointmentRespository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
