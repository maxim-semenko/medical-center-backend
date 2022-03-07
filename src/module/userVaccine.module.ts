import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserVaccineService} from "../service/userVaccine.service";
import {M2mUserVaccineEntity} from "../entity/m2mUserVaccine.entity";
import {UserVaccineController} from "../controller/userVaccine.controller";

@Module({
    imports: [TypeOrmModule.forFeature([M2mUserVaccineEntity])],
    controllers: [UserVaccineController],
    providers: [UserVaccineService],
})
export class UserVaccineModule {
}


