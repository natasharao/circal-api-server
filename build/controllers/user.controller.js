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
exports.UserController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let UserController = class UserController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.UserModel.find({});
                let items = itemsFound.map((item) => {
                    return { _id: item._id, role: item.role, firstName: item.firstName,
                        lastName: item.lastName, username: item.username, email: item.email,
                        companyId: item.companyId, status: item.status, calendar: item.calendar };
                });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (resolve, reject) => {
            let itemsFound = await dbobjects_1.UserModel.findById(id);
            resolve(itemsFound);
        });
    }
    async create(createRequest) {
        return new Promise(async (resolve, reject) => {
            const item = new dbobjects_1.UserModel(createRequest);
            await item.save(undefined, (err, item) => {
                if (item) {
                    let savedItem = { _id: item._id, role: item.role, firstName: item.firstName,
                        lastName: item.lastName, username: item.username, email: item.email,
                        companyId: item.companyId, status: item.status, calendar: item.calendar };
                    resolve(savedItem);
                }
                else {
                    reject({});
                }
            });
        });
    }
    async remove(id) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.UserModel.findByIdAndRemove(id);
            resolve();
        });
    }
    async update(id, updateRequest) {
        return new Promise(async (resolve, reject) => {
            let query = { _id: id };
            await dbobjects_1.UserModel.findOneAndUpdate(query, updateRequest);
            resolve();
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], UserController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get('/get/{id}')
], UserController.prototype, "getById", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], UserController.prototype, "create", null);
__decorate([
    tsoa_1.Delete('/delete/{id}')
], UserController.prototype, "remove", null);
__decorate([
    tsoa_1.Put('/put/{id}'),
    __param(1, tsoa_1.Body())
], UserController.prototype, "update", null);
UserController = __decorate([
    tsoa_1.Route('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map