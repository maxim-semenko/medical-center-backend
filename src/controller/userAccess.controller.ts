import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserAccessService} from '../service/userAccess.service';
import {UserAccessEntity} from "../entity/userAccess.entity";

@Controller('api/v1/userAccesses')
export class UserAccessController {
    constructor(private readonly userAccessService: UserAccessService) {
    }

    @Get()
    findAll(): Promise<UserAccessEntity[]> {
        return this.userAccessService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<UserAccessEntity> {
        return this.userAccessService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    create(@Body() userAccessEntity: UserAccessEntity): Promise<UserAccessEntity> {
        return this.userAccessService.create(userAccessEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: number, @Body() userAccessEntity: UserAccessEntity): Promise<UserAccessEntity> {
        return this.userAccessService.update(id, userAccessEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.userAccessService.deleteById(id);
    }
}


