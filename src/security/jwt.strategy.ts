import {Inject, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthenticationHelper} from "./authentication.helper";
import {UserAccessEntity} from "../entity/userAccess.entity";
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthenticationHelper)
    private readonly helper: AuthenticationHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'JWT_KEY',
            signOptions: '10800s',
        });
    }

    private validate(payload: string): Promise<UserAccessEntity | never> {
        return this.helper.validateUser(payload);
    }
}