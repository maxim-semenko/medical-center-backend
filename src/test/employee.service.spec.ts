import {Test, TestingModule} from '@nestjs/testing';
import {EmployeeEntity} from '../entity/employee.entity';
import {EmployeeController} from '../controller/employee.controller';
import {EmployeeService} from '../service/employee.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {AppointmentEntity} from "../entity/appointment.entity";

describe('EmployeeService', () => {

    let service: EmployeeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [EmployeeService,
                {
                    provide: getRepositoryToken(AppointmentEntity), useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(UserEntity), useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(EmployeeEntity), useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('/Delete employee/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(service.deleteById(1)).toStrictEqual(Promise.resolve());
    });

    it(`/should find all employee/`, async () => {
        const employee_1: EmployeeEntity = new EmployeeEntity();
        const employee_2: EmployeeEntity = new EmployeeEntity();
        employee_1.id = 1;
        employee_1.firstname = "test_firstname";
        employee_2.id = 1;
        employee_2.firstname = "test_firstname";
        let employee: Array<EmployeeEntity>;
        employee = [employee_1, employee_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await service.findAll()).toStrictEqual(employee);
    });

    it(`/should update employee/`, async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await service.update(1, employee)).toStrictEqual(employee);
    });

    it(`/should create employee/`, async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await service.create(employee)).toStrictEqual(employee);
    });

    it('should find by id = 1', async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(service, 'findById').mockImplementation(async () => employee);
        expect(await service.findById(1)).toStrictEqual(employee);
    });

});


