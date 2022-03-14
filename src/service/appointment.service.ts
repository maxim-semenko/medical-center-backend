import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AppointmentEntity} from "../entity/appointment.entity";

@Injectable()
export class AppointmentService {

    constructor(@InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>) {
    }

    findById(id: number): Promise<AppointmentEntity> {
        return this.appointmentRepository.findOne(id, {relations: ["userEntity", "employee"]});
    }

    findAllUserAppointment(userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find({
            where: {
                userEntity: userId,
            },
            relations: ["userEntity", "employee"]
        });
    }

    findAllUserAppointmentToEmployee(employeeId: number, userId: number): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find({
            where: {
                employee: employeeId,
                userEntity: userId,
            },
            relations: ["userEntity", "employee"]
        });
    }


    findAllEmployeeAppointment(employeeId: number): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find({
            where: {
                employee: employeeId
            },
            relations: ["userEntity", "employee"]
        });
    }

    findAll(): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.find({relations: ["userEntity", "employee"]});
    }

    create(appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentRepository.save(appointmentEntity);
    }

    update(id: number, appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
        return this.appointmentRepository.update(id, appointmentEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.appointmentRepository.delete(id)
    }

}
