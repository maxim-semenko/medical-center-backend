import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEntity } from 'src/entity/employee.entity';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeService } from '../service/employee.service';

describe('EmployeeEntity', () => {
    let employeeController: EmployeeController;
    let employeeEntity: EmployeeEntity;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [EmployeeService],
        }).compile();

        employeeController = module.get<EmployeeController>(EmployeeController);
    });
    it('should be defined', () => {
        expect(EmployeeController).toBeDefined();
    });

    it('should find all employeeUser', () => {
        expect(EmployeeController).toBeDefined();
    });

    it('should create employeeController', () => {
        expect(employeeController.create(employeeEntity));
    });

    it('should find all(not null)', () => {
        expect(employeeController.findAll());
    });

    it('should find by id = 1', () => {
        expect(employeeController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(employeeController.delete(4));
    });


});

