import {Test, TestingModule} from '@nestjs/testing';
import {VaccineEntity} from '../entity/vaccine.entity';
import {VaccineController} from '../controller/vaccine.controller';
import {VaccineService} from '../service/vaccine.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('VaccineEntity', () => {
    let vaccineController: VaccineController;
    let vaccineService: VaccineService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VaccineController],
            providers: [
                VaccineService, {
                    provide: getRepositoryToken(VaccineEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        vaccineController = module.get<VaccineController>(VaccineController);
        vaccineService = module.get<VaccineService>(VaccineService);
    });

    it('should be defined', () => {
        expect(vaccineService).toBeDefined();
    });

    it('/Delete vaccine/1', async () => {
        jest.spyOn(vaccineService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(vaccineController.delete(1)).toStrictEqual(undefined);
    });

    it(`/should find all vaccine/`, async () => {
        const vaccine_1: VaccineEntity = new VaccineEntity();
        const vaccine_2: VaccineEntity = new VaccineEntity();
        vaccine_1.id = 1;
        vaccine_1.description = "test_description";
        vaccine_2.id = 2;
        vaccine_2.description = "test_description";
        let vaccine: Array<VaccineEntity>;
        vaccine = [vaccine_1, vaccine_2];
        jest.spyOn(vaccineService, 'findAll').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await vaccineController.findAll()).toStrictEqual(vaccine);
    });

    it(`/should update vaccine/`, async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(vaccineService, 'update').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await vaccineController.update(1, vaccine)).toStrictEqual(vaccine);
    });

    it(`/should create vaccine/`, async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(vaccineService, 'create').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await vaccineController.create(vaccine)).toStrictEqual(vaccine);
    });

    it('should find by id = 1', async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(vaccineService, 'findById').mockImplementation(async () => vaccine);
        expect(await vaccineService.findById(1)).toStrictEqual(vaccine);
    });

});


