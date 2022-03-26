import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {MaxLength, MinLength, ValidateNested} from "class-validator";
import {UserAccessEntity} from "./userAccess.entity";

@Entity("employee", {schema: "public"})
export class EmployeeEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "id"})
    id: number;

    @Column("character varying", {name: "firstname", length: 50})
    @MinLength(1, {message: "Firstname is too short"})
    @MaxLength(50, {message: "Firstname is too long"})
    firstname: string;

    @Column("character varying", {name: "lastname", length: 50})
    @MinLength(1, {message: "Lastname is too short"})
    @MaxLength(50, {message: "Lastname is too long"})
    lastname: string;

    @Column("character varying", {name: "speciality", length: 50})
    @MaxLength(50, {message: "Speciality is too long"})
    speciality: string;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.employee)
    @ValidateNested()
    appointments: AppointmentEntity[];

    @OneToOne(() => UserAccessEntity, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "access_id", referencedColumnName: "id"}])
    @ValidateNested()
    access: UserAccessEntity;
}
