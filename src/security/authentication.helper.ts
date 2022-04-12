import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserAccessEntity} from "../entity/userAccess.entity";
import {UserEntity} from "../entity/user.entity";
import {EmployeeEntity} from "../entity/employee.entity";
import {ROLE} from "./jwt.authentication.guard";

@Injectable()
export class AuthenticationHelper {
    @InjectRepository(UserAccessEntity)
    private readonly repository: Repository<UserAccessEntity>;
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>;
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    public async validateUser(decoded: any): Promise<UserAccessEntity> {
        let userEntity;
        if (decoded.role === ROLE.USER) {
            userEntity = await this.userRepository.findOne({
                where: {
                    access: decoded.id
                },
                relations: ["access"]
            });
        } else {
            userEntity = await this.employeeRepository.findOne({
                where: {
                    id: decoded.id
                },
                relations: ["access"]
            });
        }
        return userEntity.access;
    }

    public async generateToken(user: UserAccessEntity): Promise<string> {
        let userEntity;
        if (user.role === ROLE.USER) {
            userEntity = await this.userRepository.findOne({
                where: {
                    access: user.id
                }
            });
        } else {
            userEntity = await this.employeeRepository.findOne({
                where: {
                    access: user.id
                }
            });
        }

        return this.jwt.sign({id: userEntity.id, email: user.email, role: user.role, pass: user.hashPassword});
    }

    public isPasswordValid(password: string, userPassword: string): boolean {
        return password == userPassword;
    }

    public async validate(decodeToken: string): Promise<string | never> {
        const user: UserAccessEntity = await this.validateUser(decodeToken);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user.role;
    }

    public async decodeAndValidate(token: string): Promise<string | never> {
        const decoded: unknown = this.jwt.verify(token);
        if (!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.validate(decoded.toString());
    }

}
