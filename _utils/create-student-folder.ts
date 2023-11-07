import {exists, readTextLines, copyDirectory} from './fs-promisify'

async function createStudentFolder(student: string, templateFolderName: string, destinationFolderName: string) {
    if (!destinationFolderName.endsWith("\\")) {
        destinationFolderName = `${destinationFolderName}\\`;
    }
    const studentFolderName = `${destinationFolderName}${student}`;
    console.log(`  Creating folder ${studentFolderName}`);
    if (await exists(studentFolderName, true)) { 
        console.log(`    Folder ${studentFolderName} already exists, skipping`);
        return;
    }
    await copyDirectory(templateFolderName, studentFolderName);
}

async function main() {
    const [studentFileName, templateFolderName, destinationFolderName] = process.argv.slice(2);

    if (!studentFileName || !templateFolderName || !destinationFolderName) {
        console.error("Usage: node create-student-folder.js <student-file> <template-folder> <destination-folder>");
        process.exit(1);
    }

    if (!await exists(studentFileName, false)) {
        console.error(`Student file ${studentFileName} does not exist`);
        process.exit(1);
    }

    if (!await exists(templateFolderName, true)) {
        console.error(`Template folder ${templateFolderName} does not exist`);
        process.exit(1);
    }

    if (!await exists(destinationFolderName, true)) {
        console.error(`Destination folder ${destinationFolderName} does not exist`);
        process.exit(1);
    }

    console.log(`Loading students from ${studentFileName}`);
    console.log(`Using template folder ${templateFolderName}`);
    console.log(`Writing to destination folder ${destinationFolderName}`);

    const students = await readTextLines(studentFileName);

    console.log(`Found ${students.length} students`);

    for (const student of students) {
        console.log(`Creating folder for ${student}`);
        await createStudentFolder(student, templateFolderName, destinationFolderName);
    }


}

main();
