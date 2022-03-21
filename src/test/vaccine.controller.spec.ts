import { Test, TestingModule } from '@nestjs/testing';
import { VaccineEntity } from 'src/entity/vaccine.entity';
import { VaccineController } from '../controller/vaccine.controller';
import { VaccineService } from '../service/vaccine.service';

describe('VaccineEntity', () => {
    let vaccineController: VaccineController;
    let vaccineEntity:VaccineEntity;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VaccineController],
            providers: [VaccineService],
        }).compile();

        vaccineController = module.get<VaccineController>(VaccineController);
    });
    it('should be defined', () => {
        expect(VaccineController).toBeDefined();
    });

    it('should be defined', () => {
        expect(vaccineController).toBeDefined();
    });
    it('should create a vaccineController', () => {
        expect(vaccineController.create(vaccineEntity));
    });

    it('should find all(not null)', () => {
        expect(vaccineController.findAll());
    });

    it('should find by id = 1', () => {
        expect(vaccineController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(vaccineController.delete(4));
    });
});

