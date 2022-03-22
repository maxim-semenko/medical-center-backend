import {Test, TestingModule} from '@nestjs/testing';
import {VaccineEntity} from '../entity/vaccine.entity';
import {VaccineController} from '../controller/vaccine.controller';
import {VaccineService} from '../service/vaccine.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('VaccineEntity', () => {
    let service: VaccineService;

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

        service = module.get<VaccineService>(VaccineService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('/Delete vaccine/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(service.deleteById(1)).toStrictEqual(Promise.resolve());
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
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await service.findAll()).toStrictEqual(vaccine);
    });

    it(`/should update vaccine/`, async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await service.update(1, vaccine)).toStrictEqual(vaccine);
    });

    it(`/should create vaccine/`, async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(vaccine);
        });
        expect(await service.create(vaccine)).toStrictEqual(vaccine);
    });

    it('should find by id = 1', async () => {
        const vaccine: VaccineEntity = new VaccineEntity();
        vaccine.id = 1;
        vaccine.description = "test_description";
        jest.spyOn(service, 'findById').mockImplementation(async () => vaccine);
        expect(await service.findById(1)).toStrictEqual(vaccine);
    });

});


