import { LicenseModel, License } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete } from 'tsoa';

export type LicenseCreationRequest = Pick<License, "licenseType" | "code" | "numberOfUsers" | "activationDate" | "expirationDate">;
export type LicenseUpdateRequest = Pick<License, "licenseType" | "code" | "numberOfUsers" | "activationDate" | "expirationDate">;

@Route('/license')
export class LicenseController extends Controller {

	@Get('/all')
	public async getAll(): Promise<License[]> {
		return new Promise<License[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await LicenseModel.find({});
				let items: License[] = itemsFound.map((item : any) => { return {_id: item._id, licenseType: item.licenseType, 
					code: item.code, numberOfUsers: item.numberOfUsers, activationDate: 
					item.activationDate,expirationDate: item.expirationDate}});
				resolve(items);
			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
	}

	@Get('/student')
	public async getAllStudentLicences(): Promise<License[]> {
		return new Promise<License[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await LicenseModel.find().where('licenseType').equals('STUDENT');
				let items: License[] = itemsFound.map((item : any) => { return {_id: item._id, licenseType: item.licenseType, code: item.code, numberOfUsers: item.numberOfUsers, activationDate: item.activationDate,expirationDate: item.expirationDate}});
				resolve(items);
			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
	}

	@Post()
	public async create(@Body() createRequest: LicenseCreationRequest) : Promise<License> {
		return new Promise<License> ( async (resolve, reject) => {
			const item = new LicenseModel(createRequest);
			//another way to save and check for errors while saving
			await item.save(undefined, (err: any, item: any) => {
				if (item) {
					let savedItem = {_id: item._id, licenseType: item.licenseType, code: item.code, numberOfUsers: item.numberOfUsers, activationDate: item.activationDate,expirationDate: item.expirationDate};
					resolve(savedItem);
				} else {
					reject({});
				}
		    });  
		});
	}

	@Put('/{id}')
	public async update(id: string, @Body() updateRequest: LicenseUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: id};
			let valuesToChange = {licenseType: updateRequest.licenseType, code: updateRequest.code, numberOfUsers: updateRequest.numberOfUsers, activationDate: updateRequest.activationDate,expirationDate: updateRequest.expirationDate};
			await LicenseModel.findOneAndUpdate(query, valuesToChange);
			resolve();
		});
	}
}