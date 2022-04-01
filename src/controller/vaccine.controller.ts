import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {VaccineService} from '../service/vaccine.service';
import {VaccineEntity} from "../entity/vaccine.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService) {
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAll(): Promise<VaccineEntity[]> {
        return this.vaccineService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findById(@Param("id") id: number): Promise<VaccineEntity> {
        return this.vaccineService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    create(@Body() vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineService.create(vaccineEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    update(@Param("id") id: number, @Body() vaccineEntity: VaccineEntity): Promise<VaccineEntity> {
        return this.vaccineService.update(id, vaccineEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    delete(@Param("id") id: number): void {
        this.vaccineService.deleteById(id);
    }
}


