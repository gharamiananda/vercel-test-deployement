import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as XLSX from "xlsx";
import AppError from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EmployeeService } from "./candidate.service";
import { mapRowToEmployeePayload } from "./candidate.utils";
import { createEmployeeZodSchema } from "./candidate.validation";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
    const payload = {
        ...req.body,
        // photo: req.files?.photo?.[0]?.path as string,
        // cv: req.files?.cv?.[0]?.path,
    };
    console.log(payload, "payload")
    const result = await EmployeeService.createEmployee(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Employee created successfully",
        data: result,
    });
});

const uploadEmployeeFeedbackByFile = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    console.log(file, 'file')
    if (!file) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Excel file is required");
    }

    // sendResponse(res, {
    //     statusCode: StatusCodes.OK,
    //     success: true,
    //     message: "Employee data uploaded successfully",
    //     data: {
    //     },
    // });
    // return;

    /* ---------- READ EXCEL ---------- */
    const workbook = XLSX.read(file.buffer, {
        type: "buffer",
        cellDates: true,
    });
    console.log(workbook)

    const sheetName = workbook.SheetNames[0];

    const rows = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        { defval: "", raw: false }
    ) as Record<string, any>[];
    console.log(rows, sheetName, "rows")
    if (!rows.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Excel file is empty");
    }

    /* ---------- PARSE & VALIDATE ---------- */
    const validEmployees: any[] = [];
    const invalidRows: any[] = [];

    rows.forEach((row, index) => {
        const payload = mapRowToEmployeePayload(row);

        const parsed = createEmployeeZodSchema.safeParse({
            body: payload,
        });

        if (parsed.success) {

            validEmployees.push(parsed.data.body);
        } else {
            invalidRows.push({
                row: index + 2, // Excel row number
                errors: parsed.error.flatten().fieldErrors,
            });
        }
    });

    if (!validEmployees.length) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "No valid employee records found"
        );
    }

    console.log(validEmployees,)

    /* ---------- SAVE ---------- */
    const result = await EmployeeService.findAndUpsertEmployeesFeedback(validEmployees);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Employee data uploaded successfully",
        data: {
            result,
            invalidRows,
        },
    });
})


const uploadEmployeeOnboardByFile = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Excel file is required");
    }

    /* ---------- READ EXCEL ---------- */
    const workbook = XLSX.read(file.buffer, {
        type: "buffer",
        cellDates: true,
    });

    const sheetName = workbook.SheetNames[0];

    const rows = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        { defval: "", raw: false }
    ) as Record<string, any>[];

    if (!rows.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Excel file is empty");
    }

    /* ---------- PARSE & VALIDATE ---------- */
    const validEmployees: any[] = [];
    const invalidRows: any[] = [];

    rows.forEach((row, index) => {
        const payload = mapRowToEmployeePayload(row);

        const parsed = createEmployeeZodSchema.safeParse({
            body: payload,
        });

        if (parsed.success) {

            validEmployees.push(parsed.data.body);
        } else {
            invalidRows.push({
                row: index + 2, // Excel row number
                errors: parsed.error.flatten().fieldErrors,
            });
        }
    });

    if (!validEmployees.length) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "No valid employee records found"
        );
    }

    /* ---------- SAVE ---------- */
    const result = await EmployeeService.findAndUpsertEmployeesOnboarding(validEmployees);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Employee data uploaded successfully",
        data: {
            result,
            invalidRows,
        },
    });
})

const getAllEmployees = catchAsync(async (req, res) => {
    const query = req.query;

    const result = await EmployeeService.getAllCandidates(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee get",

    });
});

const getSingleEmployee = catchAsync(async (req, res) => {
    const result = await EmployeeService.getSingleEmployee(req.params.id);
    sendResponse(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee get",

    });
});

const updateEmployee = catchAsync(async (req, res) => {
    const result = await EmployeeService.updateEmployee(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee updated",

    });
});

const deleteEmployee = catchAsync(async (req, res) => {
    await EmployeeService.deleteEmployee(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Employee deleted",
        data: null
    });
});

export const CandidateController = {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    uploadEmployeeFeedbackByFile,
    uploadEmployeeOnboardByFile
};
