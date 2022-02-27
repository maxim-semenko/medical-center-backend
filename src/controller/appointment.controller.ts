import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {UserEntity} from "../entity/user.entity";

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<UserEntity> {
        return this.userService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() userEntity: UserEntity): Promise<UserEntity> {
        return this.userService.create(userEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() userEntity: UserEntity): Promise<UserEntity> {
        return this.userService.update(id, userEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.userService.deleteById(id);
    }

}
