import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../entity/role.entity";
import {RoleController} from "../controller/role.controller";
import {RoleService} from "../service/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}


