import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_vaccine_m2m_user_vaccine", ["vaccineId"], {})
@Index("vaccine_pk", ["vaccineId"], { unique: true })
@Entity("vaccine", { schema: "public" })
export class VaccineEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "vaccine_id" })
  vaccineId: number;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("character varying", { name: "description", length: 200 })
  description: string;
}
