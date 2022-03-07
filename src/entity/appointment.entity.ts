import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp,} from "typeorm";
import {EmployeeEntity} from "./employee.entity";
import {UserEntity} from "./user.entity";
import {MedicalCardEntity} from "./medicalCard.entity";

@Entity("appointment", {schema: "public"})
export class AppointmentEntity {

    @PrimaryGeneratedColumn({type: "integer", name: "appointment_id"})
    appointmentId: number;

    @Column("integer", {primary: true, name: "employee_id", unique: true})
    employeeId: number;

    @Column("integer", {primary: true, name: "user_id", unique: true})
    userId: number;

    @Column('timestamp without time zone', {
        name: 'start_date',
        nullable: true,
    })
    startDate: Timestamp;

    @Column("timestamp without time zone", {name: "end_date"})
    endDate: Timestamp;

    @Column("character varying", {
        name: "description",
        nullable: true,
        length: 150,
    })
    description: string | null;

    @ManyToOne(() => EmployeeEntity, (employee) => employee.appointments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "employee_id", referencedColumnName: "id"}])
    employee: EmployeeEntity;

    @ManyToOne(() => UserEntity, (user) => user.appointments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "user_id", referencedColumnName: "id"}])
    user: UserEntity;

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.appointment)
    medicalCards: MedicalCardEntity[];
}
