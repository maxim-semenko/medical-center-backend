import { Test, TestingModule } from '@nestjs/testing';
import { RoleEntity } from 'src/entity/role.entity';
import { RoleController } from '../controller/role.controller';
import { RoleService } from '../service/role.service';

describe('RoleEntity', () => {
    let roleController: RoleController;
    let roleEntity:RoleEntity;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [RoleService],
        }).compile();

        roleController = module.get<RoleController>(RoleController);
    });
    
    it('should be defined', () => {
        expect(RoleController).toBeDefined();
    });

    it('should create a roleController', () => {
        expect(roleController.create(roleEntity));
    });

    it('should find all(not null)', () => {
        expect(roleController.findAll());
    });

    it('should find by id = 1', () => {
        expect(roleController.findById(1));
    });

    it('should delete by id = 4', () => {
        expect(roleController.delete(4));
    });
});


