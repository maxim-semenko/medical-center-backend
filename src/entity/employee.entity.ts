import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";

@Entity("employee", {schema: "public"})
export class EmployeeEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "id"})
    id: number;

    @Column("character varying", {name: "firstname", length: 50})
    firstname: string;

    @Column("character varying", {name: "lastname", length: 50})
    lastname: string;

    @Column("character varying", {name: "speciality", length: 50})
    speciality: string;

    @Column("smallint", {name: "role_id"})
    roleId: number;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.employee)
    appointments: AppointmentEntity[];
}
