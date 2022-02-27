import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserAccessEntity} from "../entity/userAccess.entity";

@Injectable()
export class UserAccessService {

    constructor(@InjectRepository(UserAccessEntity) private userAccessRepository: Repository<UserAccessEntity>) {
    }

    findById(id: number): Promise<UserAccessEntity> {
        return this.userAccessRepository.findOne(id);
    }

    findAll(): Promise<UserAccessEntity[]> {
        return this.userAccessRepository.find();
    }

    create(userAccessEntity: UserAccessEntity): Promise<UserAccessEntity> {
        return this.userAccessRepository.save(userAccessEntity);
    }

    update(id: number, userAccessEntity: UserAccessEntity): Promise<UserAccessEntity> {
        userAccessEntity.userId = id; // спорный вопрос
        return this.userAccessRepository.save(userAccessEntity);
    }

    deleteById(id: number): void {
        this.userAccessRepository.delete(id)
    }

}