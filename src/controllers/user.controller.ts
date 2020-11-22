import { UserModel, User, Event, EventModel } from '../database/dbobjects';
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

	/*@Get('/{id}')
	public async getAllEventsforUser(id: string): Promise<Event[]> {
		return new Promise<Event[]> ( async (resolve, reject) => {
			// todo
			try {
				let userItemsFound: any = await UserModel.findById(id);
                let items: String[] = userItemsFound.map((item : any) => { return {calendar: item.calendar}});

                let events: Event[];
				let eventItemsFound: any = items.forEach( async function (value) {
					let itemsFound: any = await EventModel.findById(id);
					events.concat(itemsFound);
				});
				resolve(events);

			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
	}

	@Put('/{userId}&{eventId}')
	public async addToEventList(userId: string, eventId: string, @Body() updateRequest: UserUpdateRequest) : Promise<void> {
		//todo
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: userId};
			// let userItemsFound: any = await UserModel.find({});
            // let items: String[] = userItemsFound.map((item : any) => { return {calendar: item.calendar}});

			let valuesToChange = {role: updateRequest.role, firstName: updateRequest.firstName, lastName: updateRequest.lastName,status: updateRequest.status, calendar: updateRequest.calendar};
			await UserModel.findOneAndUpdate(query, valuesToChange);
			//add event
			resolve();
		});
	}

	@Put('/{userId}&{eventId}')
	public async removeFromEventList(userId: string, eventId: string, @Body() updateRequest: UserUpdateRequest) : Promise<void> {
		//todo
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: userId};
			let valuesToChange = {role: updateRequest.role, firstName: updateRequest.firstName, lastName: updateRequest.lastName,status: updateRequest.status, calendar: updateRequest.calendar};
			await UserModel.findOneAndUpdate(query, valuesToChange);
			//remove event
			resolve();
		});
	}

*/
}