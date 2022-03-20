import {Column, Entity} from "typeorm";
import {IsEmail, IsNumber, MaxLength, MinLength} from "class-validator";

@Entity("user_access", {schema: "public"})
export class UserAccessEntity {
    @Column("integer", {primary: true, name: "user_id"})
    @IsNumber()
    userId: number;

    @Column("character varying", {name: "email", length: 50, unique: true})
    @IsEmail({message: "Email is not correct"})
    email: string;

    @Column("character varying", {name: "hash_password", length: 150})
    @MinLength(8, {message: "Password is too short"})
    @MaxLength(50, {message: "Password is too long"})
    hashPassword: string;
}
