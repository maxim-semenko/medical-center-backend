import {Timestamp} from "typeorm";
import {EmployeeEntity} from "../entity/employee.entity";

export class UserHistoryReport {

    id: number;

    userPassport;

    startDate: Timestamp;

    endDate: Timestamp;

    description: string;

    isRehabilitation: boolean;

    isConfirmation: boolean;

    diseaseName: string;

    employeeId: number;

    employeeLastname: EmployeeEntity;

}