import {Controller,  Get} from '@nestjs/common';
import {AppointmentService} from '../service/appointment.service';
import {AppointmentEntity} from "../entity/appointment.entity";

@Controller('api/v1/appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    @Get()
    findAll(): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAll();
    }
}

