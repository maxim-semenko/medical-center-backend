import {UserEntity} from '../entity/user.entity';

describe('UserEntity', () => {
    let userEntity: UserEntity;

    beforeEach(async () => {
        userEntity = new UserEntity();
        userEntity.id = 4;
        userEntity.firstname = "test_firstname"
    });

    describe('root', () => {
        it('should return "id = 4"', () => {
            expect(userEntity.id).toBe(4);
        });
    });

    describe('root', () => {
        it('should return "firstname = test_firstname"', () => {
            expect(userEntity.firstname).toBe("test_firstname");
        });
    });

});
