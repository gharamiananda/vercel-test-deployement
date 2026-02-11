"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestMessageRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const guest_message_controller_1 = require("./guest-message.controller");
const router = (0, express_1.Router)();
router.get("/contact-messages", (0, auth_1.default)(user_interface_1.UserRole.SUPERADMIN), guest_message_controller_1.GuestMessageController.getContactMessages);
router.post("/contact-message", 
// validateRequest(OrganizationValidation.createOrganizationValidation),
guest_message_controller_1.GuestMessageController.craeteGuestMessage);
exports.GuestMessageRoutes = router;
