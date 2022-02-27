import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RoleEntity} from "../entity/role.entity";

@Injectable()
export class RoleService {

    constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>) {
    }

    findById(id: number): Promise<RoleEntity> {
        return this.roleRepository.findOne(id);
    }

    findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    create(roleEntity: RoleEntity): Promise<RoleEntity> {
        return this.roleRepository.save(roleEntity);
    }

    update(id: number, roleEntity: RoleEntity): Promise<RoleEntity> {
        roleEntity.id = id;
        return this.roleRepository.save(roleEntity);
    }

    deleteById(id: number): void {
        this.roleRepository.delete(id)
    }

}