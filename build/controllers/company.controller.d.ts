import { Company } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type CompanyCreationRequest = Pick<Company, "name" | "licenseId">;
export declare type CompanyUpdateRequest = Pick<Company, "name" | "licenseId">;
export declare class CompanyController extends Controller {
    getAll(): Promise<Company[]>;
    getByCompanyName(name: string): Promise<Company[]>;
    create(companyCreateRequest: CompanyCreationRequest): Promise<void>;
    update(id: string, companyUpdateRequest: CompanyUpdateRequest): Promise<void>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=company.controller.d.ts.map