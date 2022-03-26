import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {UserAccessEntity} from "../entity/userAccess.entity";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
                @InjectRepository(UserAccessEntity) private userAccessRepository: Repository<UserAccessEntity>) {
    }

    async findOne(userEmail: string): Promise<UserAccessEntity> {
        return this.userAccessRepository.findOne({
            where: {
                email: userEmail
            }
        });
    }

    findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne(id, {relations: ["vaccine"]});
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find({relations: ["vaccine"]});
    }

    create(userEntity: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(userEntity);
    }

    update(id: number, userEntity: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(userEntity).then(x => this.findById(id));
    }

    deleteById(id: number): void {
        this.userRepository.delete(id)
    }

}
