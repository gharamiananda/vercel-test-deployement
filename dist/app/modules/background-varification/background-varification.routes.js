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
exports.BackgroundVarificationRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = __importDefault(require("../../config/multer.config"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const background_varification_controller_1 = require("./background-varification.controller");
const background_varification_model_1 = __importDefault(require("./background-varification.model"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const multerUpload = (0, multer_1.default)({ storage });
router.post("/upload-bulk-background-varificaton-csv", 
// auth(UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN),
multerUpload.single("backgroundVarificationCsv"), background_varification_controller_1.backgroundVarificationController.createBulkBackgroundVarification);
router.patch("/update-details/:employeeId", (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.USER, user_interface_1.UserRole.SUPERADMIN), background_varification_controller_1.backgroundVarificationController.updateBackgroundVarification);
router.post("/upload-required-documents/:id", multer_config_1.default.fields([
    { name: "pan", maxCount: 1 },
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "experience", maxCount: 1 },
    { name: "education", maxCount: 1 },
    { name: "photo", maxCount: 1 },
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    // Helper to extract Cloudinary URL (if file was uploaded)
    const getFileUrl = (field) => {
        var _a;
        const file = (_a = files === null || files === void 0 ? void 0 : files[field]) === null || _a === void 0 ? void 0 : _a[0];
        return file ? file.path : undefined; // Cloudinary URL
    };
    // Build payload directly matching schema fields
    const payload = {
        pan: getFileUrl("pan"),
        aadharFront: getFileUrl("aadharFront"),
        aadharBack: getFileUrl("aadharBack"),
        education: getFileUrl("education"),
        experience: getFileUrl("experience"),
        photo: getFileUrl("photo"),
    };
    try {
        const updated = yield background_varification_model_1.default.findByIdAndUpdate(req.params.id, payload, { new: true });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Background verification record not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Documents uploaded successfully.",
            userId: req.params.id,
            documents: payload,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload documents.",
            error: "error?.message",
        });
    }
}));
router.delete("/upload-required-documents/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const updated = yield background_varification_model_1.default.findByIdAndUpdate(req.params.id, payload, { new: true });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Background verification record not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message updated successfully.",
            userId: req.params.id,
            documents: updated, // Returning updated document details (can include message, etc.)
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update message.",
            error: error || "Unknown error",
        });
    }
}));
router.get("/", 
// auth(UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN, UserRole.VERIFIER),
background_varification_controller_1.backgroundVarificationController.getBackgroundVarificationAll);
router.get("/dashboard-payslip", (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.USER, user_interface_1.UserRole.SUPERADMIN), background_varification_controller_1.backgroundVarificationController.getThisMonthPayslipCount);
const employeeVerificationData = [
    {
        "employeeName": "Om Praksh Roy",
        "employeeId": "WROR7369",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Pradipta Haldar",
        "employeeId": "WRPH1427",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Pankaj Kumar Ray",
        "employeeId": "WRPR5728",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Ravikumara D",
        "employeeId": "WRRD3444",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Rahul Das",
        "employeeId": "WRRD3745",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Ramit Dutta",
        "employeeId": "WRRD8087",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "RAJ KESARWANI",
        "employeeId": "WRRK4653",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Rohit Kumar",
        "employeeId": "WRRK6477",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Rupanjan Kayal",
        "employeeId": "WRRK7778",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Romij Rahaman Molla",
        "employeeId": "WRRM9287",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Rangaswamy N",
        "employeeId": "WRRN4450",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Ripon Paul",
        "employeeId": "WRRP2545",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Rajesh Ray",
        "employeeId": "WRRR0027",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Riddho Ray",
        "employeeId": "WRRR1944",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Raghavendra Darshan S",
        "employeeId": "WRRS4034",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "ROHIT SONKAR",
        "employeeId": "WRRS6051",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Roni Saha",
        "employeeId": "WRRS9828",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Sanjay Adhikary",
        "employeeId": "WRSA5280",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "SAGAR ROY BISWAS",
        "employeeId": "WRSB4290",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Shibam Das",
        "employeeId": "WRSD9224",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Shibnath Ghosal",
        "employeeId": "WRSG3548",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Subhabrata Ghosh",
        "employeeId": "WRSG5006",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Shashank Gharti",
        "employeeId": "WRSG7554",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Sk Sahid Haque",
        "employeeId": "WRSH3064",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Siddharth Jha",
        "employeeId": "WRSJ2771",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Subhas Kumar Jha",
        "employeeId": "WRSJ3555",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Saurabh Kapoor",
        "employeeId": "WRSK3008",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Sandeep Kumar",
        "employeeId": "WRSK4355",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Salim Khan",
        "employeeId": "WRSK4710",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Subhadip Mukherjee",
        "employeeId": "WRSM2055",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Sayak Mukherjee",
        "employeeId": "WRSM4150",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Shree nag Jain N",
        "employeeId": "WRSN5313",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Soumodeep Roy",
        "employeeId": "WRSR8981",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Soma Shekar R",
        "employeeId": "WRSR9063",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Sandeep Kumar Rana",
        "employeeId": "WRSR9521",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Sandeep Sharma",
        "employeeId": "WRSS0477",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Shreyansh Sharma",
        "employeeId": "WRSS1685",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Shivank Srivastava",
        "employeeId": "WRSS4262",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Shivam Shaw",
        "employeeId": "WRSS9220",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Sukumar Sarkhel",
        "employeeId": "WRSS9637",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Tushar Agarwal",
        "employeeId": "WRTA1497",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Vishal Dubey",
        "employeeId": "WRVD2345",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Pooja Ratawa",
        "employeeId": "WRPR9922",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Anushka Sanwal",
        "employeeId": "WRAS2911",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Himani Sharma",
        "employeeId": "WRHS0774",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Laxmi Lasiyal",
        "employeeId": "WRLL5649",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Manvi Devaiah",
        "employeeId": "WRMD3590",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "NEHA DAS",
        "employeeId": "WRND2502",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Nikita Verma",
        "employeeId": "WRNV0626",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Payal Barui",
        "employeeId": "WRPB1396",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Prerna Jaiswal",
        "employeeId": "WRPJ9939",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Rimi Banerjee",
        "employeeId": "WRRB6893",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Rani Gupta",
        "employeeId": "WRRG0871",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Ragini Kumari",
        "employeeId": "WRRK7728",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Rishika saha",
        "employeeId": "WRRS4428",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Sudatta Bhattacharya",
        "employeeId": "WRSB0447",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Sanjana Gupta",
        "employeeId": "WRSG4164",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "",
        "criminalStatus": "Verified",
        "verificationStatus": "pending"
    },
    {
        "employeeName": "Shyamala G",
        "employeeId": "WRSG4342",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Shrabani Mazumder",
        "employeeId": "WRSM0287",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    },
    {
        "employeeName": "Shruthi M",
        "employeeId": "WRSM2787",
        "addressStatus": "Verified",
        "educationStatus": "Verified",
        "panStatus": "Verified",
        "experienceStatus": "Verified",
        "criminalStatus": "Verified",
        "verificationStatus": "completed"
    }
];
router.get("/complete-verification-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = employeeVerificationData;
    try {
        let modifiedCount = 0;
        for (const emp of employees) {
            const result = yield background_varification_model_1.default.updateOne({ employeeId: emp.employeeId }, {
                $set: {
                    adharStatus: "Verified",
                    educationStatus: emp.educationStatus || "",
                    panStatus: emp.panStatus || "",
                    experienceStatus: emp.experienceStatus || "",
                    criminalStatus: emp.criminalStatus || "",
                    addressStatus: emp.addressStatus || "",
                    verificationStatus: "completed",
                }
            });
            if (result.modifiedCount > 0) {
                modifiedCount++;
            }
        }
        return res.status(200).json({
            success: true,
            message: "Employee verification details updated successfully.",
            modifiedCount,
        });
    }
    catch (error) {
        console.error("Error updating verification fields:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update verification details.",
            error: error.message,
        });
    }
}));
exports.BackgroundVarificationRoutes = router;
