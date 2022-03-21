import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsInt, MaxLength, MinLength} from "class-validator";

@Entity("role", {schema: "public"})
export class RoleEntity {
    @PrimaryGeneratedColumn({type: "smallint", name: "id"})
    id: number;

    @Column("character varying", {name: "name", length: 30})
    @MinLength(1, {message: "Role name is too short"})
    @MaxLength(30, {message: "Role name is too long"})
    name: string;
}
