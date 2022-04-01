import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserAccessEntity} from "../entity/userAccess.entity";
import {UserAccessService} from "../service/userAccess.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserAccessEntity])],
    providers: [UserAccessService],
})
export class UserAccessModule {
}
