
export interface IAddress {
    address: string;
    country: string;
    state: string;
    city: string;
    pin: string;
}

export interface IEmergencyContact {
    name: string;
    number: string;
    relation: string;
}
export enum ICandidateStatus { Progress = "progress", Feedback = "feedback-done", Onboarding = "onboarding" };

export interface IEducationDetails {
    qualification: string;
    qualificationType: string;
    yearOfStarting: string;
    yearOfPassing: string;
    universityOrBoard: string;
    collegeOrSchool: string;
    gradeOrCgpaOrPercentage: string;
}

export interface IExperienceDetails {
    lastCompany: string;
    lastDesignation: string;
    experienceFrom: string;
    experienceTo: string;
    totalExperience: string;
}

export interface ICandidate {
    photo?: string;
    cv?: string;
    prefix?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: string;
    bloodGroup?: string;
    nationality?: string;
    caste?: string;
    maritalStatus?: string;
    personalEmail?: string;
    isdCode?: string;
    mobileNumber?: string;
    emergencyContact?: IEmergencyContact;
    panNumber?: string;
    aadharNumber?: string;
    uanNumber?: string;
    currentAddress?: IAddress;
    permanentAddress?: IAddress;
    employmentCategory?: string;
    educationDetails?: IEducationDetails;
    experienceDetails?: IExperienceDetails;
    fatherName?: string;
    motherName?: string;
    referralName?: string;
    bgvEmployeeConsent?: boolean;
    hasTwoWheeler?: boolean;
    sameAsCurrent?: boolean;
    status: ICandidateStatus
}
