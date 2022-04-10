import {Controller, Get, Param, Query, Response, StreamableFile} from "@nestjs/common";
import {ReportService} from "../service/report.service";

@Controller('api/v1/reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get('/diseases-top')
    async getReportTopDisease(@Response({passthrough: true}) res,
                              @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportTopDisease(type, res);
    }

    @Get('/vaccines-patients')
    async getReportVaccinesPatients(@Response({passthrough: true}) res,
                                    @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportVaccinesPatients(type, res);
    }

    @Get('/sensitive-population-group')
    async getMostSensitivePopulationGroupReport(@Response({passthrough: true}) res,
                                                @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getMostSensitivePopulationGroupReport(type, res);
    }

    @Get('/about-employees')
    async getAboutEmployeesReport(@Response({passthrough: true}) res,
                                  @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getAboutEmployeesReport(type, res);
    }

    @Get('/about-patient/:userPassport')
    async getAboutPatientReport(@Response({passthrough: true}) res,
                                @Query('type') type: string,
                                @Param("userPassport") passport: string): Promise<StreamableFile> {
        return this.reportService.getAboutPatientReport(type, res, passport);
    }

}
