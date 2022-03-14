import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MedicalCardEntity} from "../entity/medicalCard.entity";

@Injectable()
export class MedicalCardService {

    constructor(@InjectRepository(MedicalCardEntity) private medicalCardRepository: Repository<MedicalCardEntity>) {
    }

    findUserMedicalCard(userId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardRepository.find({
            where: {
                user: userId,
            },
            relations: ["user", "employee", "disease"]
        });
    }

    findEmployeeMedicalCard(employeeId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardRepository.find({
            where: {
                employee: employeeId,
            },
            relations: ["employee", "userEntity", "disease"]
        });
    }

    findById(id: number): Promise<MedicalCardEntity> {
        return this.medicalCardRepository.findOne(id,
            {relations: ["disease", "appointment", "appointment.user", "appointment.employee", "userEntity", "employee"]});
    }

    findAll(): Promise<MedicalCardEntity[]> {
        return this.medicalCardRepository.find({relations: ["disease", "appointment", "userEntity"]});
    }

    create(medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardRepository.save(medicalCardEntity);
    }

    update(id: number, medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardRepository.update(id, medicalCardEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.medicalCardRepository.delete(id)
    }

}
