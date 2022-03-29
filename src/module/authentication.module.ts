import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthenticationService} from "../service/authentication.service";
import {UserModule} from "./user.module";
import {JwtStrategy} from "../security/jwt.strategy";
import {UserAccessModule} from "./userAccess.module";
import {UserAccessService} from "../service/userAccess.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserAccessEntity} from "../entity/userAccess.entity";
import {UserEntity} from "../entity/user.entity";
import {AuthenticationHelper} from "../security/authentication.helper";
import {AppController} from "../controller/login.controller";

@Module({
    imports: [
        UserModule,
        UserAccessModule,
        PassportModule,
        TypeOrmModule.forFeature([UserAccessEntity, UserEntity]),
        JwtModule.register({
            secret: 'JWT_KEY',
            signOptions: {expiresIn: '10800s'},
        }),
    ],
    controllers: [AppController],
    providers: [AuthenticationService, AuthenticationHelper, JwtStrategy, UserAccessService],
})
export class AuthenticationModule {
}