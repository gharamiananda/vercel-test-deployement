"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const mongoose_1 = require("mongoose");
const candidate_interface_1 = require("./candidate.interface");
const addressSchema = new mongoose_1.Schema({
    address: String,
    country: String,
    state: String,
    city: String,
    pin: String,
}, { _id: false });
const candidateSchema = new mongoose_1.Schema({
    photo: String,
    cv: String,
    prefix: String,
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    dateOfBirth: String,
    gender: String,
    bloodGroup: String,
    nationality: String,
    caste: String,
    maritalStatus: String,
    personalEmail: String,
    isdCode: { type: String, default: "+91" },
    mobileNumber: String,
    emergencyContact: {
        name: String,
        number: String,
        relation: String,
    },
    panNumber: String,
    aadharNumber: String,
    uanNumber: String,
    currentAddress: addressSchema,
    permanentAddress: addressSchema,
    employmentCategory: String,
    educationDetails: {
        qualification: String,
        qualificationType: String,
        yearOfStarting: String,
        yearOfPassing: String,
        universityOrBoard: String,
        collegeOrSchool: String,
        gradeOrCgpaOrPercentage: String,
    },
    experienceDetails: {
        lastCompany: String,
        lastDesignation: String,
        experienceFrom: String,
        experienceTo: String,
        totalExperience: String,
    },
    fatherName: String,
    motherName: String,
    referralName: String,
    bgvEmployeeConsent: { type: Boolean, default: false },
    hasTwoWheeler: { type: Boolean, default: false },
    sameAsCurrent: { type: Boolean, default: false },
    status: {
        type: String,
        enum: candidate_interface_1.ICandidateStatus,
        default: candidate_interface_1.ICandidateStatus.Progress,
    },
}, { timestamps: true });
exports.Candidate = (0, mongoose_1.model)("Candidate", candidateSchema);
