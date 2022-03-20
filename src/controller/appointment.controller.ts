import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {AppointmentService} from '../service/appointment.service';
import {AppointmentEntity} from "../entity/appointment.entity";

@Controller('api/v1/appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    // Находит все записи по id пациента
    @Get('/users/:userId')
    findAllUserAppointment(@Param("userId") userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllUserAppointment(userId);
    }

    @Get('/employees/:employeeId/users/:userId')
    findAllUserAppointmentToEmployee(@Param("employeeId") employeeId: number, @Param("userId") userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllUserAppointmentToEmployee(employeeId, userId);
    }

    // Находит все записи по id врача
    @Get('/employees/:employeeId')
    findAllEmployeeAppointment(@Param("employeeId") employeeId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllEmployeeAppointment(employeeId);
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
    @UsePipes(new ValidationPipe())
    create(@Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.create(appointmentEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: number, @Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.update(id, appointmentEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.appointmentService.deleteById(id);
    }

}

