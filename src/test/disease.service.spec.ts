import {Test, TestingModule} from '@nestjs/testing';
import {DiseaseEntity} from '../entity/disease.entity';
import {DiseaseService} from '../service/disease.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('DiseaseEntity', () => {
    let diseaseService: DiseaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiseaseService, {
                    provide: getRepositoryToken(DiseaseEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        diseaseService = module.get<DiseaseService>(DiseaseService);
    });

    it('should be defined', () => {
        expect(diseaseService).toBeDefined();
    });

    it('/Delete disease/1', async () => {
        jest.spyOn(diseaseService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(diseaseService.deleteById(1)).toStrictEqual(Promise.resolve());
    });

    it(`/should find all disease/`, async () => {
        const disease_1: DiseaseEntity = new DiseaseEntity();
        const disease_2: DiseaseEntity = new DiseaseEntity();
        disease_1.description = "test_description";
        disease_2.description = "test_description_1";
        let disease: Array<DiseaseEntity>;
        disease = [disease_1, disease_2];
        jest.spyOn(diseaseService, 'findAll').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await diseaseService.findAll()).toStrictEqual(disease);
    });

    it(`/should update disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(diseaseService, 'update').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await diseaseService.update(1, disease)).toStrictEqual(disease);
    });

    it(`/should create disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(diseaseService, 'create').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await diseaseService.create(disease)).toStrictEqual(disease);
    });

    it('should find by id = 1', async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.description = "test_description";
        jest.spyOn(diseaseService, 'findById').mockImplementation(async () => disease);
        expect(await diseaseService.findById(1)).toStrictEqual(disease);
    });


});

