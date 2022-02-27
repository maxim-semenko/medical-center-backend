import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentEntity} from "../entity/appointment.entity";
import {AppointmentController} from "../controller/appointment.controller";
import {AppointmentService} from "../service/appointment.service";

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}


