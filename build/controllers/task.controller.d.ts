import { Task } from '../database/dbobjects';
import { Controller } from 'tsoa';
export declare type TaskCreationRequest = Pick<Task, "taskName" | "dueDate" | "completionStatus">;
export declare type TaskUpdateRequest = Pick<Task, "taskName" | "dueDate" | "completionStatus">;
export declare class TaskController extends Controller {
    getAll(): Promise<Task[]>;
    getByStatus(completionStatus: string): Promise<Task[]>;
    create(createRequest: TaskCreationRequest): Promise<Task>;
    update(id: string, taskUpdateRequest: TaskUpdateRequest): Promise<void>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=task.controller.d.ts.map