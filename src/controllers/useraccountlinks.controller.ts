import { UserAccountLinksModel, UserAccountLinks, License, LicenseModel } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete, Path, Query } from 'tsoa';

export type UserAccountLinksCreationRequest = Pick<UserAccountLinks, "userId" | "accountType" | "token">;
export type UserAccountLinksUpdateRequest = Pick<UserAccountLinks, "userId" | "accountType">;

@Route('/useraccountlinks')
export class UserAccountLinksController extends Controller {
	@Get('/all')
	public async getAll(): Promise<License[]> {
		return new Promise<License[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await LicenseModel.find({});
				let items: License[] = itemsFound.map((item : any) => { return {userId: item.userId, accountType: item.accountType, token: item.token}});
				resolve(items);
			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
    }
    
    @Post()
	public async create(@Body() createRequest: UserAccountLinksCreationRequest) : Promise<UserAccountLinks> {
		return new Promise<UserAccountLinks> ( async (resolve, reject) => {
			const item = new UserAccountLinksModel(createRequest);
			//another way to save and check for errors while saving
			await item.save(undefined, (err: any, item: any) => {
				if (item) {
                    let savedItem: any = {userId: item.userId, accountType: item.accountType, token: item.token};
					resolve(savedItem);
				} else {
					reject({});
				}
		    });  
		});
    }
    
    @Put('/{id}')
	public async update(id: string, @Body() updateRequest: UserAccountLinksUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: id};
			let valuesToChange = {userId: updateRequest.userId, accountType: updateRequest.accountType};
			await UserAccountLinksModel.findOneAndUpdate(query, valuesToChange);
			resolve();
		});
    }
    

}