import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp,} from "typeorm";
import {DiseaseEntity} from "./disease.entity";
import {AppointmentEntity} from "./appointment.entity";
import {UserEntity} from "./user.entity";
import {EmployeeEntity} from "./employee.entity";
import {IsBoolean, IsDate, IsInt, MaxLength, ValidateNested} from "class-validator";

@Entity("medical_card", {schema: "public"})
export class MedicalCardEntity {
    @PrimaryGeneratedColumn({type: "bigint", name: "id"})
    id: number;

    @Column("timestamp without time zone", {name: "start_date"})
    // @IsDate({message: "Start date is not correct"})
    startDate: Timestamp;

    @Column("timestamp without time zone", {name: "end_date"})
    // @IsDate({message: "End date is not correct"})
    endDate: Timestamp;

    @Column("character varying", {
        name: "description",
        nullable: true,
        length: 250,
    })
    @MaxLength(250, {message: "medical card description is too long"})
    description: string | null;

    @Column("boolean", {name: "is_rehabilitation", nullable: true})
    @IsBoolean({message: "Rehabilitation status is incorrect"})
    isRehabilitation: boolean | null;

    @Column("boolean", {name: "is_confirmation"})
    @IsBoolean({message: "Confirmation status is incorrect"})
    isConfirmation: boolean;

    @Column("integer", {name: "disease_id"})
    // @IsInt({message: "Disease id is not number"})
    diseaseId: number | null;

    @ManyToOne(() => DiseaseEntity, (disease) => disease.medicalCards, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "disease_id", referencedColumnName: "diseaseId"}])
    @ValidateNested()
    disease: DiseaseEntity;

    @ManyToOne(() => AppointmentEntity, (appointment) => appointment.medicalCards)
    @JoinColumn([{name: "appointment_id", referencedColumnName: "id"}])
    @ValidateNested()
    appointment: AppointmentEntity;

    @ManyToOne(() => UserEntity, (user) => user.medicalCards, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "user_id", referencedColumnName: "id"}])
    @ValidateNested()
    user: UserEntity;

    @ManyToOne(() => EmployeeEntity, (employee) => employee.appointments, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{name: "employeeId", referencedColumnName: "id"}])
    @ValidateNested()
    employee: EmployeeEntity;
}
