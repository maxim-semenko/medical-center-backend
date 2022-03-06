import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {RoleService} from '../service/role.service';
import {RoleEntity} from "../entity/role.entity";

@Controller('api/v1/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Get()
    findAll(): Promise<RoleEntity[]> {
        return this.roleService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<RoleEntity> {
        return this.roleService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() roleEntity: RoleEntity): Promise<RoleEntity> {
        return this.roleService.create(roleEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() roleEntity: RoleEntity): Promise<RoleEntity> {
        return this.roleService.update(id, roleEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.roleService.deleteById(id);
    }
}


