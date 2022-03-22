import {Test, TestingModule} from '@nestjs/testing';
import {MedicalCardEntity} from '../entity/medicalCard.entity';
import {MedicalCardController} from '../controller/medicalCard.controller';
import {MedicalCardService} from '../service/medicalCard.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('MedicalCardEntity', () => {
    let controller: MedicalCardController;
    let service: MedicalCardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicalCardController],
            providers: [
                MedicalCardService, {
                    provide: getRepositoryToken(MedicalCardEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        controller = module.get<MedicalCardController>(MedicalCardController);
        service = module.get<MedicalCardService>(MedicalCardService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it(`/should find user medicalCard/`, async () => {
        const medicalCard_1: MedicalCardEntity = new MedicalCardEntity();
        const medicalCard_2: MedicalCardEntity = new MedicalCardEntity();
        medicalCard_1.id = 1;
        medicalCard_1.description = "test_description";
        medicalCard_2.id = 2;
        medicalCard_2.description = "test_description_1";
        let medicalCard: Array<MedicalCardEntity>;
        medicalCard = [medicalCard_1, medicalCard_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await controller.findUserMedicalCard(1)).toBe(undefined);
    });

    it(`/should find employee medicalCard/`, async () => {
        const medicalCard_1: MedicalCardEntity = new MedicalCardEntity();
        const medicalCard_2: MedicalCardEntity = new MedicalCardEntity();
        medicalCard_1.id = 1;
        medicalCard_1.description = "test_description";
        medicalCard_2.id = 2;
        medicalCard_2.description = "test_description_1";
        let medicalCard: Array<MedicalCardEntity>;
        medicalCard = [medicalCard_1, medicalCard_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await controller.findAll()).toBe(medicalCard);
    });

    it('/Delete medicalCard/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(controller.delete(1)).toBe(undefined);
    });

    it(`/should find all medicalCard/`, async () => {
        const medicalCard_1: MedicalCardEntity = new MedicalCardEntity();
        const medicalCard_2: MedicalCardEntity = new MedicalCardEntity();
        medicalCard_1.id = 1;
        medicalCard_1.description = "test_description";
        medicalCard_2.id = 2;
        medicalCard_2.description = "test_description_1";
        let medicalCard: Array<MedicalCardEntity>;
        medicalCard = [medicalCard_1, medicalCard_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await controller.findAll()).toBe(medicalCard);
    });

    it(`/should update medicalCard/`, async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await controller.update(1, medicalCard)).toBe(medicalCard);
    });

    it(`/should create medicalCard/`, async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await controller.create(medicalCard)).toBe(medicalCard);
    });


    it('should find by id = 1', async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(service, 'findById').mockImplementation(async () => medicalCard);
        expect(await service.findById(1)).toBe(medicalCard);
    });


});

