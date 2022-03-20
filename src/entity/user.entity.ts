import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AppointmentEntity} from "./appointment.entity";
import {MedicalCardEntity} from "./medicalCard.entity";
import {VaccineEntity} from "./vaccine.entity";
import {IsInt, Length, Max, MaxLength, Min, MinLength, ValidateNested} from "class-validator";

@Entity("user", {schema: "public"})
export class UserEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "id"})
    id: number;

    @Column("character varying", {name: "firstname", length: 50})
    @MinLength(1, {message: "Firstname is too short"})
    @MaxLength(50, {message: "Firstname is too long"})
    firstname: string;

    @Column("character varying", {name: "lastname", length: 50})
    @Length(1, 50)
    @MinLength(1, {message: "Lastname is too short"})
    @MaxLength(50, {message: "Lastname is too long"})
    lastname: string;

    @Column("character varying", {name: "passport", length: 50, unique: true})
    @MinLength(8, {message: "Passport is too short"})
    @MaxLength(50, {message: "Passport is too long"})
    passport: string;

    @Column("smallint", {name: "age"})
    @IsInt()
    @Min(0, {message: "Age less than 0"})
    @Max(125, {message: "Age more than 125"})
    age: number;

    @Column("character varying", {name: "blood_type", length: 50, nullable: true})
    @MaxLength(50, {message: "Blood type is too long"})
    bloodType: string;

    @Column("smallint", {name: "role_id"})
    @IsInt()
    roleId: number;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.userEntity, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @ValidateNested()
    appointments: AppointmentEntity[];

    @ManyToMany(() => VaccineEntity, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @ValidateNested()
    @JoinTable({name: 'user_vaccine'})
    vaccine: VaccineEntity[];

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @ValidateNested()
    medicalCards: MedicalCardEntity[];
}
