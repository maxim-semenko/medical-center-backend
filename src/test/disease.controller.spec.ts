import {Test, TestingModule} from '@nestjs/testing';
import {DiseaseEntity} from '../entity/disease.entity';
import {DiseaseController} from '../controller/disease.controller';
import {DiseaseService} from '../service/disease.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('DiseaseEntity', () => {
    let controller: DiseaseController;
    let service: DiseaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DiseaseController],
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

        controller = module.get<DiseaseController>(DiseaseController);
        service = module.get<DiseaseService>(DiseaseService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('/Delete disease/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(controller.delete(1)).toBe(undefined);
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
        expect(await controller.findAll()).toBe(disease);
    });

    it(`/should update disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await controller.update(1, disease)).toBe(disease);
    });

    it(`/should create disease/`, async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.diseaseId = 1;
        disease.description = "test_description";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(disease);
        });
        expect(await controller.create(disease)).toBe(disease);
    });

    it('should find by id = 1', async () => {
        const disease: DiseaseEntity = new DiseaseEntity();
        disease.description = "test_description";
        jest.spyOn(service, 'findById').mockImplementation(async () => disease);
        expect(await controller.findById(1)).toBe(disease);
    });


});

