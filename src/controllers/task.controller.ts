import { TaskModel, Task } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete, Path, Query } from 'tsoa';
import { resolve } from 'dns';

export type TaskCreationRequest = Pick<Task,   "taskName" | "dueDate" | "completionStatus">;
export type TaskUpdateRequest = Pick<Task,   "taskName" | "dueDate" | "completionStatus">;

@Route('/task')
export class TaskController extends Controller {
    @Get('/all')
    public async getAll(): Promise<Task[]> {
        return new Promise<Task[]> ( async (resolve, reject) => {
            try {
               let itemsFound: any = await TaskModel.find({});
               let items: Task[] = itemsFound.map((item : any) => { 
                   return {
                    taskName: item.taskName, 
                    dueDate: item.dueDate, 
                    completionStatus: item.completionStatus}
                    });
               resolve(items);
            } catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }


    // TODO: make function work so that we can get tasks based on userId
    // tasks returned should only be for given user
    @Get('/get/{completionStatus}')
    public async getByStatus(@Query() completionStatus: string): Promise<Task[]> {
        return new Promise<Task[]> ( async (resolve, reject) => {
            try {
                console.log(`circal-api: getByStatus called ${completionStatus}`);
                let itemsFound: any = await (await (await TaskModel.find().where('completionStatus').equals(completionStatus)));
                let items = itemsFound.map((item: any) => { 
                    return {
                        taskName: item.taskName, 
                        dueDate: item.dueDate, 
                        completionStatus: item.completionStatus}
                    });
                    resolve(items);
            } catch (err) {
                this.setStatus(500);
                console.error('Caught error', err);
                reject(err);
            }
        });
    }

    @Post()
	public async create(@Body() createRequest: TaskCreationRequest) : Promise<Task> {
		return new Promise<Task> ( async (resolve, reject) => {
			const item = new TaskModel(createRequest);
			//another way to save and check for errors while saving
			await item.save(undefined, (err: any, item: any) => {
				if (item) {
                    let savedItem: any = {
                        taskName: item.taskName, 
                        dueDate: item.dueDate, 
                        completionStatus: item.completionStatus};
					resolve(savedItem);
				} else {
					reject({});
				}
		    });  
		});
	}

    @Put('/{id}')
    public async update(id: string, @Body() taskUpdateRequest: TaskUpdateRequest) : Promise<void> {
        return new Promise<void> ( async (resolve, reject) => {
            await TaskModel.findOneAndUpdate({_id: id}, taskUpdateRequest)
            resolve();
        });
    }

    @Delete('/{id}')
    public async remove(id: string) : Promise<void> {
        return new Promise<void> ( async (resolve,reject) => {
            await TaskModel.findByIdAndRemove(id);
            resolve();
        });
    }

    // TODO:
    // Get Functions: getByStatus, getByDueDate, getByName (is this necessary?)
}