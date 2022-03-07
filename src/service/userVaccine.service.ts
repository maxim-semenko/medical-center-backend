import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {M2mUserVaccineEntity} from "../entity/m2mUserVaccine.entity";

@Injectable()
export class UserVaccineService {

    constructor(@InjectRepository(M2mUserVaccineEntity) private userVaccineEntityRepository: Repository<M2mUserVaccineEntity>) {
    }

    findById(userId: number): Promise<M2mUserVaccineEntity> {
        return this.userVaccineEntityRepository.findOne(userId);
    }

    findAll(): Promise<M2mUserVaccineEntity[]> {
        return this.userVaccineEntityRepository.find();
    }

    create(userVaccineEntity: M2mUserVaccineEntity): Promise<M2mUserVaccineEntity> {
        return this.userVaccineEntityRepository.save(userVaccineEntity);
    }

    update(userId: number, userVaccineEntity: M2mUserVaccineEntity): Promise<M2mUserVaccineEntity> {
        return this.userVaccineEntityRepository.update(userId, userVaccineEntity).then(x => this.findById(userId));
    }

    deleteById(userId: number): void {
        this.userVaccineEntityRepository.delete(userId)
    }

}