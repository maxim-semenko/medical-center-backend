import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {DiseaseService} from '../service/disease.service';
import {DiseaseEntity} from "../entity/disease.entity";

@Controller('api/v1/diseases')
export class DiseaseController {
    constructor(private readonly diseaseService: DiseaseService) {
    }

    @Get()
    findAll(): Promise<DiseaseEntity[]> {
        return this.diseaseService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<DiseaseEntity> {
        return this.diseaseService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    create(@Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.create(diseaseEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: number, @Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.update(id, diseaseEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.diseaseService.deleteById(id);
    }
}


