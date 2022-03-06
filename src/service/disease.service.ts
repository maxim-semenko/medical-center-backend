import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

    create(diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseRepository.save(diseaseEntity);
    }

    update(id: number, diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseRepository.update(id, diseaseEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.diseaseRepository.delete(id)
    }

}