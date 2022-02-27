import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AppointmentEntity} from "../entity/appointment.entity";
import {DiseaseEntity} from "../entity/disease.entity";

@Injectable()
export class DiseaseService {

    constructor(@InjectRepository(DiseaseEntity) private diseaseRepository: Repository<DiseaseEntity>) {
    }

    findById(id: number): Promise<DiseaseEntity> {
        return this.diseaseRepository.findOne(id);
    }

    findAll(): Promise<DiseaseEntity[]> {
        return this.diseaseRepository.find();
    }

    create(appointmentEntity: AppointmentEntity): Promise<DiseaseEntity> {
        return this.diseaseRepository.save(appointmentEntity);
    }

    update(id: number, diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        diseaseEntity.diseaseId = id;
        return this.diseaseRepository.save(diseaseEntity);
    }

    deleteById(id: number): void {
        this.diseaseRepository.delete(id)
    }

}