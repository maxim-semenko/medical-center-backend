import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository, Transaction, TransactionManager} from 'typeorm';
import {UserAccessEntity} from "../entity/userAccess.entity";
import {AuthenticationHelper} from "../security/authentication.helper";
import {LoginDto, RegisterDto} from "../security/dto/dto";
import {UserEntity} from "../entity/user.entity";
import {ROLE} from "../security/jwt.authentication.guard";

@Injectable()  //https://betterprogramming.pub/nestjs-authentication-with-jwt-and-postgres-50de6341f490
export class AuthenticationService {

    constructor(@InjectRepository(UserAccessEntity) private repository: Repository<UserAccessEntity>,
                @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
                @Inject(AuthenticationHelper) readonly helper: AuthenticationHelper) {
    }

    @Transaction()
    public async register(body: RegisterDto, @TransactionManager() transactionManager: EntityManager): Promise<UserEntity | never> {
        const {age, bloodType, firstname, lastname, passport, email, password}: RegisterDto = body;
        let userAccess: UserAccessEntity = await this.repository.findOne({where: {email}});
        let user: UserEntity = await this.userRepository.findOne({where: {passport}});
        if (userAccess || user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        userAccess = new UserAccessEntity();
        userAccess.email = email;
        userAccess.hashPassword = password;
        userAccess.role = ROLE.USER.toString();
        userAccess = await transactionManager.save(userAccess);

        user = new UserEntity();
        user.age = age;
        user.bloodType = bloodType;
        user.firstname = firstname;
        user.lastname = lastname;
        user.passport = passport;
        user.access = userAccess;
        await transactionManager.save(user);

        return user;
    }

    public async login(body: LoginDto): Promise<string | never> {
        const {email, password}: LoginDto = body;
        const user: UserAccessEntity = await this.repository.findOne({where: {email}});
        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.hashPassword);
        if (!isPasswordValid) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
        return this.helper.generateToken(user);
    }

}