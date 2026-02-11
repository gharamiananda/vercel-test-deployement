"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRoutes = exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const bodyParser_1 = require("../../middleware/bodyParser");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const candidate_controller_1 = require("./candidate.controller");
const candidate_validation_1 = require("./candidate.validation");
const router = express_1.default.Router();
router.post("/create", multer_config_1.multerUpload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
]), bodyParser_1.parseBody, (0, validateRequest_1.default)(candidate_validation_1.createEmployeeZodSchema), candidate_controller_1.CandidateController.createEmployee);
const multer_1 = __importDefault(require("multer"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post("/upload-feedback-employee-csv", (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.SUPERADMIN), exports.upload.single("multipleFeedbackEmployeeCsv"), candidate_controller_1.CandidateController.uploadEmployeeFeedbackByFile);
router.post("/upload-onboarding-employee-csv", (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.SUPERADMIN), 
// multerUpload.single("multipleOnboardEmployeeCsv"),
exports.upload.single("multipleOnboardEmployeeCsv"), candidate_controller_1.CandidateController.uploadEmployeeOnboardByFile);
router.get("/", (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.USER, user_interface_1.UserRole.SUPERADMIN, user_interface_1.UserRole.INTERVIEWER), candidate_controller_1.CandidateController.getAllEmployees);
router.get("/:id", candidate_controller_1.CandidateController.getSingleEmployee);
router.patch("/:id", (0, validateRequest_1.default)(candidate_validation_1.updateEmployeeZodSchema), candidate_controller_1.CandidateController.updateEmployee);
router.delete("/:id", candidate_controller_1.CandidateController.deleteEmployee);
exports.CandidateRoutes = router;
