import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {IsInt, MaxLength, MinLength, ValidateNested} from "class-validator";

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

    @Column("smallint", {name: "role_id"})
    @IsInt({message: "Role id is not number"})
    roleId: number;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.employee)
    @ValidateNested()
    appointments: AppointmentEntity[];
}
