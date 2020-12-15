"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const tsoa_1 = require("tsoa");
const company_controller_1 = require("./controllers/company.controller");
const event_controller_1 = require("./controllers/event.controller");
const license_controller_1 = require("./controllers/license.controller");
const user_controller_1 = require("./controllers/user.controller");
const useraccountlinks_controller_1 = require("./controllers/useraccountlinks.controller");
const models = {
    "Company": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "licenseId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_Company.name-or-licenseId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "licenseId": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "CompanyCreationRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Company.name-or-licenseId_", "validators": {} },
    },
    "CompanyUpdateRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Company.name-or-licenseId_", "validators": {} },
    },
    "Event": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "startTime": { "dataType": "datetime", "required": true },
            "endTime": { "dataType": "datetime", "required": true },
            "preMeetingAgenda": { "dataType": "string", "required": true },
            "attendingUsers": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "recurring": { "dataType": "boolean", "required": true },
            "done": { "dataType": "boolean", "required": true },
            "cancelled": { "dataType": "boolean", "required": true },
            "status": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_Event.title-or-startTime-or-endTime-or-preMeetingAgenda-or-attendingUsers-or-recurring-or-done-or-cancelled_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "title": { "dataType": "string", "required": true }, "startTime": { "dataType": "datetime", "required": true }, "endTime": { "dataType": "datetime", "required": true }, "preMeetingAgenda": { "dataType": "string", "required": true }, "attendingUsers": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "recurring": { "dataType": "boolean", "required": true }, "done": { "dataType": "boolean", "required": true }, "cancelled": { "dataType": "boolean", "required": true } }, "validators": {} },
    },
    "EventCreationRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Event.title-or-startTime-or-endTime-or-preMeetingAgenda-or-attendingUsers-or-recurring-or-done-or-cancelled_", "validators": {} },
    },
    "EventUpdateRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Event.title-or-startTime-or-endTime-or-preMeetingAgenda-or-attendingUsers-or-recurring-or-done-or-cancelled_", "validators": {} },
    },
    "License": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "licenseType": { "dataType": "string", "required": true },
            "code": { "dataType": "string", "required": true },
            "numberOfUsers": { "dataType": "double", "required": true },
            "activationDate": { "dataType": "datetime", "required": true },
            "expirationDate": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_License.licenseType-or-code-or-numberOfUsers-or-activationDate-or-expirationDate_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "licenseType": { "dataType": "string", "required": true }, "code": { "dataType": "string", "required": true }, "numberOfUsers": { "dataType": "double", "required": true }, "activationDate": { "dataType": "datetime", "required": true }, "expirationDate": { "dataType": "datetime", "required": true } }, "validators": {} },
    },
    "LicenseCreationRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_License.licenseType-or-code-or-numberOfUsers-or-activationDate-or-expirationDate_", "validators": {} },
    },
    "LicenseUpdateRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_License.licenseType-or-code-or-numberOfUsers-or-activationDate-or-expirationDate_", "validators": {} },
    },
    "User": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "role": { "dataType": "string", "required": true },
            "username": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "passwordHash": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "companyId": { "dataType": "string", "required": true },
            "status": { "dataType": "string", "required": true },
            "calendar": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_User.role-or-firstName-or-lastName-or-email-or-companyId-or-status-or-calendar_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "role": { "dataType": "string", "required": true }, "firstName": { "dataType": "string", "required": true }, "lastName": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "companyId": { "dataType": "string", "required": true }, "status": { "dataType": "string", "required": true }, "calendar": { "dataType": "array", "array": { "dataType": "string" }, "required": true } }, "validators": {} },
    },
    "UserCreationRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_User.role-or-firstName-or-lastName-or-email-or-companyId-or-status-or-calendar_", "validators": {} },
    },
    "UserUpdateRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_User.role-or-firstName-or-lastName-or-email-or-companyId-or-status-or-calendar_", "validators": {} },
    },
    "UserAccountLinks": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "userId": { "dataType": "string", "required": true },
            "accountType": { "dataType": "string", "required": true },
            "token": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_UserAccountLinks.userId-or-accountType-or-token_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "string", "required": true }, "accountType": { "dataType": "string", "required": true }, "token": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "UserAccountLinksCreationRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_UserAccountLinks.userId-or-accountType-or-token_", "validators": {} },
    },
    "Pick_UserAccountLinks.userId-or-accountType_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "string", "required": true }, "accountType": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "UserAccountLinksUpdateRequest": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_UserAccountLinks.userId-or-accountType_", "validators": {} },
    },
};
const validationService = new tsoa_1.ValidationService(models);
function RegisterRoutes(app) {
    app.get('/company/all', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new company_controller_1.CompanyController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/company', function (request, response, next) {
        const args = {
            name: { "in": "query", "name": "name", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new company_controller_1.CompanyController();
        const promise = controller.getByCompanyName.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/company', function (request, response, next) {
        const args = {
            companyCreateRequest: { "in": "body", "name": "companyCreateRequest", "required": true, "ref": "CompanyCreationRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new company_controller_1.CompanyController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.put('/company/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            companyUpdateRequest: { "in": "body", "name": "companyUpdateRequest", "required": true, "ref": "CompanyUpdateRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new company_controller_1.CompanyController();
        const promise = controller.update.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/company/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new company_controller_1.CompanyController();
        const promise = controller.remove.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/event/all', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/event/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.getById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/event', function (request, response, next) {
        const args = {
            createRequest: { "in": "body", "name": "createRequest", "required": true, "ref": "EventCreationRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/event/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.remove.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.put('/event/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            updateRequest: { "in": "body", "name": "updateRequest", "required": true, "ref": "EventUpdateRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.update.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/event/schedule/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new event_controller_1.EventController();
        const promise = controller.smartScheduling.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/license/all', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new license_controller_1.LicenseController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/license/student', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new license_controller_1.LicenseController();
        const promise = controller.getAllStudentLicences.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/license', function (request, response, next) {
        const args = {
            createRequest: { "in": "body", "name": "createRequest", "required": true, "ref": "LicenseCreationRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new license_controller_1.LicenseController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.put('/license/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            updateRequest: { "in": "body", "name": "updateRequest", "required": true, "ref": "LicenseUpdateRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new license_controller_1.LicenseController();
        const promise = controller.update.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/user/all', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new user_controller_1.UserController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/user/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new user_controller_1.UserController();
        const promise = controller.getById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/user', function (request, response, next) {
        const args = {
            createRequest: { "in": "body", "name": "createRequest", "required": true, "ref": "UserCreationRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new user_controller_1.UserController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/user/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new user_controller_1.UserController();
        const promise = controller.remove.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.put('/user/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            updateRequest: { "in": "body", "name": "updateRequest", "required": true, "ref": "UserUpdateRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new user_controller_1.UserController();
        const promise = controller.update.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/useraccountlinks/all', function (request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new useraccountlinks_controller_1.UserAccountLinksController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/useraccountlinks', function (request, response, next) {
        const args = {
            createRequest: { "in": "body", "name": "createRequest", "required": true, "ref": "UserAccountLinksCreationRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new useraccountlinks_controller_1.UserAccountLinksController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.put('/useraccountlinks/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            updateRequest: { "in": "body", "name": "updateRequest", "required": true, "ref": "UserAccountLinksUpdateRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new useraccountlinks_controller_1.UserAccountLinksController();
        const promise = controller.update.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus();
            }
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    function returnHandler(response, statusCode, data, headers = {}) {
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data || data === false) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "silently-remove-extras" });
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map