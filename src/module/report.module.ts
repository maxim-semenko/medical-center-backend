import {Module} from '@nestjs/common';
import {ReportController} from "../controller/report.controller";
import {ReportService} from "../service/report.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {UserEntity} from "../entity/user.entity";
import {AppointmentEntity} from "../entity/appointment.entity";
import {DiseaseEntity} from "../entity/disease.entity";
import {VaccineEntity} from "../entity/vaccine.entity";
import {MedicalCardEntity} from "../entity/medicalCard.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity, UserEntity, AppointmentEntity, DiseaseEntity, VaccineEntity,
        MedicalCardEntity])],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {
}


