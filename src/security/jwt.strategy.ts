import {Inject, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthenticationHelper} from "./authentication.helper";
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    @Inject(AuthenticationHelper)
    private readonly helper: AuthenticationHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'JWT_KEY',
            signOptions: '10800s',
        });
    }

    async validate(payload: any) {
        return this.helper.validate(payload);
    }
}