import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiseaseEntity} from "../entity/disease.entity";
import {DiseaseController} from "../controller/disease.controller";
import {DiseaseService} from "../service/disease.service";

@Module({
    imports: [TypeOrmModule.forFeature([DiseaseEntity])],
    controllers: [DiseaseController],
    providers: [DiseaseService],
})
export class DiseaseModule {
}


