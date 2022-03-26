import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {UserController} from "../controller/user.controller";
import {UserService} from "../service/user.service";
import {UserAccessService} from "../service/userAccess.service";
import {UserAccessEntity} from "../entity/userAccess.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserAccessEntity])],
    controllers: [UserController],
    providers: [UserService, UserAccessService],
})
export class UserModule {
}
