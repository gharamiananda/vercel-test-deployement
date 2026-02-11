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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const candidate_interface_1 = require("./candidate.interface");
const candidate_model_1 = require("./candidate.model");
const createEmployee = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "pauload");
    return yield candidate_model_1.Candidate.create(payload);
});
const getAllCandidates = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateQuery = new QueryBuilder_1.default(candidate_model_1.Candidate.find(), query)
        .search(["firstName"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield candidateQuery.modelQuery;
    const meta = yield candidateQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield candidate_model_1.Candidate.findById(id);
});
const updateEmployee = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield candidate_model_1.Candidate.findByIdAndUpdate(id, payload, { new: true });
});
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield candidate_model_1.Candidate.findByIdAndDelete(id);
});
const findAndUpsertEmployeesFeedback = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = payloads.map(emp => ({
        updateOne: {
            filter: { personalEmail: emp.personalEmail },
            update: { $set: Object.assign(Object.assign({}, emp), { status: candidate_interface_1.ICandidateStatus.Feedback }) },
            upsert: true,
        },
    }));
    return yield candidate_model_1.Candidate.bulkWrite(operations, { ordered: false });
});
const findAndUpsertEmployeesOnboarding = (payloads) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = payloads.map(emp => ({
        updateOne: {
            filter: { personalEmail: emp.personalEmail },
            update: { $set: Object.assign(Object.assign({}, emp), { status: candidate_interface_1.ICandidateStatus.Onboarding }) },
            upsert: true,
        },
    }));
    return yield candidate_model_1.Candidate.bulkWrite(operations, { ordered: false });
});
exports.EmployeeService = {
    createEmployee,
    getAllCandidates,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    findAndUpsertEmployeesFeedback,
    findAndUpsertEmployeesOnboarding
};
