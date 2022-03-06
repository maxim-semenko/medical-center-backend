import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
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

    @Get('/:id')
    findById(@Param("id") id: number): Promise<AppointmentEntity> {
        return this.appointmentService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.create(appointmentEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.update(id, appointmentEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.appointmentService.deleteById(id);
    }
}

