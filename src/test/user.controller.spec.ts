import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from '../controller/user.controller';
import {UserService} from '../service/user.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";

describe('UserController', () => {
    let userController: UserController;

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

    // describe('root', () => {
    //     it('should return "update user by id = 1"', () => {
    //         expect(userController.update(1)).toBe('update user by id = 1');
    //     });
    // });

    // describe('root', () => {
    //     it('should return "find user by id"', () => {
    //         expect(userController.findById()).toBe('find user by id');
    //     });
    // });
});
