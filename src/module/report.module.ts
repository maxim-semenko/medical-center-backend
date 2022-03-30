import {Module} from '@nestjs/common';
import {ReportController} from "../controller/report.controller";
import {ReportService} from "../service/report.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {UserEntity} from "../entity/user.entity";
import {AppointmentEntity} from "../entity/appointment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity, UserEntity, AppointmentEntity])],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {
}


