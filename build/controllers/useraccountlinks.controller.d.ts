import { UserAccountLinks, License } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type UserAccountLinksCreationRequest = Pick<UserAccountLinks, "userId" | "accountType" | "token">;
export declare type UserAccountLinksUpdateRequest = Pick<UserAccountLinks, "userId" | "accountType">;
export declare class UserAccountLinksController extends Controller {
    getAll(): Promise<License[]>;
    create(createRequest: UserAccountLinksCreationRequest): Promise<UserAccountLinks>;
    update(id: string, updateRequest: UserAccountLinksUpdateRequest): Promise<void>;
}
//# sourceMappingURL=useraccountlinks.controller.d.ts.map