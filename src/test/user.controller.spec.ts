import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from '../controller/user.controller';
import {UserService} from '../service/user.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";

describe('UserController', () => {
    let userController: UserController;
    let userEntity: UserEntity;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, {
                provide: getRepositoryToken(UserEntity),
                useValue: {},
            },],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

        it('should return "update user by id = 1"', () => {
             expect(userController.update(1,userEntity)).toBe('update user by id = 1');
         });

         it('should create a user', () => {
        expect(userController.create(userEntity))
     });

     it('should find all(not null)', () => {
        expect(userController.findAll())
     });

     it('should find all', () => {
        expect(userController.findById(1))
     });

     it('should find all', () => {
        expect(userController.delete(4))
     });
});
