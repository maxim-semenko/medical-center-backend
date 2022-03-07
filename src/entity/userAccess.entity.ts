import {Column, Entity} from "typeorm";

@Entity("user_access", {schema: "public"})
export class UserAccessEntity {
    @Column("integer", {primary: true, name: "user_id"})
    userId: number;

    @Column("character varying", {name: "email", length: 50, unique: true})
    email: string;

    @Column("character varying", {name: "hash_password", length: 150})
    hashPassword: string;
}
