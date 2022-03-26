import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthenticationService, jwtConstants} from "../service/authentication.service";
import {UserModule} from "./user.module";
import {JwtStrategy} from "../security/jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [AuthenticationService, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthModule {
}