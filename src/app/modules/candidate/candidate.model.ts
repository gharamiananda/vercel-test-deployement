import { Schema, model } from "mongoose";
import { ICandidate, ICandidateStatus } from "./candidate.interface";

const addressSchema = new Schema(
    {
        address: String,
        country: String,
        state: String,
        city: String,
        pin: String,
    },
    { _id: false }
);

const candidateSchema = new Schema<ICandidate>(
    {
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

            enum: ICandidateStatus,
            default: ICandidateStatus.Progress,
        },
    },
    { timestamps: true }
);

export const Candidate = model<ICandidate>("Candidate", candidateSchema);
