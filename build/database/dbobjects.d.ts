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
    companyId: string;
    status: string;
    calendar: string;
}
interface Event {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    preMeetingAgenda: string;
    attendingUsers: string;
    recurring: boolean;
    done: boolean;
    cancelled: boolean;
    status: string;
}
interface UserAccountLinks {
    _id: string;
    userId: string;
    accountType: string;
    token: string;
}
declare const CompanyModel: mongoose.Model<mongoose.Document, {}>;
declare const LicenseModel: mongoose.Model<mongoose.Document, {}>;
declare const UserModel: mongoose.Model<mongoose.Document, {}>;
declare const UserAccountLinksModel: mongoose.Model<mongoose.Document, {}>;
declare const EventModel: mongoose.Model<mongoose.Document, {}>;
export { CompanyModel, Company };
export { LicenseModel, License };
export { UserModel, User };
export { UserAccountLinksModel, UserAccountLinks };
export { EventModel, Event };
//# sourceMappingURL=dbobjects.d.ts.map