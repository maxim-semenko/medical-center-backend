import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
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

    @Get('/:id')
    findById(@Param("id") id: number): Promise<EmployeeEntity> {
        return this.employeeService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.create(employeeEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.update(id, employeeEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.employeeService.deleteById(id);
    }
}


