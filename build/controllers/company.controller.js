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
exports.CompanyController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let CompanyController = class CompanyController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.CompanyModel.find({});
                let items = itemsFound.map((item) => { return { id: item._id, name: item.name, licenseId: item.licenseId }; });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                console.error('Caught error', err);
                reject(err);
            }
        });
    }
    async getByCompanyName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`circal-api: getByCompany called ${name}`);
                let itemsFound = await dbobjects_1.CompanyModel.find().where('name').equals(name);
                let items = itemsFound.map((item) => { return { id: item._id, name: item.name, licenseId: item.licenseId }; });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                console.error('Caught error', err);
                reject(err);
            }
        });
    }
    async create(companyCreateRequest) {
        return new Promise(async (resolve, reject) => {
            console.log(`circal-api: Create Company Object called ${companyCreateRequest.licenseId}, ${companyCreateRequest.name}`);
            const item = new dbobjects_1.CompanyModel(companyCreateRequest);
            item.save();
            resolve();
        });
    }
    async update(id, companyUpdateRequest) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.CompanyModel.findOneAndUpdate({ _id: id }, companyUpdateRequest);
            resolve();
        });
    }
    async remove(id) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.CompanyModel.findByIdAndRemove(id);
            resolve();
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], CompanyController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query())
], CompanyController.prototype, "getByCompanyName", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], CompanyController.prototype, "create", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.Body())
], CompanyController.prototype, "update", null);
__decorate([
    tsoa_1.Delete('/{id}')
], CompanyController.prototype, "remove", null);
CompanyController = __decorate([
    tsoa_1.Route('/company')
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map