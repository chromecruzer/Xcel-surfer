// welcomeScript.js

// Get command-line arguments
const args = process.argv.slice(2);

// Function to extract value of a flag
const getFlagValue = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

// Check if --name flag is provided
const nameFlag = '--name';
const name = getFlagValue(nameFlag);

// Display welcome message
console.log('Welcome to the server!');

if (name) {
  console.log(`Hello, ${name}!`);
} else {
  console.log('No name provided.');
}
console.log("Current working directory: " + process.cwd());

// import ExcelJS  from 'exceljs'
// import path from 'path'

// const currentWorkingDirectory = process.cwd();
// const excelFilePath = path.join(currentWorkingDirectory, 'IOL_Download 2023.02.01.xlsx');

// // Create a new workbook
// const workbook = new ExcelJS.Workbook();  

/**Normal excel js approach for handling excel datas of 1000 to 5000 */
// // Read the Excel file
// workbook.xlsx.readFile(excelFilePath)
//   .then(() => {
//     // Assuming there is only one sheet in the workbook
//     const worksheet = workbook.getWorksheet(1);

//     // Iterate through rows
//     worksheet.eachRow((row, rowNumber) => {
//       // Access cell values
//       console.log(`Row ${rowNumber}: ${row.values}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error reading Excel file:', error.message);
//   });

/**Using feature called stream a chunk based apporach for handling large massive data */
import ExcelJS from 'exceljs';
import { createReadStream } from 'fs';
import { resolve } from 'path';

const currentWorkingDirectory = process.cwd();
const excelFilePath = resolve(currentWorkingDirectory, 'IOL_Download 2023.02.01.xlsx');

// Create a new workbook
const workbook = new ExcelJS.Workbook();

// Use streaming to read the Excel file
const stream = createReadStream(excelFilePath);

workbook.xlsx.read(stream)
  .then(() => {
    const worksheet = workbook.getWorksheet(1);

    // Iterate through rows
    worksheet.eachRow((row, rowNumber) => {
      // Access cell values
      console.table(`Row ${rowNumber}: ${JSON.stringify(row.values)}`);
    });

    console.log('All rows processed.');
  })
  .catch((error) => {
    console.error('Error reading Excel file:', error.message);
  });


// to show the same in html table 
// import ExcelJS from 'exceljs';
// import { createReadStream, createWriteStream } from 'fs';
// import { resolve } from 'path';

// const currentWorkingDirectory = process.cwd();
// const excelFilePath = resolve(currentWorkingDirectory, '01236542  TRAC .xlsx');
// const jsonFilePath = resolve(currentWorkingDirectory, 'excel-data.json');

// // Create a new workbook
// const workbook = new ExcelJS.Workbook();

// // Use streaming to read the Excel file
// const stream = createReadStream(excelFilePath);

// workbook.xlsx.read(stream)
//   .then(() => {
//     const worksheet = workbook.getWorksheet(1);

//     const columns = worksheet.columns.map(column => column.header);
//     const rows = worksheet.getSheetValues();

//     // Write the data to a JSON file
//     const jsonData = { columns, rows };
//     const jsonStream = createWriteStream(jsonFilePath);
//     jsonStream.write(JSON.stringify(jsonData));
//     jsonStream.end();

//     console.log('Excel data written to excel-data.json');
//   })
//   .catch((error) => {
//     console.error('Error reading Excel file:', error.message);
//   });
