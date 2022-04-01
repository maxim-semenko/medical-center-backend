import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {MedicalCardService} from '../service/medicalCard.service';
import {MedicalCardEntity} from "../entity/medicalCard.entity";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/medicalCards')
export class MedicalCardController {
    constructor(private readonly medicalCardService: MedicalCardService) {
    }

    @Get('/users/:userId')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findUserMedicalCard(@Param("userId") userId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findUserMedicalCard(userId);
    }

    @Get('/employees/:employeeId')
    @UseGuards(new JwtAuthGuard([ROLE.DOCTOR, ROLE.HEAD_DOCTOR]))
    findEmployeeMedicalCard(@Param("employeeId") employeeId: number): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findEmployeeMedicalCard(employeeId);
    }

    @Get()
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findAll(): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findAll();
    }

    @Get('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.PERMIT_ALL]))
    findById(@Param("id") id: number): Promise<MedicalCardEntity> {
        return this.medicalCardService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.DOCTOR, ROLE.HEAD_DOCTOR]))
    create(@Body() medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardService.create(medicalCardEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard([ROLE.DOCTOR, ROLE.HEAD_DOCTOR]))
    update(@Param("id") id: number, @Body() medicalCardEntity: MedicalCardEntity): Promise<MedicalCardEntity> {
        return this.medicalCardService.update(id, medicalCardEntity);
    }

    @Delete('/:id')
    @UseGuards(new JwtAuthGuard([ROLE.DOCTOR, ROLE.HEAD_DOCTOR]))
    delete(@Param("id") id: number): void {
        this.medicalCardService.deleteById(id);
    }
}


