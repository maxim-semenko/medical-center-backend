import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserAccessEntity} from "../entity/userAccess.entity";

@Injectable()
export class AuthenticationHelper {
    @InjectRepository(UserAccessEntity)
    private readonly repository: Repository<UserAccessEntity>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    public async validateUser(decoded: any): Promise<UserAccessEntity> {
        return this.repository.findOne(decoded.id);
    }

    public generateToken(user: UserAccessEntity): string {
        return this.jwt.sign({id: user.id, email: user.email, role: user.role, pass: user.hashPassword});
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