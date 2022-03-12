import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity("vaccine", {schema: "public"})
export class VaccineEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "vaccine_id"})
    vaccineId: number;

    @Column("character varying", {name: "name", length: 50})
    name: string;

    @Column("character varying", {name: "description", length: 200, nullable: true})
    description: string;

    @ManyToMany(() => UserEntity, users => users.id)
    users: UserEntity[];
}
