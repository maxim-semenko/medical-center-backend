import {Response, StreamableFile} from "@nestjs/common";
import {FileGeneratorService} from "./fileGenerator.service";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {DiseaseEntity} from "../entity/disease.entity";
import {VaccineEntity} from "../entity/vaccine.entity";
import {AppointmentEntity} from "../entity/appointment.entity";
import {MedicalCardEntity} from "../entity/medicalCard.entity";
import {DiseaseReport} from "../report/disease.report";
import {VaccineReport} from "../report/vaccine.report";

export class ReportService {

    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(DiseaseEntity) private diseaseRepository: Repository<DiseaseEntity>,
        @InjectRepository(VaccineEntity) private vaccineRepository: Repository<VaccineEntity>,
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
        @InjectRepository(MedicalCardEntity) private medicalCardRepository: Repository<MedicalCardEntity>) {
    }

    public async firstReport(): Promise<DiseaseReport[]> {

        let data = await this.medicalCardRepository.query("SELECT disease_id, 100 * COUNT(disease_id)/(SELECT COUNT(*) FROM medical_card) AS percent FROM medical_card GROUP BY disease_id ORDER BY COUNT(*) DESC LIMIT 10")
        let ids: [number] = data.map(x => x.disease_id);
        let disease: DiseaseEntity[] = await this.diseaseRepository.findByIds(ids);

        let report: DiseaseReport[] = [];
        let diseaseObject: DiseaseReport;

        for (let i = 0; i < disease.length; i++) {
            diseaseObject = new DiseaseReport();
            diseaseObject.id = disease[i].diseaseId;
            diseaseObject.diseaseName = disease[i].name;
            diseaseObject.diseaseDescription = disease[i].description;
            diseaseObject.diseasePercent = data[i].percent;
            report.push(diseaseObject);
        }

        return report;
    }

    public async secondReport(): Promise<VaccineReport[]> {

        let count = await this.medicalCardRepository.query("SELECT disease_id FROM medical_card GROUP BY disease_id ORDER BY COUNT(*) DESC LIMIT 10")
        let disease = await this.diseaseRepository.findByIds(count);
        let percentage = await this.medicalCardRepository.query("SELECT COUNT(disease_id)/(SELECT COUNT(*) FROM medical_card) FROM medical_card GROUP BY disease_id ORDER BY COUNT(disease_id) DESC LIMIT 10")

        let report: DiseaseReport[];

        for (let i = 0; i < disease.length; i++) {
            report[i].id = disease[i].diseaseId;
            report[i].diseaseName = disease[i].name;
            report[i].diseaseDescription = disease[i].description;
            report[i].diseasePercent = percentage[i];
        }

        return null;
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
