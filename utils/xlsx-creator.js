const xlsx = require('xlsx');
const {spawn} = require('child_process');
const {APP_DIR} = require('../index');


function createFile(name) {
  let path = APP_DIR;
  let fileName = `${path}/.tmp/${name}`;
  spawn('touch', [fileName]);
  return fileName;
}

function createWorkSheet(rows, sheetName) {
  const worksheet = xlsx.utils.json_to_sheet(rows);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // fixing headers
  xlsx.utils.sheet_add_aoa(worksheet, [["Type", "Value", "URL"]], { origin: "A1" });
  /* create an XLSX file and try to save to Presidents.xlsx */
  let fileName = `Presidents.xlsx`
  fileName = createFile(fileName);
  return xlsx.writeFile(workbook, fileName, { compression: true });
}

module.exports = {createWorkSheet};
// const rows = [
//   { header: 'email', value: '//unpkg.com/aos@2.3.1' },
//   { header: 'email', value: 'biz@valuefy.com' },
//   { header: 'email', value: 'iz@valuefy.com' },
//   { header: 'email', value: '//unpkg.com/three@0.87.1' }
// ];
// createWorkSheet(rows, 'valuefy.com');
