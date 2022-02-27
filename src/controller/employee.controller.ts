import {Controller,  Get} from '@nestjs/common';
import {EmployeeService} from '../service/employee.service';
import {EmployeeEntity} from "../entity/employee.entity";

@Controller('api/v1/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get()
    findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }
}


