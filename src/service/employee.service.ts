import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {AppointmentEntity} from "../entity/appointment.entity";
import {UserEntity} from "../entity/user.entity";

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
                @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
                @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    }

    async findAllEmployeeUser(employeeId: number): Promise<UserEntity[]> {
        return await this.appointmentRepository
            .query("SELECT DISTINCT * FROM medical_centre.public.user LEFT JOIN appointment ON appointment.user_id = medical_centre.public.user.id WHERE appointment.employee_id = $1", [1])
    }

    findById(id: number): Promise<EmployeeEntity> {
        return this.employeeRepository.findOne(id);
    }

    findAll(): Promise<EmployeeEntity[]> {
        return this.employeeRepository.find();
    }

    create(employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeRepository.save(employeeEntity);
    }

    update(id: number, employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeRepository.update(id, employeeEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.employeeRepository.delete(id)
    }

}
