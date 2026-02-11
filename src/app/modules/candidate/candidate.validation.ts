import { z } from "zod";

const addressSchema = z.object({
    address: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    pin: z.string().optional(),
});

export const createEmployeeZodSchema = z.object({
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        personalEmail: z.string().email().optional(),
        mobileNumber: z.string().optional(),

        emergencyContact: z.object({
            name: z.string().optional(),
            number: z.string().optional(),
            relation: z.string().optional(),
        }).optional(),

        currentAddress: addressSchema.optional(),
        permanentAddress: addressSchema.optional(),

        bgvEmployeeConsent: z.boolean().optional(),
        hasTwoWheeler: z.boolean().optional(),
        sameAsCurrent: z.boolean().optional(),
    }),
});

export const updateEmployeeZodSchema = createEmployeeZodSchema.partial();
