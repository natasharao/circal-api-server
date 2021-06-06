import { TaskModel, Task } from '../database/dbobjects';
import { Controller, Route, Get, Post, Body, Put, Delete, Path, Query } from 'tsoa';
import { resolve } from 'dns';

export type TaskCreationRequest = Pick<Task,   "taskName" | "userId" | "dueDate" | "priority" | "completionStatus">;
export type TaskUpdateRequest = Pick<Task,   "taskName" | "userId" | "dueDate" | "priority" | "completionStatus">;

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
                    userId: item.userId,
                    dueDate: item.dueDate, 
                    priority: item.priority,
                    completionStatus: item.completionStatus}
                    });
               resolve(items);
            } catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }

    @Get('/getOnDate/{userId}')
    public async getOnDate(@Query() dueDate: Date, @Query() userId: string): Promise<Task[]> {
        return new Promise<Task[]> ( async (resolve, reject) => { 
            try {
                console.log(`circal-api: getOnDate called ${dueDate}`);
                let itemsFound: any = await (await await(TaskModel.find({'userId': userId, 'dueDate': dueDate})));
                let items = itemsFound.map((item: any) => {
                    return {
                        taskName: item.taskName, 
                        userId: item.userId,
                        dueDate: item.dueDate, 
                        priority: item.priority,
                        completionStatus: item.completionStatus
                    }                    
                })
                resolve(items);
            } catch(err) {
                this.setStatus(500);
                console.error('Caught error', err);
                reject(err);
            }
        })
    }

    @Get('/getPriority/{userId}')
    public async getByPriority(@Query() userId: string, @Query() priority: string): Promise<Task[]> {
        return new Promise<Task[]> ( async (resolve, reject) => {
            try {
                console.log(`circal-api: getByPriority called ${priority}`);
                let itemsFound: any = await (await await (TaskModel.find({'userId': userId, 'priority': priority})));
                let items = itemsFound.map((item: any) => { 
                    return {
                        taskName: item.taskName, 
                        userId: item.userId,
                        dueDate: item.dueDate, 
                        priority: item.priority,
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


    @Get('/getStatus/{userId}')
    public async getByStatus(@Query() completionStatus: string, @Query() userId: string): Promise<Task[]> {
        return new Promise<Task[]> ( async (resolve, reject) => {
            try {
                console.log(`circal-api: getByStatus called ${completionStatus}`);
                let itemsFound: any = await (await await (TaskModel.find({'userId': userId, 'completionStatus': completionStatus})));
                let items = itemsFound.map((item: any) => { 
                    return {
                        taskName: item.taskName, 
                        userId: item.userId,
                        dueDate: item.dueDate, 
                        priority: item.priority,
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
			item.save(undefined, (err: any, item: any) => {
                if (item) {
                    let savedItem: any = {
                        taskName: item.taskName,
                        userId: item.userId,
                        dueDate: item.dueDate,
                        priority: item.priority,
                        completionStatus: item.completionStatus
                    };
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

}