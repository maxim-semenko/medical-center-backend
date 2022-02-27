import {Controller,  Get} from '@nestjs/common';
import {VaccineService} from '../service/vaccine.service';
import {VaccineEntity} from "../entity/vaccine.entity";

@Controller('api/v1/vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService) {
    }

    @Get()
    findAll(): Promise<VaccineEntity[]> {
        return this.vaccineService.findAll();
    }
}


