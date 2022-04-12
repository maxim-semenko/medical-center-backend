import {Response, StreamableFile} from "@nestjs/common";
import {FileGeneratorService} from "./fileGenerator.service";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeEntity} from "../entity/employee.entity";
import {getRepository, Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {DiseaseEntity} from "../entity/disease.entity";
import {VaccineEntity} from "../entity/vaccine.entity";
import {AppointmentEntity} from "../entity/appointment.entity";
import {MedicalCardEntity} from "../entity/medicalCard.entity";
import {DiseaseReport} from "../report/disease.report";
import {VaccineReport} from "../report/vaccine.report";
import {SensitiveGroupReport} from "../report/sensitive.group.report";
import {EmployeeReport} from "../report/employee.report";
import {UserHistoryReport} from "../report/user.history.report";

export class ReportService {

    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(DiseaseEntity) private diseaseRepository: Repository<DiseaseEntity>,
        @InjectRepository(VaccineEntity) private vaccineRepository: Repository<VaccineEntity>,
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
        @InjectRepository(MedicalCardEntity) private medicalCardRepository: Repository<MedicalCardEntity>) {
    }

    public async getJsonForTopDiseaseReport(): Promise<DiseaseReport[]> {

        let data = await this.medicalCardRepository.query("SELECT ds.*," +
            " round(100 * COUNT(ds.disease_id)::decimal / (SELECT COUNT(*) FROM medical_card)::decimal, 2) AS percentage FROM disease AS ds" +
            " RIGHT JOIN medical_card mc ON ds.disease_id = mc.disease_id " +
            " GROUP BY ds.disease_id, name, ds.description ORDER BY COUNT(ds.disease_id) DESC LIMIT 10")

        let report: DiseaseReport[] = [];
        let diseaseObject: DiseaseReport;

        for (let i = 0; i < data.length; i++) {
            diseaseObject = new DiseaseReport();
            diseaseObject.id = i + 1;
            diseaseObject.diseaseName = data[i].name;
            diseaseObject.diseaseDescription = data[i].description;
            diseaseObject.diseasePercent = data[i].percentage;
            report.push(diseaseObject);
        }

        return report;
    }

    public async getJsonForVaccinesPatientsReport(): Promise<VaccineReport[]> {

        let data = await getRepository(UserEntity).createQueryBuilder("user")
            .innerJoinAndSelect("user.vaccine", "users").getMany();

        let report: VaccineReport[] = [];
        let vaccineObject: VaccineReport;

        for (let i = 0; i < data.length; i++) {
            let vaccines = String();
            vaccineObject = new VaccineReport();
            vaccineObject.id = i + 1;
            vaccineObject.firstname = data[i].firstname;
            vaccineObject.lastname = data[i].lastname;
            vaccineObject.passport = data[i].passport;
            vaccineObject.age = data[i].age;
            for (let j = 0; j < data[i].vaccine.length; j++) {
                vaccines += data[i].vaccine[j].name;
                if (data[i].vaccine.length != 1 && j != data[i].vaccine.length - 1) {
                    vaccines += ', ';
                }
            }
            vaccineObject.vaccines = vaccines;
            report.push(vaccineObject);
        }

        return report;
    }

    public async getJsonForMostSensitivePopulationGroupReport(): Promise<SensitiveGroupReport[]> {

        let data = await this.medicalCardRepository.query("SELECT age, COUNT(*) AS people FROM medical_card " +
            " LEFT JOIN public.user u on u.id = medical_card.user_id GROUP BY age ORDER BY COUNT(*) DESC LIMIT 10")

        let report: SensitiveGroupReport[] = [];
        let groupObject: SensitiveGroupReport;

        for (let i = 0; i < data.length; i++) {
            groupObject = new SensitiveGroupReport();
            groupObject.id = i + 1;
            groupObject.age = data[i].age;
            groupObject.peopleCount = data[i].people

            let disease = await this.medicalCardRepository.query("SELECT d.* FROM medical_card" +
                " LEFT JOIN public.user u on u.id = medical_card.user_id" +
                " LEFT JOIN disease d on medical_card.disease_id = d.disease_id" +
                " WHERE age = $1 GROUP BY d.disease_id ORDER BY COUNT(d.disease_id) DESC LIMIT 1", [groupObject.age]);

            groupObject.diseaseName = disease[0].name;
            groupObject.diseaseDescription = disease[0].description;
            report.push(groupObject);
        }

        return report;
    }

    public async getJsonForEmployeeReport(): Promise<EmployeeReport[]> {
        let data = await this.medicalCardRepository.query("SELECT employee.id, firstname, lastname, speciality, COUNT(*) as patient FROM employee" +
            " INNER JOIN medical_card mc on employee.id = mc.\"employeeId\"" +
            " GROUP BY employee.id, firstname, lastname, speciality ORDER BY COUNT(*) DESC")

        let report: EmployeeReport[] = [];
        let employeeObject: EmployeeReport;

        for (let i = 0; i < data.length; i++) {
            employeeObject = new EmployeeReport();
            employeeObject.id = i + 1;
            employeeObject.firstname = data[i].firstname;
            employeeObject.lastname = data[i].lastname;
            employeeObject.speciality = data[i].speciality;
            employeeObject.patientCount = data[i].patient;
            report.push(employeeObject);
        }

        return report;
    }

    public async getJsonForPatientReport(passport: string): Promise<UserHistoryReport[]> {

        let data = await this.medicalCardRepository
            .query("SELECT mc.id, u.passport, mc.start_date, mc.end_date, mc.description," +
                " mc.is_confirmation, mc.is_rehabilitation, d.name, mc.\"employeeId\", e.lastname" +
                " FROM medical_card as mc" +
                " INNER JOIN disease d on mc.disease_id = d.disease_id" +
                " INNER JOIN \"user\" u on u.id = mc.user_id " +
                " INNER JOIN employee e on e.id = mc.\"employeeId\" WHERE u.passport = $1", [passport])

        let report: UserHistoryReport[] = [];
        let userHistoryObject: UserHistoryReport;

        for (let i = 0; i < data.length; i++) {
            userHistoryObject = new UserHistoryReport();
            userHistoryObject.id = data[i].id;
            userHistoryObject.userPassport = data[i].passport;
            userHistoryObject.startDate = data[i].start_date.toLocaleString();
            userHistoryObject.endDate = data[i].end_date.toLocaleString();
            userHistoryObject.description = data[i].description;
            userHistoryObject.isConfirmation = data[i].is_confirmation ? 'да' : 'нет';
            userHistoryObject.isRehabilitation = data[i].is_rehabilitation ? 'да' : 'нет';
            userHistoryObject.diseaseName = data[i].name;
            userHistoryObject.employeeId = data[i].employeeId;
            userHistoryObject.employeeLastname = data[i].lastname;

            report.push(userHistoryObject);
        }

        return report;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Отчет-1: О наиболее чатсых болезнях
    public async getReportTopDisease(type: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        let json;
        await this.getJsonForTopDiseaseReport()
            .then((response) => {
                json = response
            });
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'id', title: 'Номер'},
                    {id: 'diseaseName', title: 'Название'},
                    {id: 'diseaseDescription', title: 'Описание'},
                    {id: 'diseasePercent', title: 'Процент(%)'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["Номер", "Название", "Описание", "Процент(%)"]
                const data = json.map((item => {
                    return [item.id, item.diseaseName, item.diseaseDescription, item.diseasePercent]
                }))
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(data, columnNames);
            }
            case "pdf": {
                let tableHeader = [
                    {"label": "Номер", "property": "id"},
                    {"label": "Название", "property": "diseaseName"},
                    {"label": "Описание", "property": "diseaseDescription"},
                    {"label": "Процент(%)", "property": "diseasePercent"}
                ]
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, tableHeader);
            }
        }
    }

    // Отчет-2: О вакцинации пациентов
    public async getReportVaccinesPatients(type: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        let json;
        await this.getJsonForVaccinesPatientsReport()
            .then((response) => {
                json = response
            });
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'id', title: 'Номер'},
                    {id: 'firstname', title: 'Имя'},
                    {id: 'lastname', title: 'Фамилия'},
                    {id: 'passport', title: 'Паспорт'},
                    {id: 'age', title: 'Возраст'},
                    {id: 'vaccines', title: 'Вакцины'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["Номер", "Имя", "Фамилия", "Паспорт", "Возраст", "Вакцины"]
                const data = json.map((item => {
                    return [item.id, item.firstname, item.lastname, item.passport, item.age, item.vaccines]
                }))
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(data, columnNames);
            }
            case "pdf": {
                let tableHeader = [
                    {"label": "Номер", "property": "id"},
                    {"label": "Имя", "property": "firstname"},
                    {"label": "Фамилия", "property": "lastname"},
                    {"label": "Паспорт", "property": "passport"},
                    {"label": "Возраст", "property": "age"},
                    {"label": "Вакцины", "property": "vaccines"},
                ]
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, tableHeader);
            }
        }
    }

    // Отчет-3: О возрастных группах пацентов
    public async getMostSensitivePopulationGroupReport(type: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        let json;
        await this.getJsonForMostSensitivePopulationGroupReport()
            .then((response) => {
                json = response
            });
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'id', title: 'Номер'},
                    {id: 'age', title: 'Возраст'},
                    {id: 'peopleCount', title: 'Количество'},
                    {id: 'diseaseName', title: 'Частая болезнь'},
                    {id: 'diseaseDescription', title: 'Описание'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["Номер", "Возраст", "Количество", "Частая болезнь", "Описание"]
                const data = json.map((item => {
                    return [item.id, item.age, item.peopleCount, item.diseaseName, item.diseaseDescription]
                }))
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(data, columnNames);
            }
            case "pdf": {
                let tableHeader = [
                    {"label": "Номер", "property": "id"},
                    {"label": "Возраст", "property": "age"},
                    {"label": "Количество", "property": "peopleCount"},
                    {"label": "Частая болезнь", "property": "diseaseName"},
                    {"label": "Описание", "property": "diseaseDescription"},
                ]
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, tableHeader);
            }
        }
    }

    // Отчет-4: О сотрудниках
    public async getAboutEmployeesReport(type: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        let json;
        await this.getJsonForEmployeeReport()
            .then((response) => {
                json = response
            });
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'id', title: 'Номер'},
                    {id: 'firstname', title: 'Имя'},
                    {id: 'lastname', title: 'Фамилия'},
                    {id: 'speciality', title: 'Квалификация'},
                    {id: 'patientCount', title: 'Количество пациентов'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["Номер", "Имя", "Фамилия", "Квалификация", "Количество пациентов"]
                const data = json.map((item => {
                    return [item.id, item.firstname, item.lastname, item.speciality, item.patientCount]
                }))
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(data, columnNames);
            }
            case "pdf": {
                let tableHeader = [
                    {"label": "Номер", "property": "id"},
                    {"label": "Имя", "property": "firstname"},
                    {"label": "Фамилия", "property": "lastname"},
                    {"label": "Квалификация", "property": "speciality"},
                    {"label": "Количество пациентов", "property": "patientCount"},
                ]
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, tableHeader);
            }
        }
    }

    // Отчет-5: О пациенте
    public async getAboutPatientReport(type: string, @Response({passthrough: true}) res, passport: string): Promise<StreamableFile> {
        let json;
        await this.getJsonForPatientReport(passport)
            .then((response) => {
                json = response
            });
        switch (type) {
            case "csv": {
                console.log("DO CSV")
                const header = [
                    {id: 'userPassport', title: 'Паспорт пациента'},
                    {id: 'startDate', title: 'Начало'},
                    {id: 'endDate', title: 'Конец'},
                    {id: 'description', title: 'Описание'},
                    {id: 'isConfirmation', title: 'Подтверждение'},
                    {id: 'isRehabilitation', title: 'Реабилитация'},
                    {id: 'diseaseName', title: 'Болезнь'},
                    {id: 'employeeLastname', title: 'Врач'},
                ]
                res.set({
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="file.csv"',
                });
                return FileGeneratorService.getReportCSV(json, header)
            }
            case "excel": {
                const columnNames = ["Паспорт пациента", "Начало", "Конец", "Описание", "Подтверждение",
                    "Реабилитация", "Болезнь", "Врач"]
                const data = json.map((item => {
                    return [item.userPassport, item.startDate, item.endDate, item.description,
                        item.isConfirmation, item.isRehabilitation, item.diseaseName, item.employeeLastname]
                }))
                res.set({
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="file.xlsx"',
                });
                return FileGeneratorService.getReportEXCEL(data, columnNames);
            }
            case "pdf": {
                let tableHeader = [
                    {"label": "Паспорт пациента", "property": "userPassport"},
                    {"label": "Начало", "property": "startDate"},
                    {"label": "Конец", "property": "endDate"},
                    {"label": "Описание", "property": "description"},
                    {"label": "Подтверждение", "property": "isConfirmation"},
                    {"label": "Реабилитация", "property": "isRehabilitation"},
                    {"label": "Болезнь", "property": "diseaseName"},
                    {"label": "Врач", "property": "employeeLastname"},
                ]
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="file.pdf"',
                });
                return FileGeneratorService.getReportPDF(json, tableHeader);
            }
        }
    }

}

