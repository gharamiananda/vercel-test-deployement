"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateController = void 0;
const http_status_codes_1 = require("http-status-codes");
const XLSX = __importStar(require("xlsx"));
const appError_1 = __importDefault(require("../../errors/appError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const candidate_service_1 = require("./candidate.service");
const candidate_utils_1 = require("./candidate.utils");
const candidate_validation_1 = require("./candidate.validation");
const createEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({}, req.body);
    console.log(payload, "payload");
    const result = yield candidate_service_1.EmployeeService.createEmployee(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Employee created successfully",
        data: result,
    });
}));
const uploadEmployeeFeedbackByFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    console.log(file, 'file');
    if (!file) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Excel file is required");
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
    console.log(workbook);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "", raw: false });
    console.log(rows, sheetName, "rows");
    if (!rows.length) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Excel file is empty");
    }
    /* ---------- PARSE & VALIDATE ---------- */
    const validEmployees = [];
    const invalidRows = [];
    rows.forEach((row, index) => {
        const payload = (0, candidate_utils_1.mapRowToEmployeePayload)(row);
        const parsed = candidate_validation_1.createEmployeeZodSchema.safeParse({
            body: payload,
        });
        if (parsed.success) {
            validEmployees.push(parsed.data.body);
        }
        else {
            invalidRows.push({
                row: index + 2, // Excel row number
                errors: parsed.error.flatten().fieldErrors,
            });
        }
    });
    if (!validEmployees.length) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "No valid employee records found");
    }
    console.log(validEmployees);
    /* ---------- SAVE ---------- */
    const result = yield candidate_service_1.EmployeeService.findAndUpsertEmployeesFeedback(validEmployees);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Employee data uploaded successfully",
        data: {
            result,
            invalidRows,
        },
    });
}));
const uploadEmployeeOnboardByFile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Excel file is required");
    }
    /* ---------- READ EXCEL ---------- */
    const workbook = XLSX.read(file.buffer, {
        type: "buffer",
        cellDates: true,
    });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "", raw: false });
    if (!rows.length) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Excel file is empty");
    }
    /* ---------- PARSE & VALIDATE ---------- */
    const validEmployees = [];
    const invalidRows = [];
    rows.forEach((row, index) => {
        const payload = (0, candidate_utils_1.mapRowToEmployeePayload)(row);
        const parsed = candidate_validation_1.createEmployeeZodSchema.safeParse({
            body: payload,
        });
        if (parsed.success) {
            validEmployees.push(parsed.data.body);
        }
        else {
            invalidRows.push({
                row: index + 2, // Excel row number
                errors: parsed.error.flatten().fieldErrors,
            });
        }
    });
    if (!validEmployees.length) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "No valid employee records found");
    }
    /* ---------- SAVE ---------- */
    const result = yield candidate_service_1.EmployeeService.findAndUpsertEmployeesOnboarding(validEmployees);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Employee data uploaded successfully",
        data: {
            result,
            invalidRows,
        },
    });
}));
const getAllEmployees = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield candidate_service_1.EmployeeService.getAllCandidates(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee get",
    });
}));
const getSingleEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield candidate_service_1.EmployeeService.getSingleEmployee(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee get",
    });
}));
const updateEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield candidate_service_1.EmployeeService.updateEmployee(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200, success: true, data: result,
        message: "Employee updated",
    });
}));
const deleteEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield candidate_service_1.EmployeeService.deleteEmployee(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Employee deleted",
        data: null
    });
}));
exports.CandidateController = {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    uploadEmployeeFeedbackByFile,
    uploadEmployeeOnboardByFile
};
