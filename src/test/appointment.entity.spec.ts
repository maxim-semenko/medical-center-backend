import { Timestamp } from 'typeorm';
import { AppointmentEntity } from '../entity/appointment.entity';

describe('UserEntity', () => {
    let appointmentEntity: AppointmentEntity;
    beforeEach(async () => {
        appointmentEntity = new AppointmentEntity();
        appointmentEntity.medicalCards = null;
        appointmentEntity.endDate = ;
        appointmentEntity.startDate = ;
        appointmentEntity.userEntity = null;
        appointmentEntity.employee = null;
        appointmentEntity.description = "test_description"
        appointmentEntity.id = 5;
    });

    describe('root', () => {
        it('should return "id = 5"', () => {
            expect(appointmentEntity.id).toBe(5);
        });
    });

    describe('root', () => {
        it('should return medical card', () => {
            expect(appointmentEntity.medicalCards).toBe(null);
        });
    });

    describe('root', () => {
        it('should return employee', () => {
            expect(appointmentEntity.employee).toBe(null);
        });
    });

    describe('root', () => {
        it('should return description "test_description"', () => {
            expect(appointmentEntity.medicalCards).toBe(5);
        });
    });

    describe('root', () => {
        it('should return startDate', () => {
            expect(appointmentEntity.startDate).toBe();
        });
    });

    describe('root', () => {
        it('should return endDate', () => {
            expect(appointmentEntity.endDate).toBe();
        });
    });



});
