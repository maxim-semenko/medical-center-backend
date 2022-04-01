import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, MaxLength, MinLength} from "class-validator";

@Entity("user_access", {schema: "public"})
export class UserAccessEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "id"})
    @Column("integer", {primary: true, unique: true, name: "id"})
    id: number;

    @Column("character varying", {name: "email", length: 50, unique: true})
    @IsEmail({message: "Email is not correct"})
    email: string;

    @Column("character varying", {name: "hash_password", length: 150})
    @MinLength(8, {message: "Password is too short"})
    @MaxLength(50, {message: "Password is too long"})
    hashPassword: string;

    @Column("character varying", {name: "role_name", length: 30})
    @MinLength(1, {message: "Role name is too short"})
    @MaxLength(30, {message: "Role name is too long"})
    role: string;
}
