import {Controller, Get, Query, Response, StreamableFile} from "@nestjs/common";
import {ReportService} from "../service/report.service";
import {DiseaseReport} from "../report/disease.report";

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
        return this.reportService.firstReport();
    }

    @Get('/testReport_2')
    async getReport2(): Promise<DiseaseReport[]> {
        return this.reportService.firstReport();
    }

}
