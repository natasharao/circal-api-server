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
exports.MeetingController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let MeetingController = class MeetingController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.MeetingModel.find({});
                let items = itemsFound.map((item) => {
                    return { _id: item._id, title: item.title, startTime: item.startTime,
                        endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers,
                        recurring: item.recurring, done: item.done, cancelled: item.cancelled };
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
            let itemsFound = await dbobjects_1.MeetingModel.findById(id);
            resolve(itemsFound);
        });
    }
    async create(createRequest) {
        return new Promise(async (resolve, reject) => {
            const item = new dbobjects_1.MeetingModel(createRequest);
            await item.save(undefined, (err, item) => {
                if (item) {
                    let savedItem = { _id: item._id, title: item.title, startTime: item.startTime,
                        endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers,
                        recurring: item.recurring, done: item.done, cancelled: item.cancelled };
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
            await dbobjects_1.MeetingModel.findByIdAndRemove(id);
            resolve();
        });
    }
    async update(id, updateRequest) {
        return new Promise(async (resolve, reject) => {
            let query = { _id: id };
            let valuesToChange = { title: updateRequest.title, startTime: updateRequest.startTime,
                endTime: updateRequest.endTime, preMeetingAgenda: updateRequest.preMeetingAgenda,
                attendingUsers: updateRequest.attendingUsers, recurring: updateRequest.recurring,
                done: updateRequest.done, cancelled: updateRequest.cancelled };
            await dbobjects_1.MeetingModel.findOneAndUpdate(query, valuesToChange);
            resolve();
        });
    }
    async smartScheduling(id) {
        return new Promise(async (resolve, reject) => {
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], MeetingController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get('/{id}')
], MeetingController.prototype, "getById", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], MeetingController.prototype, "create", null);
__decorate([
    tsoa_1.Delete('/{id}')
], MeetingController.prototype, "remove", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.Body())
], MeetingController.prototype, "update", null);
__decorate([
    tsoa_1.Get('/schedule/{id}')
], MeetingController.prototype, "smartScheduling", null);
MeetingController = __decorate([
    tsoa_1.Route('/meeting')
], MeetingController);
exports.MeetingController = MeetingController;
//# sourceMappingURL=meeting.controller.js.map