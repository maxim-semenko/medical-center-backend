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
        const userIds: any[] = await this.appointmentRepository
            .query("SELECT DISTINCT user_id FROM appointment WHERE employee_id = $1", [1]);
        console.log(userIds);
        return this.userRepository.find({
            where: {
                // id: userIds,
            }
        })
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
