import mongoose from 'mongoose';
interface Company {
    _id: string;
    name: string;
    licenseId: string;
}
interface License {
    _id: string;
    licenseType: string;
    code: string;
    numberOfUsers: number;
    activationDate: Date;
    expirationDate: Date;
}
interface User {
    _id: string;
    role: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    email: string;
    profileURL: string;
    companyId: string;
    status: string;
    cal_keys: string[][];
    calendar: string[];
    accountLinks: UserAccountLinks[];
    tasks: Task[];
}
interface Task {
    _id: string;
    taskName: string;
    dueDate: Date;
    completionStatus: string;
}
interface Meeting {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    preMeetingAgenda: string;
    attendingUsers: string[];
    recurring: boolean;
    done: boolean;
    cancelled: boolean;
    status: string;
}
interface UserAccountLinks {
    _id: string;
    accountType: string;
    token: string;
}
declare const CompanyModel: mongoose.Model<mongoose.Document<any>>;
declare const LicenseModel: mongoose.Model<mongoose.Document<any>>;
declare const UserModel: mongoose.Model<mongoose.Document<any>>;
declare const UserAccountLinksModel: mongoose.Model<mongoose.Document<any>>;
declare const MeetingModel: mongoose.Model<mongoose.Document<any>>;
declare const TaskModel: mongoose.Model<mongoose.Document<any>>;
export { CompanyModel, Company };
export { LicenseModel, License };
export { UserModel, User };
export { UserAccountLinksModel, UserAccountLinks };
export { MeetingModel, Meeting };
export { TaskModel, Task };
//# sourceMappingURL=dbobjects.d.ts.map