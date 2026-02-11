import express from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { CandidateController } from "./candidate.controller";
import {
    createEmployeeZodSchema,
    updateEmployeeZodSchema,
} from "./candidate.validation";

const router = express.Router();

router.post(
    "/create",

    multerUpload.fields([
        { name: "photo", maxCount: 1 },
        { name: "cv", maxCount: 1 },
    ]),
    parseBody,

    validateRequest(createEmployeeZodSchema),

    CandidateController.createEmployee
);

import multer from "multer";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});


router.post(
    "/upload-feedback-employee-csv",
    auth(UserRole.ADMIN, UserRole.SUPERADMIN),
    upload.single("multipleFeedbackEmployeeCsv"),
    CandidateController.uploadEmployeeFeedbackByFile
);


router.post(
    "/upload-onboarding-employee-csv",
    auth(UserRole.ADMIN, UserRole.SUPERADMIN),
    // multerUpload.single("multipleOnboardEmployeeCsv"),
    upload.single("multipleOnboardEmployeeCsv"),

    CandidateController.uploadEmployeeOnboardByFile

);

router.get("/",
    auth(UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN, UserRole.INTERVIEWER),
    CandidateController.getAllEmployees);
router.get("/:id", CandidateController.getSingleEmployee);

router.patch(
    "/:id",
    validateRequest(updateEmployeeZodSchema),
    CandidateController.updateEmployee
);

router.delete("/:id", CandidateController.deleteEmployee);

export const CandidateRoutes = router;
