import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {MedicalCardEntity} from "./medicalCard.entity";
import {VaccineEntity} from "./vaccine.entity";

@Entity("user", {schema: "public"})
export class UserEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "id"})
    id: number;

    @Column("character varying", {name: "firstname", length: 50})
    firstname: string;

    @Column("character varying", {name: "lastname", length: 50})
    lastname: string;

    @Column("character varying", {name: "passport", length: 50, unique: true})
    passport: string;

    @Column("smallint", {name: "age"})
    age: number;

    @Column("character varying", {name: "blood_type", length: 50, nullable: true})
    bloodType: string;

    @Column("smallint", {name: "role_id"})
    roleId: number;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.userEntity, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    appointments: AppointmentEntity[];

    @ManyToMany(() => VaccineEntity, vaccine => vaccine.id, {cascade: true})
    @JoinTable({
        name: 'user_vaccine',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'vaccine_id', referencedColumnName: 'id'},
    })
    vaccine: VaccineEntity[];

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    medicalCards: MedicalCardEntity[];
}
