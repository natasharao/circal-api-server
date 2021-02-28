"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = exports.MeetingModel = exports.UserAccountLinksModel = exports.UserModel = exports.LicenseModel = exports.CompanyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CompanySchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    name: { type: String, index: true, unique: true },
    licenseId: { type: String, index: true, unique: true }
});
const TaskSchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    taskName: { type: String, index: true, unique: false },
    dueDate: Date,
    completionStatus: String
});
const LicenseSchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    licenseType: { type: String, index: true, enumValues: ['student', 'teams', 'enterprise'] },
    code: String,
    numberOfUsers: Number,
    activationDate: Date,
    expirationDate: Date
});
const UserAccountLinksSchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    accountType: String,
    token: String
});
const MeetingSchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    title: String,
    startTime: Date,
    endTime: Date,
    preMeetingAgenda: String,
    attendingUsers: { type: [String], index: true },
    recurring: Boolean,
    done: Boolean,
    cancelled: Boolean
});
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: String, index: true, required: true, auto: true },
    role: { type: String, index: true, enumValues: ['default', 'admin'] },
    username: { type: String, index: true, unique: true },
    firstName: { type: String, index: true, unique: true },
    lastName: { type: String, index: true, unique: true },
    passwordHash: { type: String, index: true },
    email: { type: String, index: true },
    companyId: String,
    status: { type: String, index: true, enumValues: ['invited', 'active', 'inactive'] },
    cal_keys: { type: [[String]], index: true },
    calendar: { type: [String], index: true },
    accountLinks: [UserAccountLinksSchema],
    tasks: [TaskSchema]
});
const CompanyModel = mongoose_1.default.model('Company', CompanySchema);
exports.CompanyModel = CompanyModel;
const LicenseModel = mongoose_1.default.model('License', LicenseSchema);
exports.LicenseModel = LicenseModel;
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.UserModel = UserModel;
const UserAccountLinksModel = mongoose_1.default.model('UserAccountLinks', UserAccountLinksSchema);
exports.UserAccountLinksModel = UserAccountLinksModel;
const MeetingModel = mongoose_1.default.model('Meeting', MeetingSchema);
exports.MeetingModel = MeetingModel;
const TaskModel = mongoose_1.default.model('Task', TaskSchema);
exports.TaskModel = TaskModel;
//# sourceMappingURL=dbobjects.js.map