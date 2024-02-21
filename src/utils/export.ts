import * as XLSX from 'xlsx';


function exportToExcel(data: any[], filename: string = 'MyData.xlsx') {
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate an Excel file (in binary string format)
    XLSX.writeFile(workbook, filename);
}


export default exportToExcel;