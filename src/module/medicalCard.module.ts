import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicalCardEntity} from "../entity/medicalCard.entity";
import {MedicalCardController} from "../controller/medicalCard.controller";
import {MedicalCardService} from "../service/medicalCard.service";

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCardEntity])],
  controllers: [MedicalCardController],
  providers: [MedicalCardService],
})
export class MedicalCardModule {}



