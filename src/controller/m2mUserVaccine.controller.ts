import {Controller,  Get} from '@nestjs/common';
import {M2mUserVaccineService} from '../service/m2mUserVaccine.service';
import {M2mUserVaccineEntity} from "../entity/m2mUserVaccine.entity";

@Controller('api/v1/m2mUserVaccine')
export class M2mUserVaccineController {
    constructor(private readonly m2mUserVaccineService: M2mUserVaccineService) {
    }

    @Get()
    findAll(): Promise<M2mUserVaccineEntity[]> {
        return this.m2mUserVaccineService.findAll();
    }
}


