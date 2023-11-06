"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_promisify_1 = require("./fs-promisify");
function createStudentFolder(student, templateFolderName, destinationFolderName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!destinationFolderName.endsWith("\\")) {
            destinationFolderName = `${destinationFolderName}\\`;
        }
        const studentFolderName = `${destinationFolderName}${student}`;
        console.log(`  Creating folder ${studentFolderName}`);
        if (yield (0, fs_promisify_1.exists)(studentFolderName, true)) {
            console.log(`    Folder ${studentFolderName} already exists, skipping`);
            return;
        }
        yield (0, fs_promisify_1.copyDirectory)(templateFolderName, studentFolderName);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [studentFileName, templateFolderName, destinationFolderName] = process.argv.slice(2);
        if (!studentFileName || !templateFolderName || !destinationFolderName) {
            console.error("Usage: node create-student-folder.js <student-file> <template-folder> <destination-folder>");
            process.exit(1);
        }
        if (!(yield (0, fs_promisify_1.exists)(studentFileName, false))) {
            console.error(`Student file ${studentFileName} does not exist`);
            process.exit(1);
        }
        if (!(yield (0, fs_promisify_1.exists)(templateFolderName, true))) {
            console.error(`Template folder ${templateFolderName} does not exist`);
            process.exit(1);
        }
        if (!(yield (0, fs_promisify_1.exists)(destinationFolderName, true))) {
            console.error(`Destination folder ${destinationFolderName} does not exist`);
            process.exit(1);
        }
        console.log(`Loading students from ${studentFileName}`);
        console.log(`Using template folder ${templateFolderName}`);
        console.log(`Writing to destination folder ${destinationFolderName}`);
        const students = yield (0, fs_promisify_1.readTextLines)(studentFileName);
        console.log(`Found ${students.length} students`);
        for (const student of students) {
            console.log(`Creating folder for ${student}`);
            yield createStudentFolder(student, templateFolderName, destinationFolderName);
        }
    });
}
main();
