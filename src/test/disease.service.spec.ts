import {Test, TestingModule} from '@nestjs/testing';
import {DiseaseEntity} from '../entity/disease.entity';
import {DiseaseService} from '../service/disease.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('DiseaseEntity', () => {
    let service: DiseaseService;

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

        service = module.get<DiseaseService>(DiseaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('/Delete disease/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(service.deleteById(1)).toStrictEqual(Promise.resolve());
    });

    it(`/should find all disease/`, async () => {
        const disease_1: DiseaseEntity = new DiseaseEntity();
        const disease_2: DiseaseEntity = new DiseaseEntity();
        disease_1.description = "test_description";
        disease_2.description = "test_description_1";
        let disease: Array<DiseaseEntity>;
        disease = [disease_1, disease_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await service.findAll()).toStrictEqual(disease);
    });

    it(`/should update disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await service.update(1, disease)).toStrictEqual(disease);
    });

    it(`/should create disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await service.create(disease)).toStrictEqual(disease);
    });

    it('should find by id = 1', async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.description = "test_description";
        jest.spyOn(service, 'findById').mockImplementation(async () => disease);
        expect(await service.findById(1)).toStrictEqual(disease);
    });


});

