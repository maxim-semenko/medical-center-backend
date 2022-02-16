import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {UserEntity} from "../entity/user.entity";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
    create(@Body() createUserDto: CreateUserDto ): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userService.updateById(id, updateUserDto);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): Promise<UserEntity> {
        return this.userService.deleteById(id);
    }

}
