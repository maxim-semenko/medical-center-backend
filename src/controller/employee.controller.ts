import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Put,
    StreamableFile,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {EmployeeService} from '../service/employee.service';
import {EmployeeEntity} from "../entity/employee.entity";
import {UserEntity} from "../entity/user.entity";
import {WorkSheet} from 'xlsx';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const XLSX = require('xlsx');

@Controller('api/v1/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService,
                @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>) {

    }

    @Get('/:id/users')
    findAllEmployeeUser(@Param("id") employeeId: number): Promise<UserEntity[]> {
        return this.employeeService.findAllEmployeeUser(employeeId);
    }

    @Get()
    findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }

    @Get('/:id')
    findById(@Param("id") id: number): Promise<EmployeeEntity> {
        return this.employeeService.findById(id);
    }

    @Post('')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    create(@Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.create(employeeEntity);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: number, @Body() employeeEntity: EmployeeEntity): Promise<EmployeeEntity> {
        return this.employeeService.update(id, employeeEntity);
    }

    @Delete('/:id')
    delete(@Param("id") id: number): void {
        this.employeeService.deleteById(id);
    }

    @Get('/test/report-csv')
    @Header('Content-Type', 'text/csv')
    async getReportCSV(): Promise<StreamableFile> {
        const records = await this.employeeService.findAll();

        const csvStringifier = createCsvStringifier({
            header: [
                {id: 'firstname', title: 'Имя'},
                {id: 'lastname', title: 'Фамилия'},
                {id: 'speciality', title: 'Специальность'},
            ]
        });

        const buffHeader = Buffer.from(csvStringifier.getHeaderString(), "utf-8");
        const buffRecords = Buffer.from(csvStringifier.stringifyRecords(records), "utf-8");

        return new StreamableFile(Buffer.concat([buffHeader, buffRecords]));
    }


    @Get('/test/report-excel')
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    async getReportEXCEL(): Promise<StreamableFile> {
        const json = await this.employeeService.findAll()
        const columnNames = ["ID", "Имя", "Фамилия", "Специальность"]
        const data = json.map((item => {
            return [item.id, item.firstname, item.lastname, item.speciality]
        }))

        let objectMaxLength = [];
        for (let i = 0; i < json.length; i++) {
            let value = <any>Object.values(json[i]);
            for (let j = 0; j < value.length; j++) {
                if (typeof value[j] == "number") {
                    objectMaxLength[j] = 10;
                } else {
                    objectMaxLength[j] = objectMaxLength[j] >= value[j].length ? objectMaxLength[j] : value[j].length + 2;
                }
            }
        }
        for (let i = 0; i < columnNames.length; i++) {  // columns length added
            if (objectMaxLength[i] < columnNames[i].length) {
                objectMaxLength[i] = columnNames[i].length + 2
            }
        }

        const workBook = XLSX.utils.book_new();                     // create workbook
        const workSheetData = [columnNames, ...data];
        const worksheet: WorkSheet = XLSX.utils.aoa_to_sheet(workSheetData);

        const cols = [];
        for (let i = 0; i < objectMaxLength.length; i++) {  // columns length added
            cols.push({wch: objectMaxLength[i]})
        }

        worksheet["!cols"] = cols;
        XLSX.utils.book_append_sheet(workBook, worksheet, 'users_sheet');  // add sheet to workbook

        const file = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});
        return new StreamableFile(file);
    }

    @Get('/test/report-pdf')
    @Header('Content-Type', 'application/pdf')
    async getReportPDF(): Promise<StreamableFile> {
        const json = await this.employeeService.findAll()

        const pdf = require('pdf-creator-node');
        const fs = require("fs");
        let html = fs.readFileSync("./template/report.html", "utf8");

        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Автор: Максим Семенько</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };

        const document = {
            html: html,
            data: {
                employees: json,
            },
            type: "buffer",
        };

        let buffer;
        await pdf.create(document, options)
            .then((res) => {
                buffer = Buffer.from(res, "utf-8");
            })

        return new StreamableFile(buffer);
    }


}
