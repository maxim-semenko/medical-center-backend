import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseEntity } from 'src/entity/disease.entity';
import { DiseaseController } from '../controller/disease.controller';
import { DiseaseService } from '../service/disease.service';

describe('DesaseEntity', () => {
    let diseaseController: DiseaseController;
    let diseaseEntity: DiseaseEntity;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DiseaseController],
            providers: [DiseaseService],
        }).compile();

        diseaseController = module.get<DiseaseController>(DiseaseController);
    });
    it('should be defined', () => {
        expect(DiseaseController).toBeDefined();
    });

    it('should create a diseaseController', () => {
        expect(diseaseController.create(diseaseEntity));
    });

    it('should find all(not null)', () => {
        expect(diseaseController.findAll());
    });

    it('should find by id = 1', () => {
        expect(diseaseController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(diseaseController.delete(4));
    });



});