import {Injectable} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtService} from "@nestjs/jwt";

export const jwtConstants = {
    secret: 'secretKey',
};

@Injectable()
export class AuthenticationService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {
    }

    async login(user: any) {
        const payload = {email: user.email, password: user.password};
        let userAccess = this.usersService.findOne(payload.email);
        return {
            access_token: this.jwtService.sign(userAccess),
        };
    }
}