import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {UserVaccineService} from "../service/userVaccine.service";
import {M2mUserVaccineEntity} from "../entity/m2mUserVaccine.entity";

@Controller('api/v1/vaccines/user')
export class UserVaccineController {
    constructor(private readonly userVaccineService: UserVaccineService) {
    }

    @Get('')
    findAll(): Promise<M2mUserVaccineEntity[]> {
        return this.userVaccineService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<M2mUserVaccineEntity> {
        return this.userVaccineService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() userVaccineEntity: M2mUserVaccineEntity): Promise<M2mUserVaccineEntity> {
        return this.userVaccineService.create(userVaccineEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() userVaccineEntity: M2mUserVaccineEntity): Promise<M2mUserVaccineEntity> {
        return this.userVaccineService.update(id, userVaccineEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.userVaccineService.deleteById(id);
    }
}


