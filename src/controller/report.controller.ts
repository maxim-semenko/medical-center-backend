import {Controller, Get, Param, Query, Response, StreamableFile, UseGuards} from "@nestjs/common";
import {ReportService} from "../service/report.service";
import {JwtAuthGuard, ROLE} from "../security/jwt.authentication.guard";

@Controller('api/v1/reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get('/diseases-top')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    async getReportTopDisease(@Response({passthrough: true}) res,
                              @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportTopDisease(type, res);
    }

    @Get('/vaccines-patients')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    async getReportVaccinesPatients(@Response({passthrough: true}) res,
                                    @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getReportVaccinesPatients(type, res);
    }

    @Get('/sensitive-population-group')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    async getMostSensitivePopulationGroupReport(@Response({passthrough: true}) res,
                                                @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getMostSensitivePopulationGroupReport(type, res);
    }

    @Get('/about-employees')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    async getAboutEmployeesReport(@Response({passthrough: true}) res,
                                  @Query('type') type: string): Promise<StreamableFile> {
        return this.reportService.getAboutEmployeesReport(type, res);
    }

    @Get('/about-patient/:userPassport')
    @UseGuards(new JwtAuthGuard([ROLE.HEAD_DOCTOR]))
    async getAboutPatientReport(@Response({passthrough: true}) res,
                                @Query('type') type: string,
                                @Param("userPassport") passport: string): Promise<StreamableFile> {
        return this.reportService.getAboutPatientReport(type, res, passport);
    }

}
