import {StreamableFile} from "@nestjs/common";
import {WorkSheet} from "xlsx";

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const XLSX = require('xlsx');

export class FileGeneratorService {

    public static async getReportCSV(json: any, header: any[]): Promise<StreamableFile> {
        const csvStringifier = createCsvStringifier({header});
        const buffHeader = Buffer.from(csvStringifier.getHeaderString(), "utf-8");
        const buffRecords = Buffer.from(csvStringifier.stringifyRecords(json), "utf-8");
        return new StreamableFile(Buffer.concat([buffHeader, buffRecords]));
    }


    public static async getReportEXCEL(json: any, columns: any[]): Promise<StreamableFile> {
        const columnNames = columns;
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

    public static async getReportPDF(json: any, filePath: string): Promise<StreamableFile> {
        const pdf = require('pdf-creator-node');
        const fs = require("fs");
        let html = fs.readFileSync(filePath, "utf8");

        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "25mm",
                contents: '<div style="text-align: center; background-color: #0074D9; color: white"><h1>Мед-центр «Валерия»</h1></div>'
            },
            footer: {
                height: "25mm",
                contents: '<div style="text-align: center; background-color: #0074D9; color: white"><h1>Мед-центр «Валерия». Все права защищены</h1></div>'
            }
        };

        const document = {
            html: html,
            data: {
                data: json,
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
