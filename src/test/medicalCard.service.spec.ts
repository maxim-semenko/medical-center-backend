import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCardEntity } from '../entity/medicalCard.entity';
import { MedicalCardController } from '../controller/medicalCard.controller';
import { MedicalCardService } from '../service/medicalCard.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { entityName } from 'typeorm-model-generator/dist/src/NamingStrategy';

describe('MedicalCardEntity', () => {
    let medicalCardController: MedicalCardController;
    let medicalCardService: MedicalCardService;

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

        medicalCardController = module.get<MedicalCardController>(MedicalCardController);
        medicalCardService = module.get<MedicalCardService>(MedicalCardService);
    });

    it('should be defined', () => {
        expect(medicalCardController).toBeDefined();
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
        jest.spyOn(medicalCardService, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await medicalCardController.findUserMedicalCard(1)).toStrictEqual(undefined);
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
        jest.spyOn(medicalCardService, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await medicalCardController.findAll()).toBe(medicalCard);
    });

    it('/Delete medicalCard/1', async () => {
        jest.spyOn(medicalCardService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(medicalCardController.delete(1)).toStrictEqual(undefined);
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
        jest.spyOn(medicalCardService, 'findAll').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await medicalCardController.findAll()).toStrictEqual(medicalCard);
    });

    it(`/should update medicalCard/`, async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(medicalCardService, 'update').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await medicalCardController.update(1, medicalCard)).toStrictEqual(medicalCard);
    });

    it(`/should create medicalCard/`, async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(medicalCardService, 'create').mockImplementation(() => {
            return Promise.resolve(medicalCard);
        });
        expect(await medicalCardController.create(medicalCard)).toStrictEqual(medicalCard);
    });



    it('should find by id = 1', async () => {
        const medicalCard: MedicalCardEntity = new MedicalCardEntity();
        medicalCard.id = 1;
        medicalCard.description = "test_description";
        jest.spyOn(medicalCardService, 'findById').mockImplementation(async () => medicalCard);
        expect(await medicalCardService.findById(1)).toStrictEqual(medicalCard);
    });


});

