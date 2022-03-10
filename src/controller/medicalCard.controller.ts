import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {MedicalCardService} from '../service/medicalCard.service';
import {MedicalCardEntity} from "../entity/medicalCard.entity";

@Controller('api/v1/medicalCards')
export class MedicalCardController {
    constructor(private readonly medicalCardService: MedicalCardService) {
    }

    @Get('/users/:userId')
    findUserMedicalCard(@Param("userId") userId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findUserMedicalCard(userId);
    }

    @Get('/employees/:employeeId')
    findEmployeeMedicalCard(@Param("employeeId") employeeId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findEmployeeMedicalCard(employeeId);
    }

    @Get()
    findAll(): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<MedicalCardEntity> {
        return this.medicalCardService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    create(@Body() medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardService.create(medicalCardEntity);
    }

    @Put('/:id')
    update(@Param("id") id: number, @Body() medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardService.update(id, medicalCardEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.medicalCardService.deleteById(id);
    }
}


