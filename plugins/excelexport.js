import * as XLSX from 'xlsx';
export default defineNuxtPlugin(() => {
    const excelExport = (name,rows) => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, name);
        XLSX.writeFile(workbook, name+".xlsx", { compression: true });
    };
    return {
        provide: {
            excelExport: (name,rows)=>excelExport(name,rows),
        },
    };
});
