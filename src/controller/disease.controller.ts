import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {DiseaseService} from '../service/disease.service';
import {DiseaseEntity} from "../entity/disease.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/diseases')
export class DiseaseController {
    constructor(private readonly diseaseService: DiseaseService) {
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAll(): Promise<DiseaseEntity[]> {
        return this.diseaseService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findById(@Param("id") id: number): Promise<DiseaseEntity> {
        return this.diseaseService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    create(@Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.create(diseaseEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    update(@Param("id") id: number, @Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.update(id, diseaseEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR, ROLE.DOCTOR]))
    delete(@Param("id") id: number): void {
        this.diseaseService.deleteById(id);
    }
}


