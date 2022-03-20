import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {EmployeeService} from '../service/employee.service';
import {EmployeeEntity} from "../entity/employee.entity";
import {UserEntity} from "../entity/user.entity";

@Controller('api/v1/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get('/:id/users')
    findAllEmployeeUser(@Param("id") employeeId: number): Promise<UserEntity[]> {
        return this.employeeService.findAllEmployeeUser(employeeId);
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
    @UsePipes(new ValidationPipe())
    create(@Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.create(employeeEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: number, @Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.update(id, employeeEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.employeeService.deleteById(id);
    }
}


