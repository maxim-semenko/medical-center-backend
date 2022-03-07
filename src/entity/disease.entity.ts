import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {MedicalCardEntity} from "./medicalCard.entity";

@Entity("disease", {schema: "public"})
export class DiseaseEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "disease_id"})
    diseaseId: number;

    @Column("character varying", {name: "name", length: 50})
    name: string;

    @Column("character varying", {name: "description", length: 200, nullable: true})
    description: string;

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.disease)
    medicalCards: MedicalCardEntity[];
}
