import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,) {}

    findById(id: number): Promise<UserEntity> {
        return this.usersRepository.findOne(id);
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    create(createUserDto: CreateUserDto): Promise<UserEntity> {
        let user: UserEntity = new UserEntity();
        user.firstname = createUserDto.firstname;
        user.lastname = createUserDto.lastname;

        return this.usersRepository.save(user);
    }

    async updateById(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const existedUser : UserEntity = await this.usersRepository.findOne(id)
        return this.usersRepository.save({...existedUser, ...updateUserDto});
    }

    async deleteById(id: number): Promise<UserEntity> {
        let user: UserEntity = await this.usersRepository.findOne(id)
        await this.usersRepository.delete(id)
        return user;
    }

}
