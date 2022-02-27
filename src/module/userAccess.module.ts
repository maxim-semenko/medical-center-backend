import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserAccessEntity} from "../entity/userAccess.entity";
import {UserAccessController} from "../controller/userAccess.controller";
import {UserAccessService} from "../service/userAccess.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserAccessEntity])],
  controllers: [UserAccessController],
  providers: [UserAccessService],
})
export class UserAccessModule {}
