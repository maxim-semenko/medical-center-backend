import {StreamableFile} from "@nestjs/common";
import {WorkSheet} from "xlsx";

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const XLSX = require('xlsx');

export class FileGeneratorService {

    // GENERATE CSV
    public static async getReportCSV(json: any, header: any[]): Promise<StreamableFile> {
        const csvStringifier = createCsvStringifier({header});
        const buffHeader = Buffer.from(csvStringifier.getHeaderString(), "utf-8");
        const buffRecords = Buffer.from(csvStringifier.stringifyRecords(json), "utf-8");
        return new StreamableFile(Buffer.concat([buffHeader, buffRecords]));
    }

    // GENERATE EXCEL
    public static async getReportEXCEL(json: any, columns: any[]): Promise<StreamableFile> {
        const columnNames = columns;

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
        const workSheetData = [columnNames, ...json];
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

    // GENREATE PDF
    public static async getReportPDF(json: any, tableHeader: any[]): Promise<StreamableFile> {
        const PDFDocument = require("pdfkit-table");
        const getStream = require('get-stream')

        const docDefinition = {
            ownerPassword: '123456',
            permissions: {
                modifying: false,
                copying: false,
                fillingForms: false,
            },
        };

        const doc = new PDFDocument(docDefinition);

        doc.registerFont('Heading Font', `C:\\OneDrive\\Maxim\\OneDrive\\IdeaProjects\\medical-center-backend\\arial.ttf`)
        doc.font('Heading Font')
        doc.fontSize(18).fillColor("blue").text("Медицинский центр «Валерия»", {align: 'center'})
        doc.moveDown();
        doc.fontSize(16).fillColor("black").text("Отчет", {align: 'center'})
        doc.moveDown();

        const tableJson = {
            "headers": tableHeader,
            "datas": json,
        };
        doc.table(tableJson, {
            prepareHeader: () => doc.font("Heading Font").fontSize(9),
            prepareRow: (row, i) => doc.font("Heading Font").fontSize(9),
        });
        doc.moveDown();
        doc.fontSize(18).fillColor("blue").text("Медицинский центр «Валерия». Все права защищены", {align: 'center'})
        doc.end()

        return new StreamableFile(await getStream.buffer(doc));
    }

}
