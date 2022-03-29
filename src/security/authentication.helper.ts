import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserAccessEntity} from "../entity/userAccess.entity";

@Injectable()
export class AuthenticationHelper {
    @InjectRepository(UserAccessEntity)
    private readonly repository: Repository<UserAccessEntity>;

    //bcrypt doesnt use

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<UserAccessEntity> {
        return this.repository.findOne(decoded.id);
    }

    // Generate JWT Token
    public generateToken(user: UserAccessEntity): string {
        return this.jwt.sign({id: user.id, email: user.email});
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return password == userPassword;
        //        return bcrypt.compareSync(password, userPassword);
    }

    // Encode User's password
    // public encodePassword(password: string): string {
    //     const salt: string = bcrypt.genSaltSync(10);
    //
    //     return bcrypt.hashSync(password, salt);
    // }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    private async validate(token: string): Promise<boolean | never> {
        const decoded: unknown = this.jwt.verify(token);

        if (!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const user: UserAccessEntity = await this.validateUser(decoded);

        if (!user) {
            throw new UnauthorizedException();
        }

        return true;
    }
}