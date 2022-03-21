import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCardEntity } from 'src/entity/medicalCard.entity';
import { MedicalCardController } from '../controller/medicalCard.controller';
import { MedicalCardService } from '../service/medicalCard.service';

describe('MedicalCardEntity', () => {
   let medicalCardController: MedicalCardController;
   let medicalCardEntity: MedicalCardEntity;
   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [MedicalCardController],
         providers: [MedicalCardService],
      }).compile();

      medicalCardController = module.get<MedicalCardController>(MedicalCardController);
   });
   it('should be defined', () => {
      expect(MedicalCardController).toBeDefined();
   });

   it('should create a appointment', () => {
      expect(medicalCardController.create(medicalCardEntity))
   });

   it('should find userMedicalCard by id=4', () => {
      expect(medicalCardController.findUserMedicalCard(4));
   });

   it('should find all(not null)', () => {
      expect(medicalCardController.findAll());
   });

   it('should find by id = 1', () => {
      expect(medicalCardController.findById(1));
   });

   it('should delete by id = 4', () => {
      expect(medicalCardController.delete(4));
   });

   it('should return "update user by id = 1"', () => {
      expect(medicalCardController.update(1, medicalCardEntity));
   });

});

