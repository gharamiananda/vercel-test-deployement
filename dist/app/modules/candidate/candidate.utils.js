"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRowToEmployeePayload = void 0;
const mapRowToEmployeePayload = (row) => {
    return {
        firstName: row.firstName,
        lastName: row.lastName,
        personalEmail: row.personalEmail || undefined,
        mobileNumber: row.mobileNumber || undefined,
        emergencyContact: row.emergencyName
            ? {
                name: row.emergencyName,
                number: row.emergencyNumber,
                relation: row.emergencyRelation,
            }
            : undefined,
        currentAddress: row.currentAddress
            ? {
                address: row.currentAddress,
                country: row.currentCountry,
                state: row.currentState,
                city: row.currentCity,
                pin: row.currentPin,
            }
            : undefined,
        permanentAddress: row.permanentAddress
            ? {
                address: row.permanentAddress,
                country: row.permanentCountry,
                state: row.permanentState,
                city: row.permanentCity,
                pin: row.permanentPin,
            }
            : undefined,
        bgvEmployeeConsent: row.bgvEmployeeConsent === "true",
        hasTwoWheeler: row.hasTwoWheeler === "true",
        sameAsCurrent: row.sameAsCurrent === "true",
    };
};
exports.mapRowToEmployeePayload = mapRowToEmployeePayload;
