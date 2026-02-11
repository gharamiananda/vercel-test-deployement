import QueryBuilder from "../../builder/QueryBuilder";
import { ICandidate, ICandidateStatus } from "./candidate.interface";
import { Candidate } from "./candidate.model";


const createEmployee = async (payload: ICandidate,) => {
    console.log(payload, "pauload")

    return await Candidate.create(payload);
};



const getAllCandidates = async (query: Record<string, string>) => {

    const candidateQuery = new QueryBuilder(Candidate.find(), query)
        .search(["firstName"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await candidateQuery.modelQuery;
    const meta = await candidateQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleEmployee = async (id: string) => {
    return await Candidate.findById(id);
};

const updateEmployee = async (id: string, payload: Partial<ICandidate>) => {
    return await Candidate.findByIdAndUpdate(id, payload, { new: true });
};

const deleteEmployee = async (id: string) => {
    return await Candidate.findByIdAndDelete(id);
};

const findAndUpsertEmployeesFeedback = async (payloads: ICandidate[]) => {
    const operations = payloads.map(emp => ({
        updateOne: {
            filter: { personalEmail: emp.personalEmail },
            update: { $set: { ...emp, status: ICandidateStatus.Feedback } },
            upsert: true,
        },
    }));

    return await Candidate.bulkWrite(operations, { ordered: false });
};


const findAndUpsertEmployeesOnboarding = async (payloads: ICandidate[]) => {
    const operations = payloads.map(emp => ({
        updateOne: {
            filter: { personalEmail: emp.personalEmail },
            update: { $set: { ...emp, status: ICandidateStatus.Onboarding } },
            upsert: true,
        },
    }));

    return await Candidate.bulkWrite(operations, { ordered: false });
};


export const EmployeeService = {
    createEmployee,
    getAllCandidates,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    findAndUpsertEmployeesFeedback,
    findAndUpsertEmployeesOnboarding
};
