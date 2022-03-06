import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
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
    create(@Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.create(diseaseEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() diseaseEntity: DiseaseEntity): Promise<DiseaseEntity> {
        return this.diseaseService.update(id, diseaseEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.diseaseService.deleteById(id);
    }
}


