import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {VaccineEntity} from "../entity/vaccine.entity";

@Injectable()
export class VaccineService {

    constructor(@InjectRepository(VaccineEntity) private vaccineRepository: Repository<VaccineEntity>) {
    }

    findById(id: number): Promise<VaccineEntity> {
        return this.vaccineRepository.findOne(id);
    }

    findAll(): Promise<VaccineEntity[]> {
        return this.vaccineRepository.find();
    }

    create(vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineRepository.save(vaccineEntity);
    }

    update(id: number, vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineRepository.update(id, vaccineEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.vaccineRepository.delete(id)
    }

}