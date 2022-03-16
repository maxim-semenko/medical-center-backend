import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity("vaccine", {schema: "public"})
export class VaccineEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "vaccine_id"})
    id: number;

    @Column("character varying", {name: "name", length: 50})
    name: string;

    @Column("character varying", {name: "description", length: 200, nullable: true})
    description: string;
}
