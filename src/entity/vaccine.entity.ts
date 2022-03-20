import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {MaxLength, MinLength, ValidateNested} from "class-validator";

@Entity("vaccine", {schema: "public"})
export class VaccineEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "vaccine_id"})
    id: number;

    @Column("character varying", {name: "name", length: 50})
    @MinLength(4, {message: "Vaccine name is too short"})
    @MaxLength(50, {message: "Vaccine name is too long"})
    name: string;

    @Column("character varying", {name: "description", length: 200, nullable: true})
    @MaxLength(200, {message: "Vaccine description is too long"})
    description: string;

    @ManyToMany(() => UserEntity, user => user.id, {cascade: true})
    @ValidateNested()
    users: UserEntity[];

}
