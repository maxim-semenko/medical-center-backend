import {Controller,  Get} from '@nestjs/common';
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
}


