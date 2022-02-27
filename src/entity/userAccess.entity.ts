import {Column, Entity, Index} from "typeorm";

@Index("PK_user_access", ["userId"], {unique: true})
@Index("IXFK_user_access_employee", ["userId"], {})
@Index("IXFK_user_access_user", ["userId"], {})
@Entity("user_access", {schema: "public"})
export class UserAccessEntity {
    @Column("integer", {primary: true, name: "user_id"})
    userId: number;

    @Column("character varying", {name: "email", length: 50})
    email: string;

    @Column("character varying", {name: "hash_password", length: 150})
    hashPassword: string;
}
