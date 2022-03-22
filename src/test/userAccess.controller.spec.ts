import {Test, TestingModule} from '@nestjs/testing';
import {UserAccessEntity} from '../entity/userAccess.entity';
import {UserAccessController} from '../controller/userAccess.controller';
import {UserAccessService} from '../service/userAccess.service';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('UserAccessEntity', () => {
    let controller: UserAccessController;
    let service: UserAccessService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserAccessController],
            providers: [
                UserAccessService, {
                    provide: getRepositoryToken(UserAccessEntity),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                    },
                }
            ],
        }).compile();

        controller = module.get<UserAccessController>(UserAccessController);
        service = module.get<UserAccessService>(UserAccessService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('/Delete userAccess/1', async () => {
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve());
        expect(controller.delete(1)).toBe(undefined);
    });

    it(`/should find all userAccess/`, async () => {
        const userAccess_1: UserAccessEntity = new UserAccessEntity();
        const userAccess_2: UserAccessEntity = new UserAccessEntity();
        userAccess_1.userId = 1;
        userAccess_1.email = "test_email";
        userAccess_2.userId = 2;
        userAccess_2.email = "test_email";
        let userAccess: Array<UserAccessEntity>;
        userAccess = [userAccess_1, userAccess_2];
        jest.spyOn(service, 'findAll').mockImplementation(() => {
            return Promise.resolve(userAccess);
        });
        expect(await controller.findAll()).toBe(userAccess);
    });

    it(`/should update userAccess/`, async () => {
        const userAccess: UserAccessEntity = new UserAccessEntity();
        userAccess.userId = 1;
        userAccess.email = "test_email";
        jest.spyOn(service, 'update').mockImplementation(() => {
            return Promise.resolve(userAccess);
        });
        expect(await controller.update(1, userAccess)).toBe(userAccess);
    });

    it(`/should create userAccess/`, async () => {
        const userAccess: UserAccessEntity = new UserAccessEntity();
        userAccess.userId = 1;
        userAccess.email = "test_email";
        jest.spyOn(service, 'create').mockImplementation(() => {
            return Promise.resolve(userAccess);
        });
        expect(await controller.create(userAccess)).toBe(userAccess);
    });

    it('should find by id = 1', async () => {
        const userAccess: UserAccessEntity = new UserAccessEntity();
        userAccess.userId = 1;
        userAccess.email = "test_email";
        jest.spyOn(service, 'findById').mockImplementation(async () => userAccess);
        expect(await controller.findById(1)).toBe(userAccess);
    });

});


