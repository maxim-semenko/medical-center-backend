import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {AppointmentService} from '../service/appointment.service';
import {AppointmentEntity} from "../entity/appointment.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    // Находит все записи по id пациента
    @Get('/users/:userId')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAllUserAppointment(@Param("userId") userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllUserAppointment(userId);
    }

    @Get('/employees/:employeeId/users/:userId')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAllUserAppointmentToEmployee(@Param("employeeId") employeeId: number, @Param("userId") userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllUserAppointmentToEmployee(employeeId, userId);
    }

    // Находит все записи по id врача
    @Get('/employees/:employeeId')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    findAllEmployeeAppointment(@Param("employeeId") employeeId: number): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAllEmployeeAppointment(employeeId);
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAll(): Promise<AppointmentEntity[]> {
        return this.appointmentService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findById(@Param("id") id: number): Promise<AppointmentEntity> {
        return this.appointmentService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.USER]))
    create(@Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.create(appointmentEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.USER]))
    update(@Param("id") id: number, @Body() appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentService.update(id, appointmentEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.USER]))
    delete(@Param("id") id: number): void {
        this.appointmentService.deleteById(id);
    }

}

