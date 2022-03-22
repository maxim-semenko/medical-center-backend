import {Test, TestingModule} from '@nestjs/testing';
import {UserEntity} from '../entity/user.entity';
import {UserController} from '../controller/user.controller';
import {UserService} from '../service/user.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('UserEntity', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService, {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('/Delete user/1', async () => {
        jest.spyOn(userService, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(userController.delete(1)).toStrictEqual(undefined);
    });

    it(`/should find all user/`, async () => {
        const user_1: UserEntity = new UserEntity();
        const user_2: UserEntity = new UserEntity();
        user_1.id = 1;
        user_1.lastname = "test_lastname";
        user_1.firstname = "test_firstname";
        user_2.id = 2;
        user_2.lastname = "test_lastname";
        user_2.firstname = "test_firstname";
        let user: Array<UserEntity>;
        user = [user_1, user_2];
        jest.spyOn(userService, 'findAll').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await userController.findAll()).toStrictEqual(user);
    });

    it(`/should update user/`, async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        jest.spyOn(userService, 'update').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await userController.update(1, user)).toStrictEqual(user);
    });

    it(`/should create user/`, async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        jest.spyOn(userService, 'create').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await userController.create(user)).toStrictEqual(user);
    });


    it('should find by id = 1', async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        user.firstname = "test_firstname";
        jest.spyOn(userService, 'findById').mockImplementation(async () => user);
        expect(await userService.findById(1)).toStrictEqual(user);
    });


});

