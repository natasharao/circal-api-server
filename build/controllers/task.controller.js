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
exports.TaskController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let TaskController = class TaskController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.TaskModel.find({});
                let items = itemsFound.mao((item) => {
                    return {
                        taskName: item.taskName,
                        dueDate: item.dueDate,
                        completionStatus: item.completionStatus
                    };
                });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }
    async getByStatus(completionStatus) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`circal-api: getByStatus called ${completionStatus}`);
                let itemsFound = await dbobjects_1.TaskModel.find().where('completionStatus').equals(completionStatus);
                let items = itemsFound.map((item) => {
                    return {
                        taskName: item.taskName,
                        dueDate: item.dueDate,
                        completionStatus: item.completionStatus
                    };
                });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                console.error('Caught error', err);
                reject(err);
            }
        });
    }
    async create(createRequest) {
        return new Promise(async (resolve, reject) => {
            const item = new dbobjects_1.TaskModel(createRequest);
            await item.save(undefined, (err, item) => {
                if (item) {
                    let savedItem = { taskName: item.taskName,
                        dueDate: item.dueDate, completionStatus: item.completionStatus };
                    resolve(savedItem);
                }
                else {
                    reject({});
                }
            });
        });
    }
    async update(id, taskUpdateRequest) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.TaskModel.findOneAndUpdate({ _id: id }, taskUpdateRequest);
            resolve();
        });
    }
    async remove(id) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.TaskModel.findByIdAndRemove(id);
            resolve();
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], TaskController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get('/get/{completionStatus}'),
    __param(0, tsoa_1.Query())
], TaskController.prototype, "getByStatus", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], TaskController.prototype, "create", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.Body())
], TaskController.prototype, "update", null);
__decorate([
    tsoa_1.Delete('/{id}')
], TaskController.prototype, "remove", null);
TaskController = __decorate([
    tsoa_1.Route('/task')
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map