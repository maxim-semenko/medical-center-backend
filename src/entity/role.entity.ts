import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("role", {schema: "public"})
export class RoleEntity {
    @PrimaryGeneratedColumn({type: "smallint", name: "id"})
    id: number;

    @Column("character varying", {name: "name", length: 30})
    name: string;
}
