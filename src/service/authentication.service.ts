import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserAccessEntity} from "../entity/userAccess.entity";
import {AuthenticationHelper} from "../security/authentication.helper";
import {LoginDto, RegisterDto} from "../security/dto/dto";

@Injectable()  //https://betterprogramming.pub/nestjs-authentication-with-jwt-and-postgres-50de6341f490
export class AuthenticationService {

    constructor(@InjectRepository(UserAccessEntity) private repository: Repository<UserAccessEntity>,
                @Inject(AuthenticationHelper) readonly helper: AuthenticationHelper) {
    }

    public async register(body: RegisterDto): Promise<UserAccessEntity | never> {
        const {email, password}: RegisterDto = body;
        let user: UserAccessEntity = await this.repository.findOne({where: {email}});

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new UserAccessEntity();

        user.email = email;
        user.hashPassword = password;

        //         user.hashPassword = this.helper.encodePassword(password);

        return this.repository.save(user);
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

    public async refresh(user: UserAccessEntity): Promise<string> {
        return this.helper.generateToken(user);
    }
}