import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {EmployeeController} from "../controller/employee.controller";
import {EmployeeService} from "../service/employee.service";
import {UserEntity} from "../entity/user.entity";
import {AppointmentEntity} from "../entity/appointment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity, UserEntity, AppointmentEntity])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {
}