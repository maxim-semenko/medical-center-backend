import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EmployeeEntity} from "../entity/employee.entity";

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) {
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
        employeeEntity.id = id;
        return this.employeeRepository.save(employeeEntity);
    }

    deleteById(id: number): void {
        this.employeeRepository.delete(id)
    }

}