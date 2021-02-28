import { User } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type UserCreationRequest = Pick<User, "role" | "firstName" | "lastName" | "email" | "companyId" | "status" | "calendar" | "tasks">;
export declare type UserUpdateRequest = Pick<User, "role" | "firstName" | "lastName" | "email" | "companyId" | "status" | "calendar" | "tasks">;
export declare class UserController extends Controller {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    create(createRequest: UserCreationRequest): Promise<User>;
    remove(id: string): Promise<void>;
    update(id: string, updateRequest: UserUpdateRequest): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map