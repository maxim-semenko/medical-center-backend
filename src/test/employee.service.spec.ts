import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEntity } from '../entity/employee.entity';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeService } from '../service/employee.service';
import { getRepositoryToken } from "@nestjs/typeorm";

describe('EmployeeEntity', () => {
    let employeeController: EmployeeController;
    let employeeService: EmployeeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [
                EmployeeService, {
                    provide: getRepositoryToken(EmployeeEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        employeeController = module.get<EmployeeController>(EmployeeController);
        employeeService = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(employeeController).toBeDefined();
    });

    it('/Delete employee/1', async () => {
        jest.spyOn(employeeService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(employeeController.delete(1)).toBe(undefined);
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
        jest.spyOn(employeeService, 'findAll').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await employeeController.findAll()).toBe(employee);
    });

    it(`/should update employee/`, async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(employeeService, 'update').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await employeeController.update(1, employee)).toBe(employee);
    });

    it(`/should create employee/`, async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(employeeService, 'create').mockImplementation(() => {
            return Promise.resolve(employee);
        });
        expect(await employeeController.create(employee)).toBe(employee);
    });

    it('should find by id = 1', async () => {
        const employee: EmployeeEntity = new EmployeeEntity();
        employee.id = 1;
        employee.firstname = "test_firstname";
        jest.spyOn(employeeService, 'findById').mockImplementation(async () => employee);
        expect(await employeeService.findById(1)).toBe(employee);
    });

});


