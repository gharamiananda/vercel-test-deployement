"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeZodSchema = exports.createEmployeeZodSchema = void 0;
const zod_1 = require("zod");
const addressSchema = zod_1.z.object({
    address: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    pin: zod_1.z.string().optional(),
});
exports.createEmployeeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        personalEmail: zod_1.z.string().email().optional(),
        mobileNumber: zod_1.z.string().optional(),
        emergencyContact: zod_1.z.object({
            name: zod_1.z.string().optional(),
            number: zod_1.z.string().optional(),
            relation: zod_1.z.string().optional(),
        }).optional(),
        currentAddress: addressSchema.optional(),
        permanentAddress: addressSchema.optional(),
        bgvEmployeeConsent: zod_1.z.boolean().optional(),
        hasTwoWheeler: zod_1.z.boolean().optional(),
        sameAsCurrent: zod_1.z.boolean().optional(),
    }),
});
exports.updateEmployeeZodSchema = exports.createEmployeeZodSchema.partial();
