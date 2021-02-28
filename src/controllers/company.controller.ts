import { CompanyModel, Company } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete, Path, Query } from 'tsoa';

//create or update should not have _id in it
export type CompanyCreationRequest = Pick<Company, "name" | "licenseId">;
export type CompanyUpdateRequest = Pick<Company, "name" | "licenseId">;

@Route('/company')
export class CompanyController extends Controller {
    
    @Get('/all')
	public async getAll(): Promise<Company[]> {
		return new Promise<Company[]> ( async (resolve,reject) => {
			try {
				let itemsFound: any = await CompanyModel.find({});
				let items = itemsFound.map((item: any) => { return {id: item._id, name: item.name, licenseId: item.licenseId }});
				resolve (items);
			} catch (err) {
				this.setStatus(500);
				console.error('Caught error', err);
				reject(err);
			}
		});
	}
	
	@Get()
	public async getByCompanyName(@Query() name: string): Promise<Company[]> {
		return new Promise<Company[]> ( async (resolve,reject) => {
			try {
				console.log(`circal-api: getByCompany called ${name}`);
				let itemsFound: any = await CompanyModel.find().where('name').equals(name);
				let items = itemsFound.map((item: any) => { return {id: item._id, name: item.name, licenseId: item.licenseId }});
				resolve (items);
			} catch (err) {
				this.setStatus(500);
				console.error('Caught error', err);
				reject(err);
			}
		});
	}
    
	@Post()
	public async create(@Body() companyCreateRequest: CompanyCreationRequest) : Promise<void> {
		return new Promise<void> ( async (resolve,reject) => {
			console.log(`circal-api: Create Company Object called ${companyCreateRequest.licenseId}, ${companyCreateRequest.name}`);
			const item = new CompanyModel(companyCreateRequest);
			item.save();
			resolve();
		});
	}

	@Put('/{id}')
	public async update(id: string, @Body() companyUpdateRequest: CompanyUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve,reject) => {
			await CompanyModel.findOneAndUpdate({_id: id}, companyUpdateRequest)
			resolve();
		});
	}

	@Delete('/{id}')
	public async remove(id: string) : Promise<void> {
		return new Promise<void> ( async (resolve,reject) => {
			await CompanyModel.findByIdAndRemove(id);
			resolve();
		});
		
	}
}
