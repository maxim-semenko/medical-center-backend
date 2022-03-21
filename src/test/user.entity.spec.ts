import {UserEntity} from '../entity/user.entity';

describe('UserEntity', () => {
    let userEntity: UserEntity;

    beforeEach(async () => {
        userEntity = new UserEntity();
        userEntity.id = 4;
        userEntity.firstname = "test_firstname"
        userEntity.lastname = "test_lastname";
        userEntity.passport = "test_passport";
        userEntity.age = 27;
        userEntity.bloodType = "AB+";
        userEntity.roleId = 5;
        userEntity.medicalCards=null;
        userEntity.vaccine=null;
        userEntity.appointments=null;
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
    
    describe('root', () => {
        it('should return "lastname = test_lastname"', () => {
            expect(userEntity.lastname).toBe("test_lastname");
        });
    });
    describe('root', () => {
        it('should return "passport = test_passport"', () => {
            expect(userEntity.passport).toBe("test_passport");
        });
    });

    describe('root', () => {
        it('should return "age = 27"', () => {
            expect(userEntity.age).toBe(27);
        });
    });

    describe('root', () => {
        it('should return "blood_type = AB+"', () => {
            expect(userEntity.bloodType).toBe("AB+");
        });
    });

   describe('root', () => {
        it('should return "role_id = 5"', () => {
            expect(userEntity.roleId).toBe(5);
        });
    });

    describe('root', () => {
        it('should return "medicalCards = "null"', () => {
            expect(userEntity.roleId).toBe(null);
        });
    });

    describe('root', () => {
        it('should return "vaccine = "null"', () => {
            expect(userEntity.vaccine).toBe(null);
        });
    });

    describe('root', () => {
        it('should return "appointments = "null"', () => {
            expect(userEntity.appointments).toBe(null);
        });
    });


});
