import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {VaccineEntity} from "../entity/vaccine.entity";
import {VaccineController} from "../controller/vaccine.controller";
import {VaccineService} from "../service/vaccine.service";

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}


