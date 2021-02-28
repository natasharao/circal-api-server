import { License } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type LicenseCreationRequest = Pick<License, "licenseType" | "code" | "numberOfUsers" | "activationDate" | "expirationDate">;
export declare type LicenseUpdateRequest = Pick<License, "licenseType" | "code" | "numberOfUsers" | "activationDate" | "expirationDate">;
export declare class LicenseController extends Controller {
    getAll(): Promise<License[]>;
    getAllStudentLicences(): Promise<License[]>;
    create(createRequest: LicenseCreationRequest): Promise<License>;
    update(id: string, updateRequest: LicenseUpdateRequest): Promise<void>;
}
//# sourceMappingURL=license.controller.d.ts.map