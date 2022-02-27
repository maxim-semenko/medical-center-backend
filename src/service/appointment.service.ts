import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AppointmentEntity} from "../entity/appointment.entity";

@Injectable()
export class AppointmentService {

    constructor(@InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>) {
    }

    findById(id: number): Promise<AppointmentEntity> {
        return this.appointmentRepository.findOne(id);
    }

    findAll(): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find();
    }

    create(appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentRepository.save(appointmentEntity);
    }

    // update(appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
    //     return this.appointmentRepository.update(appointmentEntity);        //необходимо добавить в энтити нормальный первичный ключ
    // }

    deleteById(id: number): void {
        this.appointmentRepository.delete(id)
    }

}