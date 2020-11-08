"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let LicenseController = class LicenseController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.LicenseModel.find({});
                let items = itemsFound.map((item) => { return { _id: item._id, licenseType: item.licenseType, code: item.code, numberOfUsers: item.numberOfUsers, activationDate: item.activationDate, expirationDate: item.expirationDate }; });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }
    async getAllStudentLicences() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.LicenseModel.find().where('licenseType').equals('STUDENT');
                let items = itemsFound.map((item) => { return { _id: item._id, licenseType: item.licenseType, code: item.code, numberOfUsers: item.numberOfUsers, activationDate: item.activationDate, expirationDate: item.expirationDate }; });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }
    async create(createRequest) {
        return new Promise(async (resolve, reject) => {
            const item = new dbobjects_1.LicenseModel(createRequest);
            await item.save(undefined, (err, item) => {
                if (item) {
                    let savedItem = { _id: item._id, licenseType: item.licenseType, code: item.code, numberOfUsers: item.numberOfUsers, activationDate: item.activationDate, expirationDate: item.expirationDate };
                    resolve(savedItem);
                }
                else {
                    reject({});
                }
            });
        });
    }
    async update(id, updateRequest) {
        return new Promise(async (resolve, reject) => {
            let query = { _id: id };
            let valuesToChange = { licenseType: updateRequest.licenseType, code: updateRequest.code, numberOfUsers: updateRequest.numberOfUsers, activationDate: updateRequest.activationDate, expirationDate: updateRequest.expirationDate };
            await dbobjects_1.LicenseModel.findOneAndUpdate(query, valuesToChange);
            resolve();
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], LicenseController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get('/student')
], LicenseController.prototype, "getAllStudentLicences", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], LicenseController.prototype, "create", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.Body())
], LicenseController.prototype, "update", null);
LicenseController = __decorate([
    tsoa_1.Route('/license')
], LicenseController);
exports.LicenseController = LicenseController;
//# sourceMappingURL=license.controller.js.map