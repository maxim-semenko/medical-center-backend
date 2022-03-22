import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentEntity } from '../entity/appointment.entity';
import { AppointmentController } from '../controller/appointment.controller';
import { AppointmentService } from '../service/appointment.service';
import { getRepositoryToken } from "@nestjs/typeorm";

describe('AppointmentEntity', () => {
    let appointmentController: AppointmentController;
    let appointmentService: AppointmentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppointmentController],
            providers: [
                AppointmentService, {
                    provide: getRepositoryToken(AppointmentEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        appointmentController = module.get<AppointmentController>(AppointmentController);
        appointmentService = module.get<AppointmentService>(AppointmentService);
    });

    it('should be defined', () => {
        expect(appointmentController).toBeDefined();
    });

    it(`/should find all user appointment/`, async () => {
        const appointment_1: AppointmentEntity = new AppointmentEntity();
        const appointment_2: AppointmentEntity = new AppointmentEntity();
        appointment_1.id = 1;
        appointment_1.description = "test_description";
        appointment_2.id = 2;
        appointment_2.description = "test_description_1";
        let appointment: Array<AppointmentEntity>;
        appointment = [appointment_1, appointment_2];
        jest.spyOn(appointmentService, 'findAll').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.findAllUserAppointment(1)).toStrictEqual(undefined);
    });

    it(`/should find all employee appointment/`, async () => {
        const appointment_1: AppointmentEntity = new AppointmentEntity();
        const appointment_2: AppointmentEntity = new AppointmentEntity();
        appointment_1.id = 1;
        appointment_1.description = "test_description";
        appointment_2.id = 2;
        appointment_2.description = "test_description_1";
        let appointment: Array<AppointmentEntity>;
        appointment = [appointment_1, appointment_2];
        jest.spyOn(appointmentService, 'findAll').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.findAllEmployeeAppointment(1)).toStrictEqual(undefined);
    });

    it(`/should find all user appointment to employee/`, async () => {
        const appointment_1: AppointmentEntity = new AppointmentEntity();
        const appointment_2: AppointmentEntity = new AppointmentEntity();
        appointment_1.id = 1;
        appointment_1.description = "test_description";
        appointment_2.id = 2;
        appointment_2.description = "test_description_1";
        let appointment: Array<AppointmentEntity>;
        appointment = [appointment_1, appointment_2];
        jest.spyOn(appointmentService, 'findAll').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.findAllUserAppointmentToEmployee(1, 2)).toStrictEqual(undefined);
    });

    it('/Delete appointment/1', async () => {
        jest.spyOn(appointmentService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(appointmentService.deleteById(1)).toStrictEqual(Promise.resolve());
    });

    it(`/should find all appointment/`, async () => {
        const appointment_1: AppointmentEntity = new AppointmentEntity();
        const appointment_2: AppointmentEntity = new AppointmentEntity();
        appointment_1.id = 1;
        appointment_1.description = "test_description";
        appointment_2.id = 2;
        appointment_2.description = "test_description_1";
        let appointment: Array<AppointmentEntity>;
        appointment = [appointment_1, appointment_2];
        jest.spyOn(appointmentService, 'findAll').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.findAll()).toStrictEqual(appointment);
    });

    it(`/should update appointment/`, async () => {
        const appointment: AppointmentEntity = new AppointmentEntity();
        appointment.id = 1;
        appointment.description = "test_description";
        jest.spyOn(appointmentService, 'update').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.update(1, appointment)).toStrictEqual(appointment);
    });

    it(`/should create appointment/`, async () => {
        const appointment: AppointmentEntity = new AppointmentEntity();
        appointment.id = 1;
        appointment.description = "test_description";
        jest.spyOn(appointmentService, 'create').mockImplementation(() => {
            return Promise.resolve(appointment);
        });
        expect(await appointmentService.create(appointment)).toStrictEqual(appointment);
    });


    it('should find by id = 1', async () => {
        const appointment: AppointmentEntity = new AppointmentEntity();
        appointment.id = 1;
        appointment.description = "test_description";
        jest.spyOn(appointmentService, 'findById').mockImplementation(async () => appointment);
        expect(await appointmentService.findById(1)).toBe(appointment);
    });

});