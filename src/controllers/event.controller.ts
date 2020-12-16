import { MeetingModel , Meeting } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete } from 'tsoa';

export type MeetingCreationRequest = Pick<Meeting, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;
export type MeetingUpdateRequest = Pick<Meeting, "title" | "startTime" | "endTime" | "preMeetingAgenda" | "attendingUsers" | "recurring" | "done" | "cancelled">;

@Route('/meeting')
export class MeetingController extends Controller {
    @Get('/all')
	public async getAll(): Promise<Meeting[]> {
		return new Promise<Meeting[]> ( async (resolve, reject) => {
			try {
				let itemsFound: any = await MeetingModel.find({});
                let items: Meeting[] = itemsFound.map((item : any) => { return {_id: item._id, title: item.title, startTime: item.startTime, 
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
	public async getById(id: string): Promise<Meeting> {
		return new Promise<Meeting> ( async (resolve,reject) => {
			let itemsFound: any = await MeetingModel.findById(id);
			resolve(itemsFound);
		});
    }
    

    @Post()
	public async create(@Body() createRequest: MeetingCreationRequest) : Promise<Meeting> {
		return new Promise<Meeting> ( async (resolve, reject) => {
			const item = new MeetingModel(createRequest);
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
			await MeetingModel.findByIdAndRemove(id);
			resolve();
		});
	}

	@Put('/{id}')
	public async update(id: string, @Body() updateRequest: MeetingUpdateRequest) : Promise<void> {
		return new Promise<void> ( async (resolve, reject) => {
			let query = {_id: id};
			let valuesToChange = {title: updateRequest.title, startTime: updateRequest.startTime,
								  endTime: updateRequest.endTime, preMeetingAgenda: updateRequest.preMeetingAgenda,
								  attendingUsers: updateRequest.attendingUsers, recurring: updateRequest.recurring,
								  done: updateRequest.done, cancelled: updateRequest.cancelled};

			await MeetingModel.findOneAndUpdate(query, valuesToChange);
			resolve();
		});
	}

	@Get('/schedule/{id}')
	public async smartScheduling(id: string): Promise<Meeting> {
		return new Promise<Meeting> ( async (resolve,reject) => {
			/*
			PSEUDOCODE
			-	Input:
				- 	mandatory attendees - list
				-	optional attendees - list
				-	when Meeting occurs: next available time OR a certain day/day range – bool/list
				-	importance level
			-	Output: time windows when to host meeting w/ info on who’s free when -list

			-	If next available time:
				-	For each user – find available times within the next 1-2 days
				-	Check this range and add window to list when every member is free, then when most->least members are free
					-	Prioritize mandatory members always
				-	Overwriting: check times where members have other meetings that are of lower priority & can be overwritten & add to list after some sort of distinguishing barrier
				-	If the list is empty, recur with the next few days – to Limit of a week
				-	Return list
			-	If day/day range:
				-	Check that range and add window to list when every member is free, then when most->least members are free
					-	Prioritize mandatory members always
				-	Overwriting: check times where members have other meetings that are of lower priority & can be overwritten & add to list after some sort of distinguishing barrier
				-	If the list is empty, return that the user must select a different window
				-	Else: Return list
			-	Handle recurring meetings
			  */
			//let itemsFound: any = await MeetingModel.findById(id);
			//resolve(itemsFound);

			// resolve();
		});
	}

	//smart scheduling alg
}
