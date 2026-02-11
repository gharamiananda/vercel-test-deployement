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
exports.guestMessageService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const emailHelper_1 = require("../../utils/emailHelper");
const guest_message_model_1 = __importDefault(require("./guest-message.model"));
const craeteGuestMessage = (OrganizationData) => __awaiter(void 0, void 0, void 0, function* () {
    let messages;
    try {
        messages = yield guest_message_model_1.default.create(OrganizationData);
        const feedbackEmailContent = yield emailHelper_1.EmailHelper.createEmailContent(OrganizationData, "GUEST_MESSAGE_FEEDBACK");
        yield emailHelper_1.EmailHelper.sendEmailFromAdmin(OrganizationData.email, feedbackEmailContent, "Contact Us");
        const emailContent = yield emailHelper_1.EmailHelper.createEmailContent(OrganizationData, "GUEST_MESSAGE");
        yield emailHelper_1.EmailHelper.sendEmailFromAdmin('admin@netlifycon-hr.in', emailContent, "Contact Us");
    }
    catch (error) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send OTP email. Please try again later.");
    }
    return messages;
});
const getContactMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const organization = yield guest_message_model_1.default.find();
    return organization;
});
exports.guestMessageService = {
    craeteGuestMessage,
    getContactMessages,
};
