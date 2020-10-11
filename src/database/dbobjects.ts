import mongoose from 'mongoose';

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
    companyId: string;
    status: string; // invited, active, inactive
}

interface UserAccountLinks {
    _id: string;
    userId: string;
    accountType: string; //google, outlook, facebook
    token: string; //access token from the providers
}

// all schemas 
const CompanySchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true },
    licenseId:  { type: String, index: true, unique: true }
});

const LicenseSchema = new mongoose.Schema({
    licenseType: { type: String, index: true, enumValues: ['student','teams','enterprise']}, 
    code: String, //License sharing code
    numberOfUsers: Number,
    activationDate: Date,
    expirationDate: Date
});

const UserSchema = new mongoose.Schema({
    role: { type: String, index: true, enumValues: ['default','admin'] },
    username: { type: String, index: true, unique: true},
    firstName: { type: String, index: true, unique: true},
    lastName: { type: String, index: true, unique: true},
    passwordHash: { type: String, index: true },
    email:  { type: String, index: true },
    companyId: String,
    status:  { type: String, index: true, enumValues: ['invited','active','inactive'] } 
});

const UserAccountLinksSchema = new mongoose.Schema({
    userId: String,
    accountType: String, //google, outlook, facebook
    token: String //access token from the providers
});

const CompanyModel = mongoose.model('Company', CompanySchema);
const LicenseModel = mongoose.model('License', LicenseSchema);
const UserModel = mongoose.model('User', UserSchema);
const UserAccountLinksModel = mongoose.model('UserAccountLinks', UserAccountLinksSchema);

//export models and interface so our controllers can use them
export { CompanyModel, Company }
export { LicenseModel, License }
export { UserModel, User}
export { UserAccountLinksModel, UserAccountLinks }
