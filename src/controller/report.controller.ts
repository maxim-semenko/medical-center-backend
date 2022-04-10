import {Controller, Get, Param, Query, Response, StreamableFile} from "@nestjs/common";
import {ReportService} from "../service/report.service";
import {DiseaseReport} from "../report/disease.report";
import {VaccineReport} from "../report/vaccine.report";
import {EmployeeReport} from "../report/employee.report";
import {SensitiveGroupReport} from "../report/sensitive.group.report";
import {UserHistoryReport} from "../report/user.history.report";

@Controller('api/v1/reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get('/report-employee')
    async getReportEXCEL(@Response({passthrough: true}) res, @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportAboutAllEmployees(type, res);
    }

    @Get('/testReport_1')
    async getReport1(): Promise<DiseaseReport[]> {
        return this.reportService.getDiseaseReport();
    }

    @Get('/testReport_2')
    async getReport2(): Promise<VaccineReport[]> {
        return this.reportService.getVaccineReport();
    }

    @Get('/testReport_3')
    async getReport3(): Promise<SensitiveGroupReport[]> {
        return this.reportService.getMostSensitivePopulationGroupReport();
    }

    @Get('/testReport_4')
    async getReport4(): Promise<EmployeeReport[]> {
        return this.reportService.getEmployeeReport();
    }

    @Get('/testReport_5/:userPassport')
    async getReport5(@Param("userPassport") passport: string): Promise<UserHistoryReport[]> {
        return this.reportService.getUserHistoryReport(passport);
    }

}
