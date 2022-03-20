import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {MedicalCardEntity} from "./medicalCard.entity";
import {MaxLength, MinLength, ValidateNested} from "class-validator";

@Entity("disease", {schema: "public"})
export class DiseaseEntity {
    @PrimaryGeneratedColumn({type: "integer", name: "disease_id"})
    diseaseId: number;

    @Column("character varying", {name: "name", length: 50})
    @MinLength(1, {message: "Disease name is too short"})
    @MaxLength(50, {message: "Disease name is too long"})
    name: string;

    @Column("character varying", {name: "description", length: 200, nullable: true})
    @MaxLength(200, {message: "Disease description is too long"})
    description: string;

    @OneToMany(() => MedicalCardEntity, (medicalCard) => medicalCard.disease)
    @ValidateNested()
    medicalCards: MedicalCardEntity[];
}
