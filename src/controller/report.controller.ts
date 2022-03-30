import {Controller, Get, Query, Response, StreamableFile} from "@nestjs/common";
import {ReportService} from "../service/report.service";

@Controller('api/v1/reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get('/report-employee')
    async getReportEXCEL(@Response({passthrough: true}) res, @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportAboutAllEmployees(type, res);
    }

}
