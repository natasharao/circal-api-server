import { EventModel, Event } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete } from 'tsoa';

export type EventCreationRequest = Pick<Event, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export type EventUpdateRequest = Pick<Event, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;

@Route('/event')
export class EventController extends Controller {
    @Get('/all')
	public async getAll(): Promise<Event[]> {
		return new Promise<Event[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await EventModel.find({});
                let items: Event[] = itemsFound.map((item : any) => { return {_id: item._id, title: item.title, startTime: item.startTime, 
																	endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers, 
                                                                    recurring: item.recurring, done: item.done, cancelled: item.cancelled}});
				resolve(items);
			} catch (err) {
				this.setStatus(500);
				reject(err);
			}
		});
	}

	@Get('/{id}')
	public async getById(id: string): Promise<Event> {
		return new Promise<Event> ( async (resolve,reject) => {
			let itemsFound: any = await EventModel.findById(id);
			resolve(itemsFound);
		});
    }
    

    @Post()
	public async create(@Body() createRequest: EventCreationRequest) : Promise<Event> {
		return new Promise<Event> ( async (resolve, reject) => {
			const item = new EventModel(createRequest);
			//another way to save and check for errors while saving
			await item.save(undefined, (err: any, item: any) => {
				if (item) {
                    let savedItem: any = {_id: item._id, title: item.title, startTime: item.startTime,
											endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers,
											recurring: item.recurring, done: item.done, cancelled: item.cancelled};
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
			await EventModel.findByIdAndRemove(id);
			resolve();
		});
	}

	@Put('/{id}')
	public async update(id: string, @Body() updateRequest: EventUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: id};
			let valuesToChange = {title: updateRequest.title, startTime: updateRequest.startTime,
								  endTime: updateRequest.endTime, preMeetingAgenda: updateRequest.preMeetingAgenda,
								  attendingUsers: updateRequest.attendingUsers, recurring: updateRequest.recurring,
								  done: updateRequest.done, cancelled: updateRequest.cancelled};

			await EventModel.findOneAndUpdate(query, valuesToChange);
			resolve();
		});
	}

	//smart scheduling alg
}
