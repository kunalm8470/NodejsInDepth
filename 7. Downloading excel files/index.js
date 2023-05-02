const express = require('express');
const { Workbook } = require('exceljs');

const app = express();

const port = 3000;

const students = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 10
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        age: 9
    }
];

app.post('/students/download', async (req, res, next) => {
    try {
        // 1. Create a workbook
        const workbook = new Workbook();

        // 2. Create a sheet
        const worksheet = workbook.addWorksheet('Students');

        // 3. Defining the columns on per sheet level
        worksheet.columns = [
            {
                header: 'Id',
                key: 'id',
                width: 25
            },
            {
                header: 'First Name',
                key: 'firstName',
                width: 25
            },
            {
                header: 'Last Name',
                key: 'lastName',
                width: 25
            },
            {
                header: 'Age',
                key: 'age',
                width: 25
            }
        ];

        // 4. Add rows
        // Note: Will just add it in memory, but not in the file
        worksheet.addRows(students);

        // 5. Add the Content-Type and Content-Disposition headers to response headers
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment;filename="students.xlsx"');

        // 6. Stream the files to the response
        await workbook.xlsx.write(res);

        return res.status(201).end();
    } catch (err) {
        return res.status(500).json({
            message: 'Excel file downloading failed',
            detail: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
