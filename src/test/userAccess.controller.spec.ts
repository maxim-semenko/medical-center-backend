import { Test, TestingModule } from '@nestjs/testing';
import { UserAccessEntity } from 'src/entity/userAccess.entity';
import { UserAccessController } from '../controller/userAccess.controller';
import { UserAccessService } from '../service/userAccess.service';

describe('UserAccessEntity', () => {
    let userAccessController: UserAccessController;
    let userAccessEntity:UserAccessEntity;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserAccessController],
            providers: [UserAccessService],
        }).compile();

        userAccessController = module.get<UserAccessController>(UserAccessController);
    });
    it('should be defined', () => {
        expect(UserAccessController).toBeDefined();
    });
    it('should create a userAccessController', () => {
        expect(userAccessController.create(userAccessEntity));
    });

    it('should find all(not null)', () => {
        expect(userAccessController.findAll());
    });

    it('should find by id = 1', () => {
        expect(userAccessController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(userAccessController.delete(4));
    });
});

