import { UserModel, User, Meeting, MeetingModel } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete } from 'tsoa';

export type UserCreationRequest = Pick<User, "role" | "firstName" | "lastName" | "email" | "companyId" | "status" | "calendar">;
export type UserUpdateRequest = Pick<User, "role" | "firstName" | "lastName" | "email" | "companyId" | "status" | "calendar">;

@Route('/user')
export class UserController extends Controller {
    @Get('/all')
	public async getAll(): Promise<User[]> {
		return new Promise<User[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await UserModel.find({});
                let items: User[] = itemsFound.map((item : any) => { return {_id: item._id, role: item.role, firstName: item.firstName, 
                                                                    lastName: item.lastName, username: item.username, email: item.email, 
                                                                    companyId: item.companyId, status: item.status, calendar: item.calendar}});
				resolve(items);
			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
	}
	
	@Get('/{id}')
	public async getById(id: string): Promise<User> {
		return new Promise<User> ( async (resolve,reject) => {
			let itemsFound: any = await UserModel.findById(id);
			resolve(itemsFound);
		});
    }
    

    @Post()
	public async create(@Body() createRequest: UserCreationRequest) : Promise<User> {
		return new Promise<User> ( async (resolve, reject) => {
			const item = new UserModel(createRequest);
			//another way to save and check for errors while saving
			await item.save(undefined, (err: any, item: any) => {
				if (item) {
                    let savedItem: any = {_id: item._id, role: item.role, firstName: item.firstName, 
                                    lastName: item.lastName, username: item.username, email: item.email, 
                                    companyId: item.companyId, status: item.status, calendar: item.calendar};
					resolve(savedItem);
				} else {
					reject({});
				}
		    });  
		});
	}

	// @Post('/googleSignUp')
	// public async createWithGoogle(@Body() createRequest: UserCreationRequest) : Promise<User> {
	// 	return new Promise<User> ( async (resolve, reject) => {
	// 		const item = new UserModel(createRequest);
	// 		//another way to save and check for errors while saving
	// 		await item.save(undefined, (err: any, item: any) => {
	// 			// first find existing user ?
	// 			// if present retrieve and update	

	// 			// if (item) {
    //             //     let savedItem: any = {_id: item._id, role: item.role, firstName: item.firstName, 
    //             //                     lastName: item.lastName, username: item.username, email: item.email, 
    //             //                     companyId: item.companyId, status: item.status, calendar: item.calendar};
	// 			// 	resolve(savedItem);
	// 			// } else {
	// 			// 	reject({});
	// 			// }
	// 	    });  
	// 	});
	// }

	@Delete('/{id}')
	public async remove(id: string) : Promise<void> {
		return new Promise<void> ( async (resolve,reject) => {
			await UserModel.findByIdAndRemove(id);
			resolve();
		});
	}

	@Put('/{id}')
	public async update(id: string, @Body() updateRequest: UserUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: id};
			// let valuesToChange = {role: updateRequest.role, firstName: updateRequest.firstName, lastName: updateRequest.lastName,status: updateRequest.status, calendar: updateRequest.calendar};
			await UserModel.findOneAndUpdate(query, updateRequest);
			resolve();
		});
	}

	// @Get('/profile/{id}')
	// public async getProfile(id: string): Promise<User[]> {
	// 	return new Promise<User[]> ( async (resolve, reject) => {
	// 		try {
	// 			let itemsFound: any = await UserModel.findById(id);
	// 			resolve(itemsFound);
	// 		} catch (err) {
	// 			this.setStatus(500);
	// 			reject(err);
	// 		}
	// 	});
	// }
}