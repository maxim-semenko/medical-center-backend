import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChiefDoctorEntity} from "../entity/chiefDoctor.entity";
import {ChiefDoctorController} from "../controller/chiefDoctor.controller";
import {ChiefDoctorService} from "../service/chiefDoctor.service";

@Module({
  imports: [TypeOrmModule.forFeature([ChiefDoctorEntity])],
  controllers: [ChiefDoctorController],
  providers: [ChiefDoctorService],
})
export class ChiefDoctorModule {}


