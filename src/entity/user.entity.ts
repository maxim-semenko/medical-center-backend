import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {M2mUserVaccineEntity} from "./m2mUserVaccine.entity";
import {MedicalCardEntity} from "./medicalCard.entity";

@Index("PK_User", ["id"], {unique: true})
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

    @Column("character varying", {name: "blood_type", length: 50, nullable:true})
    bloodType: string;

    @Column("smallint", {name: "role_id"})
    roleId: number;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    appointments: AppointmentEntity[];

    @OneToMany(() => M2mUserVaccineEntity, (m2mUserVaccine) => m2mUserVaccine.vaccine, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    m2mUserVaccines: M2mUserVaccineEntity[];

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    medicalCards: MedicalCardEntity[];
}
