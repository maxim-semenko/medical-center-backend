import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp,} from "typeorm";
import {DiseaseEntity} from "./disease.entity";
import {AppointmentEntity} from "./appointment.entity";
import {UserEntity} from "./user.entity";

@Index("IXFK_medical_card_disease", ["diseaseId"], {})
@Index("IXFK_medical_card_reception", ["employeeId", "userId"], {})
@Index("PK_Table1", ["id"], {unique: true})
@Index("IXFK_medical_card_user", ["userId"], {})
@Entity("medical_card", {schema: "public"})
export class MedicalCardEntity {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id: string;

    @Column("integer", {name: "user_id"})
    userId: number | null;

    @Column("timestamp without time zone", {name: "start_date"})
    startDate: Timestamp;

    @Column("timestamp without time zone", {name: "end_date"})
    endDate: Timestamp;

    @Column("character varying", {
        name: "description",
        nullable: true,
        length: 250,
    })
    description: string | null;

    @Column("boolean", {name: "is_rehabilitation", nullable: true})
    isRehabilitation: boolean | null;

    @Column("integer", {name: "employee_id"})
    employeeId: number | null;

    @Column("boolean", {name: "is_confirmation"})
    isConfirmation: boolean;

    @Column("integer", {name: "disease_id"})
    diseaseId: number | null;

    @ManyToOne(() => DiseaseEntity, (disease) => disease.medicalCards, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "disease_id", referencedColumnName: "diseaseId"}])
    disease: DiseaseEntity;

    @ManyToOne(() => AppointmentEntity, (appointment) => appointment.medicalCards)
    @JoinColumn([
        {name: "employee_id", referencedColumnName: "employeeId"},
        {name: "user_id", referencedColumnName: "userId"},
    ])
    appointment: AppointmentEntity;

    @ManyToOne(() => UserEntity, (user) => user.medicalCards, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "user_id", referencedColumnName: "id"}])
    user: UserEntity;
}
