import {Test, TestingModule} from '@nestjs/testing';
import {UserEntity} from '../entity/user.entity';
import {UserController} from '../controller/user.controller';
import {UserService} from '../service/user.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('UserEntity', () => {
    let controller: UserController;
    let service: UserService;

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

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('/Delete user/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(controller.delete(1)).toBe(undefined);
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
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await controller.findAll()).toBe(user);
    });

    it(`/should update user/`, async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await controller.update(1, user)).toBe(user);
    });

    it(`/should create user/`, async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(user);
        });
        expect(await controller.create(user)).toBe(user);
    });


    it('should find by id = 1', async () => {
        const user: UserEntity = new UserEntity();
        user.id = 1;
        user.lastname = "test_lastname";
        user.firstname = "test_firstname";
        jest.spyOn(service, 'findById').mockImplementation(async () => user);
        expect(await controller.findById(1)).toBe(user);
    });


});

