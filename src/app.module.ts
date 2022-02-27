import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./module/user.module";
import {AppointmentModule} from "./module/appointment.module";
import {DiseaseModule} from "./module/disease.module";
import {EmployeeModule} from "./module/employee.module";
import {MedicalCardModule} from "./module/medicalCard.module";
import {RoleModule} from "./module/role.module";
import {UserAccessModule} from "./module/userAccess.module";
import {VaccineModule} from "./module/vaccine.module";

@Module({
    imports: [TypeOrmModule.forRoot(), AppointmentModule, DiseaseModule, EmployeeModule, MedicalCardModule,
        RoleModule, UserModule, UserAccessModule, VaccineModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
