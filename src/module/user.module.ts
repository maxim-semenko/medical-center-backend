import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacientEntity} from "../entity/user.entity";
import {PacientController} from "../controller/user.controller";
import {PacientService} from "../service/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
