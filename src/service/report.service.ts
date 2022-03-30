import {Response, StreamableFile} from "@nestjs/common";
import {FileGeneratorService} from "./fileGenerator.service";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {Repository} from "typeorm";

export class ReportService {

    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) {
    }


    // ТЕСТОВЫЙ МЕТОД ДЛЯ ОТЧЕТА О ВСЕХ СОТРУДНИКАХ
    public async getReportAboutAllEmployees(type: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        const json = await this.employeeRepository.find()
        console.log(type)
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'firstname', title: 'Имя'},
                    {id: 'lastname', title: 'Фамилия'},
                    {id: 'speciality', title: 'Специальность'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["ID", "Имя", "Фамилия", "Специальность"]
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(json, columnNames);
            }
            case "pdf": {
                let filePath = "./template/report.html"
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, filePath);
            }
        }
    }


}
