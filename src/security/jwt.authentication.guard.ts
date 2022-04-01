import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

export enum ROLE {
    HEAD_DOCTOR = "HEAD_DOCTOR",
    DOCTOR = 'DOCTOR',
    USER = 'USER',
    PERMIT_ALL = "PERMIT_ALL"
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    role: ROLE[];

    constructor(role: ROLE[]) {
        super(role);
        this.role = role;
    }

    handleRequest(err, role, info: Error) {
        if (this.role.includes(ROLE.PERMIT_ALL)) {
            return role;
        }

        if (!this.role.includes(role)) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}