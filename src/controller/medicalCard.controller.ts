import {Controller,  Get} from '@nestjs/common';
import {MedicalCardService} from '../service/medicalCard.service';
import {MedicalCardEntity} from "../entity/medicalCard.entity";

@Controller('api/v1/medicalCards')
export class MedicalCardController {
    constructor(private readonly medicalCardService: MedicalCardService) {
    }

    @Get()
    findAll(): Promise<MedicalCardEntity[]> {
        return this.medicalCardService.findAll();
    }
}


