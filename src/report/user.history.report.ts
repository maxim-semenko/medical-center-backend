import {EmployeeEntity} from "../entity/employee.entity";

export class UserHistoryReport {

    id: number;

    userPassport;

    startDate: string;

    endDate: string;

    description: string;

    isRehabilitation: string;

    isConfirmation: string;

    diseaseName: string;

    employeeId: number;

    employeeLastname: EmployeeEntity;

}
