import mongoose, {Types} from 'mongoose';

interface Company {
    _id: string;
    name: string;
    licenseId: string;
}

interface License {
    _id: string;
    licenseType: string; //(student, teams, enterprise)
    code: string; //License sharing code
    numberOfUsers: number;
    activationDate: Date;
    expirationDate: Date;
}

interface User {
    _id: string;
    role: string; //basic, admin
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    email: string;
    profileURL: string;
    companyId: string;
    status: string; // invited, active, inactive
    cal_keys: string[][];
    calendar: string[]; /** should be array of strings -- see if any issues**/
    accountLinks: UserAccountLinks[]
}

interface Task {
    _id: string;
    userId: string;
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
    attendingUsers: string[]; /** should be array of strings -- see if any issues**/
    recurring: boolean;
    done: boolean;
    cancelled: boolean;
    status: string; // upcoming, inprog, done, cancelled
}

interface UserAccountLinks {
    _id: string;
    accountType: string; //google, outlook, facebook
    token: string; //access token from the providers
}

// all schemas 
const CompanySchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true },
    licenseId:  { type: String, index: true, unique: true }
});

const TaskSchema = new mongoose.Schema({
    taskName: {type: String, index: true, unique: false},
    userId: String,
    dueDate: Date,
    completionStatus: {type: String, enumValues: ['notstarted','inprogress','completed']}
})

const LicenseSchema = new mongoose.Schema({
    licenseType: { type: String, index: true, enumValues: ['student','teams','enterprise']}, 
    code: String, //License sharing code
    numberOfUsers: Number,
    activationDate: Date,
    expirationDate: Date
});

const UserAccountLinksSchema = new mongoose.Schema({
    accountType: String, //google, outlook, facebook   TODO CHANGE to enum??
    token: String //access token from the providers
});

const MeetingSchema = new mongoose.Schema({
    title: String,
    startTime: Date,
    endTime: Date,
    preMeetingAgenda: String,
    attendingUsers: {type: [String], index: true },
    recurring: Boolean,
    done: Boolean,
    cancelled: Boolean
});

const UserSchema = new mongoose.Schema({
    role: { type: String, index: true, enumValues: ['default','admin'] },
    username: { type: String, index: true, unique: true},
    firstName: { type: String, index: true, unique: true},
    lastName: { type: String, index: true, unique: true},
    passwordHash: { type: String, index: true },
    email:  { type: String, index: true },
    companyId: String,
    status:  { type: String, index: true, enumValues: ['invited','active','inactive'] }, 
    cal_keys: {type: [[String]], index: true},
    calendar: { type: [String], index: true },
    accountLinks: [UserAccountLinksSchema],
});


const CompanyModel = mongoose.model('Company', CompanySchema);
const LicenseModel = mongoose.model('License', LicenseSchema);
const UserModel = mongoose.model('User', UserSchema);
const UserAccountLinksModel = mongoose.model('UserAccountLinks', UserAccountLinksSchema);
const MeetingModel = mongoose.model('Meeting', MeetingSchema);
const TaskModel = mongoose.model('Task', TaskSchema);


//export models and interface so our controllers can use them
export { CompanyModel, Company }
export { LicenseModel, License }
export { UserModel, User}
export { UserAccountLinksModel, UserAccountLinks }
export { MeetingModel , Meeting }
export { TaskModel, Task }
