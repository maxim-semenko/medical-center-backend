import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UserService} from '../service/user.service';
import {UserEntity} from "../entity/user.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.DOCTOR, ROLE.HEAD_DOCTOR]))
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findById(@Param("id") id: number): Promise<UserEntity> {
        return this.userService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    create(@Body() userEntity: UserEntity): Promise<UserEntity> {
        return this.userService.create(userEntity);
    }

    @Put('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    update(@Param("id") id: number, @Body() userEntity: UserEntity): Promise<UserEntity> {
        return this.userService.update(id, userEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    delete(@Param("id") id: number): void {
        this.userService.deleteById(id);
    }

}
