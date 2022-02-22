import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Index("PK_vaccinate", ["userId", "vaccineId"], { unique: true })
@Index("IXFK_vaccinate_user", ["vaccineId"], {})
@Entity("m2m_user_vaccine", { schema: "public" })
export class M2mUserVaccineEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("integer", { primary: true, name: "vaccine_id" })
  vaccineId: number;

  @ManyToOne(() => UserEntity, (user) => user.m2mUserVaccines)
  @JoinColumn([{ name: "vaccine_id", referencedColumnName: "id" }])
  vaccine: UserEntity;
}
