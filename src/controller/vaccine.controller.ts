import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {VaccineService} from '../service/vaccine.service';
import {VaccineEntity} from "../entity/vaccine.entity";
import {UpdateResult} from "typeorm";

@Controller('api/v1/vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService) {
    }

    @Get()
    findAll(): Promise<VaccineEntity[]> {
        return this.vaccineService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<VaccineEntity> {
        return this.vaccineService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineService.create(vaccineEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineService.update(id, vaccineEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.vaccineService.deleteById(id);
    }
}


