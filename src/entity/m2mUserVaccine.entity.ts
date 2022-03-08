import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import {VaccineEntity} from "./vaccine.entity";

@Entity("m2m_user_vaccine", {schema: "public"})
export class M2mUserVaccineEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "user_id"})
    userId: number;

    @Column("integer", {name: "vaccine_id"})
    vaccineId: number;

    @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.vaccineId)
    @JoinColumn([{name: "vaccine_id", referencedColumnName: "vaccineId"}])
    vaccine: VaccineEntity;

}
