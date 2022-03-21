import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentEntity } from 'src/entity/appointment.entity';
import { AppointmentController } from '../controller/appointment.controller';
import { AppointmentService } from '../service/appointment.service';

describe('AppointmentEntity', () => {
    let appointmentController: AppointmentController;
    let appointmentEntity: AppointmentEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppointmentController],
            providers: [AppointmentService],
        }).compile();

        appointmentController = module.get<AppointmentController>(AppointmentController);
    });

    it('should be defined', () => {
        expect(AppointmentController).toBeDefined();
    });

    it('find all user appointmentController by "id = 4"', () => {
        expect(appointmentController.findAllUserAppointment(4));
    });

    it('find all user appointment to employee by EmployeeId=7, userId=4', () => {
        expect(appointmentController.findAllUserAppointmentToEmployee(7, 4));
    });

    it('find all employee appointment by id = 7', () => {
        expect(appointmentController.findAllEmployeeAppointment(7));
    });

    it('should create a appointment', () => {
        expect(appointmentController.create(appointmentEntity));
    });

    it('should find all(not null)', () => {
        expect(appointmentController.findAll());
    });

    it('should find by id = 1', () => {
        expect(appointmentController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(appointmentController.delete(4));
    });


});