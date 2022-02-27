import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_role", ["id"], { unique: true })
@Index("IXFK_role_user", ["id"], {})
@Entity("role", { schema: "public" })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 30 })
  name: string;
}
