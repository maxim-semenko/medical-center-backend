import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard, IAuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {UserAccessEntity} from "../entity/userAccess.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
    public handleRequest(err: unknown, user: UserAccessEntity): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const {user}: Request = context.switchToHttp().getRequest();

        return !!user;
    }
}