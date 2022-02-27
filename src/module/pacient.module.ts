import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacientEntity} from "../entity/pacient.entity";
import {PacientController} from "../controller/pacient.controller";
import {PacientService} from "../service/pacient.service";

@Module({
  imports: [TypeOrmModule.forFeature([PacientEntity])],
  controllers: [PacientController],
  providers: [PacientService],
})
export class PacientModule {}
