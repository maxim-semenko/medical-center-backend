import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {EmployeeController} from "../controller/employee.controller";
import {EmployeeService} from "../service/employee.service";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class  EmployeeModule {}