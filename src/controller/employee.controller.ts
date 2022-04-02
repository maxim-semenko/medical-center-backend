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
import {EmployeeService} from '../service/employee.service';
import {EmployeeEntity} from "../entity/employee.entity";
import {UserEntity} from "../entity/user.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get('/:id/users')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    findAllEmployeeUser(@Param("id") employeeId: number): Promise<UserEntity[]> {
        return this.employeeService.findAllEmployeeUser(employeeId);
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.USER, ROLE.HEAD_DOCTOR]))
    findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    findById(@Param("id") id: number): Promise<EmployeeEntity> {
        return this.employeeService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    create(@Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.create(employeeEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    update(@Param("id") id: number, @Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.update(id, employeeEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    delete(@Param("id") id: number): void {
        this.employeeService.deleteById(id);
    }

}
